"use client";

import React, { createContext, useContext, useState } from "react";
import { SaveStatus } from "@/hooks/use-autosave";

interface SaveStatusContextType {
  status: SaveStatus;
  setStatus: (status: SaveStatus) => void;
  lastSaved: Date | null;
  setLastSaved: (date: Date | null) => void;
  onSave: (() => Promise<void>) | null;
  setOnSave: (callback: (() => Promise<void>) | null) => void;
}

const SaveStatusContext = createContext<SaveStatusContextType | undefined>(undefined);

export function SaveStatusProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [onSave, setOnSave] = useState<(() => Promise<void>) | null>(null);

  return (
    <SaveStatusContext.Provider value={{ 
      status, 
      setStatus, 
      lastSaved, 
      setLastSaved, 
      onSave, 
      setOnSave: (cb) => setOnSave(() => cb)
    }}>
      {children}
    </SaveStatusContext.Provider>
  );
}

export function useSaveStatus() {
  const context = useContext(SaveStatusContext);
  if (context === undefined) {
    throw new Error("useSaveStatus must be used within a SaveStatusProvider");
  }
  return context;
}
