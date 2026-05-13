"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CanvasTemplate } from "./starter-templates";

interface TemplateContextType {
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const TemplateContext = createContext<TemplateContextType | undefined>(undefined);

export function TemplateProvider({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <TemplateContext.Provider value={{ isModalOpen, openModal, closeModal }}>
      {children}
    </TemplateContext.Provider>
  );
}

export function useTemplates() {
  const context = useContext(TemplateContext);
  if (context === undefined) {
    throw new Error("useTemplates must be used within a TemplateProvider");
  }
  return context;
}
