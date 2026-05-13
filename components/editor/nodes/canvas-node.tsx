"use client";

import { useState, useCallback, useEffect, useMemo, useRef } from "react";
import { Handle, Position, NodeProps, NodeResizer } from "@xyflow/react";
import { useMutation } from "@liveblocks/react/suspense";
import { cn } from "@/lib/utils";

import { NodeShape } from "./node-shape";
import { NodeColorToolbar } from "./node-color-toolbar";
import { getMatchingTextColor, CanvasNode } from "@/types/canvas";

export function CanvasNodeComponent({ id, data, selected }: NodeProps<CanvasNode>) {
  const [isEditing, setIsEditing] = useState(false);
  const [localLabel, setLocalLabel] = useState(data.label);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isDiamond = data.shape === "diamond";
  const isHexagon = data.shape === "hexagon";

  const textColor = getMatchingTextColor(data.color);

  // Adjust textarea height to match content for vertical centering
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
      
      // Move cursor to end on first focus
      if (textarea.selectionStart === textarea.selectionEnd) {
        textarea.selectionStart = textarea.value.length;
        textarea.selectionEnd = textarea.value.length;
      }
    }
  }, [localLabel, isEditing]);

  // Calculate proportional font size based on node dimensions
  const fontSize = useMemo(() => {
    const minDim = Math.min(data.width, data.height);
    // Scale font size: roughly 14px for a 150px node (default)
    const calculated = Math.floor(minDim * 0.09);
    // Clamp between 10px and 36px for readability and space constraints
    return Math.max(10, Math.min(36, calculated));
  }, [data.width, data.height]);

  // Sync local label when data changes from other users
  useEffect(() => {
    if (!isEditing) {
      setLocalLabel(data.label);
    }
  }, [data.label, isEditing]);

  const updateNodeData = useMutation(({ storage }, nodeId: string, newData: any) => {
    const nodes = storage.get("flow").get("nodes");
    const node = nodes.get(nodeId);
    if (node) {
      const data = node.get("data");
      if (data) {
        for (const [key, value] of Object.entries(newData)) {
          data.set(key, value);
        }
      }
    }
  }, []);

  const onResize = useCallback((event: any, { width, height }: { width: number; height: number }) => {
    updateNodeData(id, { width, height });
  }, [id, updateNodeData]);

  const onDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  }, []);

  const onLabelChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const nextLabel = e.target.value;
    setLocalLabel(nextLabel);
    updateNodeData(id, { label: nextLabel });
  }, [id, updateNodeData]);

  const onLabelBlur = useCallback(() => {
    setIsEditing(false);
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsEditing(false);
    }
    // Prevent backspace or other keys from deleting the node while editing
    e.stopPropagation();
  }, []);

  return (
    <div
      className="group"
      style={{
        width: data.width,
        height: data.height,
      }}
    >
      <NodeResizer 
        minWidth={100} 
        minHeight={40} 
        isVisible={!!selected} 
        onResize={onResize}
        handleClassName="!bg-accent-primary !border-bg-base !w-2 !h-2"
        lineClassName="!border-accent-primary/30"
      />

      <NodeColorToolbar 
        nodeId={id} 
        currentColor={data.color} 
        isVisible={!!selected && !isEditing} 
      />

      <NodeShape 
        shape={data.shape} 
        width={data.width} 
        height={data.height} 
        selected={selected} 
        fill={data.color}
      />

      {/* Connection Handles - 4-way connectivity */}
      <Handle 
        type="source" 
        position={Position.Top} 
        className={cn(
          "!bg-white !w-1.5 !h-1.5 !border-bg-base !border-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity",
          (isDiamond || isHexagon) && "!top-0"
        )} 
      />

      <div 
        className={cn(
          "relative z-10 w-full h-full flex flex-col items-center justify-center text-center gap-1 cursor-text overflow-hidden",
          isDiamond ? "px-8 py-8" : isHexagon ? "px-6 py-2" : "px-4 py-2"
        )}
        style={{ fontSize: `${fontSize}px` }}
        onDoubleClick={onDoubleClick}
      >
        {isEditing ? (
          <textarea
            ref={textareaRef}
            autoFocus
            className="w-full h-auto max-h-full bg-transparent font-bold text-center outline-none resize-none overflow-hidden leading-tight p-0 m-0 border-none nodrag nopan break-words"
            style={{ 
              fontSize: `${fontSize}px`,
              color: textColor
            }}
            value={localLabel}
            onChange={onLabelChange}
            onBlur={onLabelBlur}
            onKeyDown={onKeyDown}
            placeholder="Type a label..."
          />
        ) : (
          <span 
            className={cn(
              "font-bold break-words leading-tight w-full max-h-full overflow-hidden",
              !data.label && "opacity-40 italic"
            )}
            style={{ 
              fontSize: `${fontSize}px`,
              color: data.label ? textColor : undefined
            }}
          >
            {data.label || "Untitled"}
          </span>
        )}
      </div>

      <Handle 
        type="source" 
        position={Position.Bottom} 
        className={cn(
          "!bg-white !w-1.5 !h-1.5 !border-bg-base !border-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity",
          (isDiamond || isHexagon) && "!bottom-0"
        )} 
      />
      <Handle 
        type="source" 
        position={Position.Left} 
        className={cn(
          "!bg-white !w-1.5 !h-1.5 !border-bg-base !border-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity",
          isDiamond && "!left-0"
        )} 
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        className={cn(
          "!bg-white !w-1.5 !h-1.5 !border-bg-base !border-[1.5px] opacity-0 group-hover:opacity-100 transition-opacity",
          isDiamond && "!right-0"
        )} 
      />
    </div>
  );
}
