"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface LayoutContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isAiSidebarOpen: boolean;
  setIsAiSidebarOpen: (open: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType | null>(null);

export function LayoutProvider({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAiSidebarOpen, setIsAiSidebarOpen] = useState(false);

  return (
    <LayoutContext.Provider value={{ 
      isSidebarOpen, 
      setIsSidebarOpen, 
      isAiSidebarOpen, 
      setIsAiSidebarOpen 
    }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
}
