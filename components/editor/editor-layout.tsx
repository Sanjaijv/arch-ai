"use client";

import { useState } from "react";
import { EditorNavbar } from "./editor-navbar";
import { ProjectSidebar } from "./project-sidebar";
import { Sparkles } from "lucide-react";

import { ProjectDialogsProvider } from "./project-dialogs-context";
import { ProjectDialogs } from "./project-dialogs";
import { ProjectWithRole } from "@/lib/projects";

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
        
        <div className="flex-1 relative overflow-hidden flex">
          <ProjectSidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
            activeProjectId={activeProjectId}
          />
          
          <main className="flex-1 h-full relative flex">
            {/* Canvas Area */}
            <div className="flex-1 h-full bg-base overflow-hidden relative">
              {children}
            </div>

            {/* AI Sidebar Placeholder */}
            {isAiSidebarOpen && (
              <aside className="w-80 border-l border-border-default bg-surface flex flex-col shrink-0 animate-in slide-in-from-right duration-300">
                <div className="h-14 flex items-center px-4 border-b border-border-default shrink-0">
                  <h3 className="font-semibold text-text-primary">AI Assistant</h3>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                  <div className="h-12 w-12 rounded-2xl bg-accent-primary/10 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-accent-primary" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-text-primary">AI Chat coming soon</p>
                    <p className="text-xs text-text-muted">Generate and optimize your architecture with AI.</p>
                  </div>
                </div>
              </aside>
            )}
          </main>
        </div>
      </div>
      <ProjectDialogs />
    </ProjectDialogsProvider>
  );
}
