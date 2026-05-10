"use client";

import { createContext, useContext, ReactNode } from "react";
import { useProjectDialogs, UseProjectDialogsReturn } from "@/hooks/use-project-dialogs";

const ProjectDialogsContext = createContext<UseProjectDialogsReturn | null>(null);

export function ProjectDialogsProvider({ children }: { children: ReactNode }) {
  const dialogs = useProjectDialogs();

  return (
    <ProjectDialogsContext.Provider value={dialogs}>
      {children}
    </ProjectDialogsContext.Provider>
  );
}

export function useProjectDialogsContext() {
  const context = useContext(ProjectDialogsContext);
  if (!context) {
    throw new Error("useProjectDialogsContext must be used within a ProjectDialogsProvider");
  }
  return context;
}
