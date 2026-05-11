"use client";

import { useState } from "react";
import { EditorNavbar } from "./editor-navbar";
import { ProjectSidebar } from "./project-sidebar";

import { ProjectDialogsProvider } from "./project-dialogs-context";
import { ProjectDialogs } from "./project-dialogs";
import { ProjectWithRole } from "@/lib/projects";

interface EditorLayoutProps {
  children: React.ReactNode;
  initialProjects: ProjectWithRole[];
  initialSharedProjects: ProjectWithRole[];
}

export function EditorLayout({ 
  children, 
  initialProjects = [], 
  initialSharedProjects = [] 
}: EditorLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ProjectDialogsProvider 
      initialProjects={initialProjects} 
      initialSharedProjects={initialSharedProjects}
    >
      <div className="relative flex flex-col h-screen w-full overflow-hidden bg-base text-text-primary">
        <EditorNavbar 
          isSidebarOpen={isSidebarOpen} 
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        
        <div className="flex-1 relative overflow-hidden flex flex-col">
          <ProjectSidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
          />
          
          <main className="flex-1 h-full w-full relative">
            {children}
          </main>
        </div>
      </div>
      <ProjectDialogs />
    </ProjectDialogsProvider>
  );
}
