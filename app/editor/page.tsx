"use client";

import { EditorLayout } from "@/components/editor/editor-layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useProjectDialogsContext } from "@/components/editor/project-dialogs-context";

function EditorHomeContent() {
  const { openCreate } = useProjectDialogsContext();

  return (
    <div className="h-full w-full flex items-center justify-center bg-[radial-gradient(circle_at_center,var(--border-default)_1px,transparent_1px)] bg-[length:24px_24px]">
      <div className="flex flex-col items-center gap-8 text-center px-4 max-w-lg">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary">
            Create a project or open an existing one
          </h1>
          <p className="text-text-secondary text-lg">
            Start a new architecture workspace, or choose a project from the sidebar.
          </p>
        </div>
        
        <Button 
          size="lg" 
          className="bg-accent-primary hover:bg-accent-primary/90 text-black font-bold h-14 px-8 rounded-2xl shadow-[0_0_20px_rgba(0,200,212,0.25)] transition-all active:scale-[0.98] group"
          onClick={openCreate}
        >
          <Plus className="h-5 w-5 mr-2 stroke-[3px] group-hover:rotate-90 transition-transform duration-300" />
          New Project
        </Button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <EditorLayout>
      <EditorHomeContent />
    </EditorLayout>
  );
}
