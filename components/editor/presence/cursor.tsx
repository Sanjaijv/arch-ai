"use client";

import { memo } from "react";
import { Loader2 } from "lucide-react";

interface CursorProps {
  name: string;
  color: string;
  x: number;
  y: number;
  thinking?: boolean;
}

export const Cursor = memo(({ name, color, x, y, thinking }: CursorProps) => {
  return (
    <div
      className="absolute top-0 left-0 pointer-events-none transition-transform duration-75 ease-out z-50"
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    >
      <svg
        width="24"
        height="36"
        viewBox="0 0 24 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.65376 12.3822H5.46026L5.31717 12.5124L0.500002 16.8916L0.500002 1.06003L11.7425 12.3025L5.65376 12.3822Z"
          fill={color}
          stroke="white"
        />
      </svg>
      
      <div
        className="absolute left-4 top-4 px-2 py-1 rounded-md text-[10px] font-semibold text-white whitespace-nowrap shadow-sm border border-white/20 flex items-center gap-1.5"
        style={{ backgroundColor: color }}
      >
        {thinking && <Loader2 className="h-2.5 w-2.5 animate-spin" />}
        {name}
      </div>
    </div>
  );
});

Cursor.displayName = "Cursor";
