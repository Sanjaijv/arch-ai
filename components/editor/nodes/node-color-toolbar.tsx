"use client";

import { NodeToolbar, Position } from "@xyflow/react";
import { useMutation } from "@liveblocks/react/suspense";
import { NODE_COLORS } from "@/types/canvas";
import { cn } from "@/lib/utils";
import { useCallback } from "react";

interface NodeColorToolbarProps {
  nodeId: string;
  currentColor?: string;
  isVisible: boolean;
}

export function NodeColorToolbar({ nodeId, currentColor, isVisible }: NodeColorToolbarProps) {
  const updateNodeColor = useMutation(({ storage }, nodeId: string, color: string) => {
    const nodes = storage.get("flow").get("nodes");
    const node = nodes.get(nodeId);
    if (node) {
      const data = node.get("data");
      if (data) {
        data.set("color", color);
      }
    }
  }, []);

  const onColorSelect = useCallback((fill: string) => {
    updateNodeColor(nodeId, fill);
  }, [nodeId, updateNodeColor]);

  if (!isVisible) return null;

  return (
    <NodeToolbar 
      isVisible={isVisible} 
      position={Position.Top} 
      offset={12}
      className="flex items-center gap-1.5 p-1.5 bg-bg-elevated/90 backdrop-blur-md border border-border-default rounded-xl shadow-2xl nodrag nopan"
    >
      {NODE_COLORS.map((color) => {
        const isActive = currentColor === color.fill;
        
        return (
          <button
            key={color.fill}
            onClick={() => onColorSelect(color.fill)}
            className={cn(
              "group relative w-6 h-6 rounded-full transition-all duration-200 hover:scale-110 active:scale-95",
              isActive ? "ring-2 ring-white ring-offset-2 ring-offset-bg-elevated scale-110" : "ring-1 ring-white/10"
            )}
            style={{ 
              backgroundColor: color.fill,
              // Subtle glow on hover based on text color
              boxShadow: isActive ? `0 0 12px ${color.text}40` : undefined
            }}
            title={color.name}
          >
            <div 
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ 
                boxShadow: `0 0 8px ${color.text}60`,
              }}
            />
          </button>
        );
      })}
    </NodeToolbar>
  );
}
