"use client";

import { useState } from "react";
import { EditorNavbar } from "./editor-navbar";
import { ProjectSidebar } from "./project-sidebar";
import { ProjectWithRole } from "@/lib/projects";
import { AiSidebar } from "./ai-sidebar";

import { ProjectDialogsProvider } from "./project-dialogs-context";
import { ProjectDialogs } from "./project-dialogs";
import { TemplateProvider } from "./template-context";
import { SaveStatusProvider } from "./save-status-context";

interface EditorLayoutProps {
  children: React.ReactNode;
  initialProjects: ProjectWithRole[];
  initialSharedProjects: ProjectWithRole[];
  projectName?: string;
  activeProjectId?: string;
  isOwner?: boolean;
}

export function EditorLayout({ 
  children, 
  initialProjects = [], 
  initialSharedProjects = [],
  projectName,
  activeProjectId,
  isOwner = false
}: EditorLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAiSidebarOpen, setIsAiSidebarOpen] = useState(false);

  return (
    <ProjectDialogsProvider 
      initialProjects={initialProjects} 
      initialSharedProjects={initialSharedProjects}
    >
      <SaveStatusProvider>
        <TemplateProvider>
          <div className="relative flex flex-col h-screen w-full overflow-hidden bg-base text-text-primary">
          <EditorNavbar 
            isSidebarOpen={isSidebarOpen} 
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
            projectName={projectName}
            projectId={activeProjectId}
            isOwner={isOwner}
            isAiSidebarOpen={isAiSidebarOpen}
            onToggleAiSidebar={() => setIsAiSidebarOpen(!isAiSidebarOpen)}
          />
          
          <div className="flex-1 relative overflow-hidden">
            {/* Project Sidebar (Left) */}
            <ProjectSidebar 
              isOpen={isSidebarOpen} 
              onClose={() => setIsSidebarOpen(false)} 
              activeProjectId={activeProjectId}
            />
            
            <main className="h-full w-full relative">
              {/* Canvas Area - Always full size */}
              <div className="absolute inset-0 bg-base overflow-hidden">
                {children}
              </div>

              {/* AI Sidebar (Right) - Floats over canvas */}
              <AiSidebar 
                isOpen={isAiSidebarOpen} 
                onClose={() => setIsAiSidebarOpen(false)} 
              />
            </main>
          </div>
        </div>
        </TemplateProvider>
      </SaveStatusProvider>
      <ProjectDialogs />
    </ProjectDialogsProvider>
  );
}
