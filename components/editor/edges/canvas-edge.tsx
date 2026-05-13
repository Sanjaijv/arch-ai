"use client";

import { 
  BaseEdge, 
  EdgeLabelRenderer, 
  getSmoothStepPath, 
  type EdgeProps,
  type Edge,
} from "@xyflow/react";
import { useMutation } from "@liveblocks/react/suspense";
import { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export type CanvasEdgeData = {
  label?: string;
};

export type CanvasEdge = Edge<CanvasEdgeData>;

export function CanvasEdgeComponent({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected,
}: EdgeProps<CanvasEdge>) {
  const [isEditing, setIsEditing] = useState(false);
  const [localLabel, setLocalLabel] = useState(data?.label || "");
  const inputRef = useRef<HTMLInputElement>(null);

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 16,
  });

  // Sync local label when data changes from other users
  useEffect(() => {
    if (!isEditing) {
      setLocalLabel(data?.label || "");
    }
  }, [data?.label, isEditing]);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const onDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  }, []);

  const updateEdgeData = useMutation(({ storage }, edgeId: string, newData: any) => {
    const edges = storage.get("flow").get("edges");
    const edge = edges.get(edgeId);
    if (edge) {
      const data = edge.get("data");
      if (data) {
        for (const [key, value] of Object.entries(newData)) {
          data.set(key, value);
        }
      }
    }
  }, []);

  const saveLabel = useCallback(() => {
    setIsEditing(false);
    updateEdgeData(id, { label: localLabel });
  }, [id, localLabel, updateEdgeData]);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveLabel();
    } else if (e.key === "Escape") {
      setLocalLabel(data?.label || "");
      setIsEditing(false);
    }
    e.stopPropagation();
  }, [data?.label, saveLabel]);

  const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalLabel(e.target.value);
  }, []);

  return (
    <>
      {/* Invisible wider path for easier clicking/hovering */}
      <BaseEdge 
        path={edgePath} 
        style={{ strokeWidth: 20, stroke: "transparent" }} 
        className="cursor-pointer"
      />
      
      {/* Visible edge */}
      <BaseEdge 
        id={id}
        path={edgePath} 
        className={cn(
          "transition-all duration-200 stroke-slate-500",
          (selected || isEditing) ? "stroke-slate-200 stroke-[2px]" : "stroke-slate-500/50 stroke-[1.5px] group-hover:stroke-slate-400"
        )}
        style={{
          filter: selected ? "drop-shadow(0 0 4px rgba(255,255,255,0.2))" : "none"
        }}
      />

      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            pointerEvents: "all",
          }}
          className="flex items-center justify-center min-w-[20px]"
          onDoubleClick={onDoubleClick}
        >
          {isEditing ? (
            <div className="bg-bg-surface border border-accent-primary rounded-md px-2 py-1 shadow-xl z-50">
              <input
                ref={inputRef}
                value={localLabel}
                onChange={onInputChange}
                onBlur={saveLabel}
                onKeyDown={onKeyDown}
                className="bg-transparent border-none outline-none text-xs text-text-primary nodrag nopan w-auto min-w-[60px]"
                style={{ 
                  width: `${Math.max(60, localLabel.length * 7)}px`
                }}
              />
            </div>
          ) : (
            <div 
              className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-medium transition-all cursor-text select-none",
                data?.label 
                  ? "bg-bg-surface border border-border-default text-text-secondary opacity-100" 
                  : "text-text-muted opacity-0 hover:opacity-100 bg-bg-surface/50 border border-dashed border-border-muted"
              )}
            >
              {data?.label || "Add label"}
            </div>
          )}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
