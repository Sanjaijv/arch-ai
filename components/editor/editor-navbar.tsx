"use client";

import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

interface EditorNavbarProps {
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export function EditorNavbar({ isSidebarOpen, onToggleSidebar }: EditorNavbarProps) {
  return (
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
        <span className="font-semibold text-text-primary tracking-tight">Arch AI</span>
      </div>

      {/* Right Section */}
      <div className="flex items-center justify-end w-1/3">
        <UserButton />
      </div>
    </nav>
  );
}
