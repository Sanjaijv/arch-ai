"use client";

import { cn } from "@/lib/utils";

interface NodeShapeProps {
  shape: string;
  width: number;
  height: number;
  selected?: boolean;
  className?: string;
  fill?: string;
}

export function NodeShape({ shape, width, height, selected, className, fill }: NodeShapeProps) {
  const isCircle = shape === "circle";
  const isDiamond = shape === "diamond";
  const isPill = shape === "pill";
  const isCylinder = shape === "cylinder";
  const isHexagon = shape === "hexagon";

  const commonClasses = cn(
    "absolute inset-0 transition-all duration-300",
    selected 
      ? "stroke-accent-primary stroke-[3px] drop-shadow-[0_0_15px_rgba(var(--accent-primary),0.7)]" 
      : "stroke-text-muted/90 stroke-2 hover:stroke-text-secondary transition-colors",
    className
  );

  const fillStyle = {
    fill: fill || "var(--bg-surface)",
    fillOpacity: 1,
  };

  if (isDiamond) {
    return (
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        className={commonClasses}
      >
        <path d="M 50 2 L 98 50 L 50 98 L 2 50 Z" style={fillStyle} />
      </svg>
    );
  }

  if (isHexagon) {
    return (
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        className={commonClasses}
      >
        <path d="M 25 2 L 75 2 L 98 50 L 75 98 L 25 98 L 2 50 Z" style={fillStyle} />
      </svg>
    );
  }

  if (isCylinder) {
    return (
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
        className={commonClasses}
      >
        <path d="M 2 15 L 2 85 A 48 15 0 0 0 98 85 L 98 15" style={fillStyle} />
        <ellipse cx="50" cy="15" rx="48" ry="13" style={fillStyle} />
        <path d="M 2 85 A 48 15 0 0 0 98 85" fill="none" />
      </svg>
    );
  }

  return (
    <div 
      className={cn(
        "absolute inset-0 transition-all duration-300 border-2",
        isCircle ? "rounded-full" : isPill ? "rounded-full" : "rounded-2xl",
        selected 
          ? "border-accent-primary ring-4 ring-accent-primary/20 shadow-[0_0_25px_rgba(var(--accent-primary),0.4)]" 
          : "border-text-muted/90 shadow-xl hover:border-text-secondary transition-colors",
        className
      )}
      style={{ backgroundColor: fill || "var(--bg-surface)" }}
    />
  );
}
