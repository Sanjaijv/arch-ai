"use client";

import { 
  BaseEdge, 
  EdgeLabelRenderer, 
  getSmoothStepPath,
  useStore,
  type EdgeProps,
  type Edge,
} from "@xyflow/react";
import { useMutation } from "@liveblocks/react/suspense";
import { LiveObject } from "@liveblocks/client";
import { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

export type CanvasEdgeData = {
  label?: string;
};

export type CanvasEdge = Edge<CanvasEdgeData>;

export function CanvasEdgeComponent({
  id,
  source,
  target,
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

  const { index, total, edgeIndex } = useStore((s) => {
    const siblings = s.edges.filter(
      (e) => (e.source === source && e.target === target) || (e.source === target && e.target === source)
    );
    return {
      index: siblings.findIndex((e) => e.id === id),
      total: siblings.length,
      edgeIndex: s.edges.findIndex((e) => e.id === id),
    };
  }, (a, b) => a.index === b.index && a.total === b.total && a.edgeIndex === b.edgeIndex);

  const isParallel = total > 1;
  
  // Calculate raw stagger based on edge index to separate routing tracks.
  // For parallel edges between the same nodes, spread them based on their local index.
  // For other edges, use the global edgeIndex to create 5 distinct tracks to minimize overlaps.
  // Only stagger the path for parallel edges to separate routing tracks.
  // For other edges, keep them centered to prevent the path and labels from being pushed into nodes.
  const rawStagger = isParallel 
    ? (index - (total - 1) / 2) * 40
    : 0;

  const distanceX = Math.abs(targetX - sourceX);
  const distanceY = Math.abs(targetY - sourceY);
  
  // Clamp the stagger to avoid drawing lines that loop backwards over the nodes.
  const clamp = (val: number, maxDist: number) => {
    if (maxDist < 40) return val;
    const limit = Math.max(0, maxDist / 2 - 10);
    return Math.min(Math.max(val, -limit), limit);
  };

  const pathStaggerX = clamp(rawStagger, distanceX);
  const pathStaggerY = clamp(rawStagger, distanceY);

  const [edgePath, centerX, centerY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 16,
    centerX: (sourceX + targetX) / 2 + pathStaggerX,
    centerY: (sourceY + targetY) / 2 + pathStaggerY,
  });

  // For non-parallel edges, apply a slight offset to the label position itself
  // to prevent labels of crossing edges from stacking exactly on top of each other.
  // We offset along the line by alternating the position slightly.
  const labelSlide = !isParallel ? ((edgeIndex % 3) - 1) * 25 : 0; // -25, 0, or 25
  
  // Approximate the direction of the middle segment to slide the label along the path
  const isHorizontalMiddle = sourcePosition === "top" || sourcePosition === "bottom";
  
  const labelX = centerX + (isHorizontalMiddle ? labelSlide : 0);
  const labelY = centerY + (!isHorizontalMiddle ? labelSlide : 0);

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
    const flow = storage.get("flow");
    const edges = flow.get("edges");
    const edge = edges.get(edgeId);
    
    if (edge) {
      let data = edge.get("data");
      
      if (!data) {
        // Initialize data if it doesn't exist
        edge.set("data", new LiveObject(newData));
      } else if (data instanceof LiveObject) {
        // Update existing LiveObject
        for (const [key, value] of Object.entries(newData)) {
          data.set(key, value);
        }
      } else {
        // Fallback: if it's a plain object, update it and set it back
        edge.set("data", { ...data, ...newData });
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
            zIndex: 10,
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
          ) : (() => {
            const displayLabel = data?.label 
              ? data.label.length > 25 
                ? data.label.substring(0, 22) + "..." 
                : data.label 
              : "Add label";
              
            return (
              <div 
                className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] font-medium transition-all cursor-text select-none",
                  data?.label 
                    ? "bg-bg-surface border border-border-default text-text-secondary opacity-100" 
                    : "text-text-muted opacity-0 hover:opacity-100 bg-bg-surface/50 border border-dashed border-border-muted"
                )}
                title={data?.label || ""}
              >
                {displayLabel}
              </div>
            );
          })()}
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
