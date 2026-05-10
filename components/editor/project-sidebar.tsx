"use client";
import { useEffect } from "react";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface ProjectSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectSidebar({ isOpen, onClose }: ProjectSidebarProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);
  return (
    <>
      {/* Backdrop for mobile or just to dim background when sidebar is open */}
      <div
        className={cn(
          "fixed inset-0 bg-black/40 z-[55] transition-opacity duration-300",
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
          "fixed left-0 top-0 bottom-0 z-[60] w-80 bg-surface border-r border-border-default transform transition-transform duration-300 ease-in-out flex flex-col rounded-r-2xl shadow-2xl overflow-hidden",
          isOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"
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
              <div className="px-4 py-4">
                <TabsContent value="my-projects" className="mt-0 focus-visible:outline-none">
                  <div className="flex flex-col items-center justify-center py-20 text-center space-y-2">
                    <div className="h-12 w-12 rounded-full bg-subtle flex items-center justify-center mb-2">
                      <Plus className="h-6 w-6 text-text-muted" />
                    </div>
                    <p className="text-sm font-medium text-text-secondary">No projects yet</p>
                    <p className="text-xs text-text-muted max-w-[200px]">Create your first project to start designing your system architecture.</p>
                  </div>
                </TabsContent>

                <TabsContent value="shared" className="mt-0 focus-visible:outline-none">
                  <div className="flex flex-col items-center justify-center py-20 text-center space-y-2">
                    <p className="text-sm font-medium text-text-secondary">No shared projects</p>
                    <p className="text-xs text-text-muted max-w-[200px]">Projects shared with you by collaborators will appear here.</p>
                  </div>
                </TabsContent>
              </div>
            </ScrollArea>
          </Tabs>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border-default shrink-0">
          <Button className="w-full bg-primary text-primary-foreground font-semibold h-11" size="default">
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </aside>
    </>
  );
}
