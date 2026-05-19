"use client";

import { 
  Square, 
  Circle, 
  Diamond, 
  Hexagon, 
  Database,
  RectangleHorizontal,
  LucideIcon
} from "lucide-react";
import { cn } from "@/lib/utils";

import { useDrag } from "./drag-context";

interface ShapeOption {
  type: string;
  icon: LucideIcon;
  label: string;
  width: number;
  height: number;
}

const SHAPES: ShapeOption[] = [
  { type: "rectangle", icon: Square, label: "Rectangle", width: 160, height: 100 },
  { type: "diamond", icon: Diamond, label: "Diamond", width: 140, height: 140 },
  { type: "circle", icon: Circle, label: "Circle", width: 120, height: 120 },
  { type: "pill", icon: RectangleHorizontal, label: "Pill", width: 160, height: 80 },
  { type: "cylinder", icon: Database, label: "Cylinder", width: 120, height: 160 },
  { type: "hexagon", icon: Hexagon, label: "Hexagon", width: 140, height: 140 },
];

export function ShapePanel() {
  const { setDraggedShape } = useDrag();

  const onDragStart = (event: React.DragEvent, shape: ShapeOption) => {
    const data = JSON.stringify({
      type: shape.type,
      width: shape.width,
      height: shape.height
    });
    
    // Use a very specific type to avoid collisions
    event.dataTransfer.setData("application/x-arch-ai", data);
    event.dataTransfer.setData("text/plain", data);
    event.dataTransfer.effectAllowed = "move";

    // Set the dragged shape for our custom ghost preview
    setDraggedShape({
      type: shape.type,
      width: shape.width,
      height: shape.height,
      label: shape.label
    });

    // Hide the default browser ghost image
    const img = new Image();
    img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
    event.dataTransfer.setDragImage(img, 0, 0);
  };

  const onDragEnd = () => {
    setDraggedShape(null);
  };

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1.5 p-1.5 bg-surface/80 backdrop-blur-xl border border-border-default rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        {SHAPES.map((shape) => (
          <div
            key={shape.type}
            className={cn(
              "p-2.5 rounded-full transition-all duration-200 cursor-grab active:cursor-grabbing",
              "text-text-muted hover:text-text-primary hover:bg-subtle",
              "group relative"
            )}
            draggable
            onDragStart={(e) => onDragStart(e, shape)}
            onDragEnd={onDragEnd}
            title={shape.label}
          >
            <shape.icon size={20} strokeWidth={2} />
            
            {/* Tooltip-like label on hover */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-surface border border-border-default rounded-md text-[10px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl">
              {shape.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
