"use client";

import { Handle, Position, NodeProps, Node } from "@xyflow/react";
import { cn } from "@/lib/utils";

export type CanvasNodeData = {
  label: string;
  shape: string;
  width: number;
  height: number;
  color?: string;
};

export type CanvasNode = Node<CanvasNodeData>;

export function CanvasNodeComponent({ data, selected }: NodeProps<CanvasNode>) {
  const isCircle = data.shape === "circle";
  const isDiamond = data.shape === "diamond";
  const isPill = data.shape === "pill";
  const isCylinder = data.shape === "cylinder";
  const isHexagon = data.shape === "hexagon";

  return (
    <div
      className={cn(
        "bg-bg-surface/90 backdrop-blur-sm border-2 flex items-center justify-center transition-all duration-200 group",
        isCircle ? "rounded-full" : isPill ? "rounded-full" : "rounded-2xl",
        selected ? "border-accent-primary ring-4 ring-accent-primary/20" : "border-border-default shadow-xl hover:border-border-subtle"
      )}
      style={{
        width: data.width,
        height: data.height,
        borderColor: data.color && !selected ? data.color : undefined,
        clipPath: isDiamond 
          ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" 
          : isHexagon 
          ? "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)"
          : undefined,
      }}
    >
      <Handle 
        type="target" 
        position={Position.Top} 
        className={cn(
          "!bg-accent-primary !w-2.5 !h-2.5 !border-bg-surface !border-2 opacity-0 group-hover:opacity-100 transition-opacity",
          isDiamond && "!top-0",
          isHexagon && "!top-0"
        )} 
      />
      
      <div className="px-4 py-2 w-full h-full flex flex-col items-center justify-center text-center gap-1">
        <span className="text-sm font-bold text-text-primary break-words leading-tight">
          {data.label || "Untitled"}
        </span>
        <span className="text-[10px] text-text-muted font-mono uppercase tracking-widest opacity-50">
          {data.shape}
        </span>
      </div>

      <Handle 
        type="source" 
        position={Position.Bottom} 
        className={cn(
          "!bg-accent-primary !w-2.5 !h-2.5 !border-bg-surface !border-2 opacity-0 group-hover:opacity-100 transition-opacity",
          isDiamond && "!bottom-0",
          isHexagon && "!bottom-0"
        )} 
      />
    </div>
  );
}
