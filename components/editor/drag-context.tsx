"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface DraggedShape {
  type: string;
  width: number;
  height: number;
  label?: string;
}

interface DragContextType {
  draggedShape: DraggedShape | null;
  mousePosition: { x: number; y: number };
  setDraggedShape: (shape: DraggedShape | null) => void;
  setMousePosition: (pos: { x: number; y: number }) => void;
}

const DragContext = createContext<DragContextType | undefined>(undefined);

export function DragProvider({ children }: { children: React.ReactNode }) {
  const [draggedShape, setDraggedShape] = useState<DraggedShape | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  return (
    <DragContext.Provider
      value={{
        draggedShape,
        mousePosition,
        setDraggedShape,
        setMousePosition,
      }}
    >
      {children}
    </DragContext.Provider>
  );
}

export function useDrag() {
  const context = useContext(DragContext);
  if (context === undefined) {
    throw new Error("useDrag must be used within a DragProvider");
  }
  return context;
}
