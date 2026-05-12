"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Plus, MoreVertical, Edit2, Trash2, Folder } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useProjectDialogsContext } from "./project-dialogs-context";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeProjectId?: string;
}

export function ProjectSidebar({ isOpen, onClose, activeProjectId }: ProjectSidebarProps) {
  const { 
    openCreate, 
    openRename, 
    openDelete, 
    projects, 
    sharedProjects 
  } = useProjectDialogsContext();
  const router = useRouter();

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const handleProjectClick = (projectId: string) => {
    router.push(`/editor/${projectId}`);
    onClose();
  };

  return (
    <>
      {/* Backdrop for mobile or just to dim background when sidebar is open */}
      <div
        className={cn(
          "absolute inset-0 bg-black/40 z-[55] transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      <aside
        id="project-sidebar"
        role="dialog"
        aria-modal={isOpen}
        aria-hidden={!isOpen}
        inert={!isOpen}
        aria-labelledby="projects-sidebar-title"
        className={cn(
          "absolute left-0 top-0 bottom-0 z-[60] w-80 bg-surface/90 backdrop-blur-xl border-r border-border-default transform transition-transform duration-300 ease-in-out flex flex-col rounded-r-2xl shadow-2xl overflow-hidden",
          isOpen ? "translate-x-0" : "-translate-x-[110%] pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="h-14 flex items-center justify-between px-4 border-b border-border-default shrink-0">
          <h2 id="projects-sidebar-title" className="text-lg font-semibold text-text-primary">Projects</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-text-muted hover:text-text-primary"
            title="Close projects"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Tabs Content */}
        <div className="flex-1 flex flex-col min-h-0">
          <Tabs defaultValue="my-projects" className="flex-1 flex flex-col min-h-0">
            <div className="px-4 pt-4 shrink-0">
              <TabsList className="w-full bg-subtle p-1 rounded-xl">
                <TabsTrigger value="my-projects" className="flex-1 rounded-lg">My Projects</TabsTrigger>
                <TabsTrigger value="shared" className="flex-1 rounded-lg">Shared</TabsTrigger>
              </TabsList>
            </div>

            <ScrollArea className="flex-1">
              <div className="px-4 py-4 space-y-1">
                <TabsContent value="my-projects" className="mt-0 focus-visible:outline-none space-y-1">
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <div
                        key={project.id}
                        onClick={() => handleProjectClick(project.id)}
                        className={cn(
                          "group flex items-center justify-between p-2 rounded-xl hover:bg-subtle transition-colors cursor-pointer border border-transparent hover:border-border-default",
                          activeProjectId === project.id && "bg-subtle border-border-default shadow-sm ring-1 ring-accent-primary/20"
                        )}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={cn(
                            "h-9 w-9 rounded-lg bg-bg-elevated flex items-center justify-center shrink-0 border border-border-subtle group-hover:border-accent-primary-dim",
                            activeProjectId === project.id && "border-accent-primary bg-accent-primary/5"
                          )}>
                            <Folder className={cn(
                              "h-4 w-4 text-text-muted group-hover:text-accent-primary",
                              activeProjectId === project.id && "text-accent-primary"
                            )} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-text-primary truncate">
                              {project.name}
                            </p>
                            <p className="text-[10px] text-text-muted font-mono truncate uppercase tracking-wider">
                              /{project.slug}
                            </p>
                          </div>
                        </div>
                        
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            onClick={(e) => e.stopPropagation()}
                            className={cn(
                              buttonVariants({ variant: "ghost", size: "icon" }),
                              "h-8 w-8 text-text-muted hover:text-text-primary md:opacity-0 md:group-hover:opacity-100 transition-opacity"
                            )}
                          >
                            <MoreVertical className="h-4 w-4" />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem onClick={(e) => {
                              e.stopPropagation();
                              openRename(project.id, project.name);
                            }}>
                              <Edit2 className="h-4 w-4 mr-2" />
                              Rename
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-state-error focus:text-state-error" 
                              onClick={(e) => {
                                e.stopPropagation();
                                openDelete(project.id, project.name);
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-2">
                      <div className="h-12 w-12 rounded-full bg-subtle flex items-center justify-center mb-2">
                        <Plus className="h-6 w-6 text-text-muted" />
                      </div>
                      <p className="text-sm font-medium text-text-secondary">No projects yet</p>
                      <p className="text-xs text-text-muted max-w-[200px]">Create your first project to start designing your system architecture.</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="shared" className="mt-0 focus-visible:outline-none space-y-1">
                  {sharedProjects.length > 0 ? (
                    sharedProjects.map((project) => (
                      <div
                        key={project.id}
                        onClick={() => handleProjectClick(project.id)}
                        className={cn(
                          "group flex items-center justify-between p-2 rounded-xl hover:bg-subtle transition-colors cursor-pointer border border-transparent hover:border-border-default",
                          activeProjectId === project.id && "bg-subtle border-border-default shadow-sm ring-1 ring-accent-primary/20"
                        )}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className={cn(
                            "h-9 w-9 rounded-lg bg-bg-elevated flex items-center justify-center shrink-0 border border-border-subtle",
                            activeProjectId === project.id && "border-accent-primary bg-accent-primary/5"
                          )}>
                            <Folder className={cn(
                              "h-4 w-4 text-text-muted",
                              activeProjectId === project.id && "text-accent-primary"
                            )} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-text-primary truncate">
                              {project.name}
                            </p>
                            <p className="text-[10px] text-text-muted font-mono truncate uppercase tracking-wider">
                              /{project.slug}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center space-y-2">
                      <p className="text-sm font-medium text-text-secondary">No shared projects</p>
                      <p className="text-xs text-text-muted max-w-[200px]">Projects shared with you by collaborators will appear here.</p>
                    </div>
                  )}
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border-default shrink-0">
          <Button 
            className="w-full bg-accent-primary hover:bg-accent-primary/90 text-black font-bold h-11 rounded-xl shadow-[0_0_15px_rgba(0,200,212,0.3)] transition-all active:scale-[0.98]" 
            size="default"
            onClick={openCreate}
          >
            <Plus className="h-4 w-4 mr-2 stroke-[3px]" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  );
}
