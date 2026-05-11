"use client";

import { createContext, useContext, ReactNode } from "react";
import { useProjectActions } from "@/hooks/use-project-actions";
import { ProjectWithRole } from "@/lib/projects";

interface ProjectDialogsContextType extends ReturnType<typeof useProjectActions> {
  projects: ProjectWithRole[];
  sharedProjects: ProjectWithRole[];
}

const ProjectDialogsContext = createContext<ProjectDialogsContextType | null>(null);

interface ProjectDialogsProviderProps {
  children: ReactNode;
  initialProjects: ProjectWithRole[];
  initialSharedProjects: ProjectWithRole[];
}

export function ProjectDialogsProvider({ 
  children, 
  initialProjects, 
  initialSharedProjects 
}: ProjectDialogsProviderProps) {
  const actions = useProjectActions();

  return (
    <ProjectDialogsContext.Provider value={{ 
      ...actions, 
      projects: initialProjects, 
      sharedProjects: initialSharedProjects 
    }}>
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
