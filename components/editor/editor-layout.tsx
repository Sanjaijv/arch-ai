"use client";

import { EditorNavbar } from "./editor-navbar";
import { ProjectSidebar } from "./project-sidebar";
import { ProjectWithRole } from "@/lib/projects";

import { ProjectDialogsProvider } from "./project-dialogs-context";
import { ProjectDialogs } from "./project-dialogs";
import { TemplateProvider } from "./template-context";
import { SaveStatusProvider } from "./save-status-context";
import { LayoutProvider, useLayout } from "./layout-context";

interface EditorLayoutProps {
  children: React.ReactNode;
  initialProjects: ProjectWithRole[];
  initialSharedProjects: ProjectWithRole[];
  projectName?: string;
  activeProjectId?: string;
  isOwner?: boolean;
}

export function EditorLayout(props: EditorLayoutProps) {
  return (
    <LayoutProvider>
      <EditorLayoutContent {...props} />
    </LayoutProvider>
  );
}

function EditorLayoutContent({ 
  children, 
  initialProjects = [], 
  initialSharedProjects = [],
  projectName,
  activeProjectId,
  isOwner = false
}: EditorLayoutProps) {
  const { isSidebarOpen, setIsSidebarOpen, isAiSidebarOpen, setIsAiSidebarOpen } = useLayout();

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
            
            <main className="h-full w-full relative !m-0 !p-0 !border-none !rounded-none !ring-0">
              {/* Canvas Area - Always full size */}
              <div className="absolute inset-0 bg-base overflow-hidden !m-0 !p-0 !border-none !rounded-none !ring-0">
                {children}
              </div>
            </main>
          </div>
        </div>
        </TemplateProvider>
      </SaveStatusProvider>
      <ProjectDialogs />
    </ProjectDialogsProvider>
  );
}
