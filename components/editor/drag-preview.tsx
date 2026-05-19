"use client";

import { useState, useEffect } from "react";
import { useDrag } from "./drag-context";
import { NodeShape } from "./nodes/node-shape";
import { cn } from "@/lib/utils";

export function DragPreview() {
  const { draggedShape } = useDrag();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!draggedShape) return;

    const onPointerMove = (e: MouseEvent | DragEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("pointermove", onPointerMove as EventListener);
    window.addEventListener("dragover", onPointerMove as EventListener);
    
    return () => {
      window.removeEventListener("pointermove", onPointerMove as EventListener);
      window.removeEventListener("dragover", onPointerMove as EventListener);
    };
  }, [draggedShape]);

  if (!draggedShape) return null;

  return (
    <div
      className="fixed pointer-events-none z-[100] transition-transform duration-75 ease-out opacity-60"
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        width: draggedShape.width,
        height: draggedShape.height,
        transform: `translate(-50%, -50%)`,
      }}
    >
      <NodeShape
        shape={draggedShape.type}
        width={draggedShape.width}
        height={draggedShape.height}
        className="!border-accent-primary !stroke-accent-primary shadow-[0_0_20px_rgba(var(--accent-primary),0.3)]"
      />
      
      {draggedShape.label && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-bold text-accent-primary uppercase tracking-widest bg-surface/80 px-2 py-0.5 rounded border border-accent-primary/20">
            {draggedShape.label}
          </span>
        </div>
      )}
    </div>
  );
}
