"use client";

import { LayoutGrid, PanelLeftClose, PanelLeftOpen, Sparkles } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { ShareDialog } from "./share-dialog";
import { useTemplates } from "./template-context";

interface EditorNavbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  projectName?: string;
  projectId?: string;
  isOwner?: boolean;
  isAiSidebarOpen?: boolean;
  onToggleAiSidebar?: () => void;
}

export function EditorNavbar({ 
  isSidebarOpen, 
  onToggleSidebar, 
  projectName,
  projectId,
  isOwner = false,
  isAiSidebarOpen,
  onToggleAiSidebar
}: EditorNavbarProps) {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const { openModal } = useTemplates();

  return (
    <>
    <nav className="h-14 border-b border-border-default bg-surface flex items-center px-4 sticky top-0 z-50">
      {/* Left Section */}
      <div className="flex items-center w-1/3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="text-text-secondary hover:text-text-primary"
          title={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
          aria-expanded={isSidebarOpen}
          aria-controls="project-sidebar"
        >
          {isSidebarOpen ? (
            <PanelLeftClose className="h-5 w-5" />
          ) : (
            <PanelLeftOpen className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Center Section */}
      <div className="flex items-center justify-center w-1/3">
        <span className="font-semibold text-text-primary tracking-tight truncate max-w-[200px]">
          {projectName || "Arch AI"}
        </span>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-end w-1/3 gap-3">
        {projectName && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={openModal}
              className="hidden lg:flex text-text-secondary hover:text-text-primary font-medium px-3 h-8 rounded-lg gap-2"
            >
              <LayoutGrid className="h-4 w-4" />
              Templates
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsShareOpen(true)}
              className="hidden md:flex text-text-secondary hover:text-text-primary font-medium px-3 h-8 rounded-lg"
            >
              Share
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleAiSidebar}
              className={cn(
                "h-8 w-8 text-text-secondary hover:text-text-primary",
                isAiSidebarOpen && "text-accent-primary"
              )}
              title={isAiSidebarOpen ? "Close AI chat" : "Open AI chat"}
            >
              <Sparkles className="h-4 w-4" />
            </Button>
            <div className="w-[1px] h-4 bg-border-default mx-1" />
          </>
        )}
        <UserButton />
      </div>

      {projectId && (
        <ShareDialog
          isOpen={isShareOpen}
          onOpenChange={setIsShareOpen}
          projectId={projectId}
          isOwner={isOwner}
        />
      )}
    </nav>
    </>
  );
}
