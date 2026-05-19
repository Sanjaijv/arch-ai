"use client";

import { useProjectDialogsContext } from "./project-dialogs-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useRef } from "react";

export function ProjectDialogs() {
  return (
    <>
      <CreateProjectDialog />
      <RenameProjectDialog />
      <DeleteProjectDialog />
    </>
  );
}

function CreateProjectDialog() {
  const { state, formData, setFormData, slug, isLoading, handleCreate, close } =
    useProjectDialogsContext();
  const isOpen = state.isOpen && state.type === "create";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Enter a name for your new architecture workspace.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              placeholder="e.g. My Awesome System"
              value={formData.name}
              onChange={(e) => setFormData({ name: e.target.value })}
              autoFocus
            />
          </div>
          <div className="flex flex-col gap-1.5 px-3 py-2 rounded-xl bg-subtle border border-border-default">
            <span className="text-[10px] uppercase tracking-wider text-text-muted font-bold">
              Project Slug Preview
            </span>
            <code className="text-sm text-accent-primary font-mono truncate">
              arch-ai.com/editor/{slug ? `${slug}-[unique]` : "..."}
            </code>
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={close} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleCreate}
            disabled={isLoading || !formData.name.trim()}
          >
            {isLoading ? "Creating..." : "Create Project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function RenameProjectDialog() {
  const { state, formData, setFormData, isLoading, handleRename, close } =
    useProjectDialogsContext();
  const isOpen = state.isOpen && state.type === "rename";
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && formData.name.trim() && !isLoading) {
      handleRename();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Rename Project</DialogTitle>
          <DialogDescription>
            Rename <span className="text-text-primary font-medium">{state.projectName}</span> to something else.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="rename-name">New Name</Label>
            <Input
              ref={inputRef}
              id="rename-name"
              value={formData.name}
              onChange={(e) => setFormData({ name: e.target.value })}
              onKeyDown={onKeyDown}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={close} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleRename}
            disabled={isLoading || !formData.name.trim() || formData.name === state.projectName}
          >
            {isLoading ? "Renaming..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DeleteProjectDialog() {
  const { state, isLoading, handleDelete, close } = useProjectDialogsContext();
  const isOpen = state.isOpen && state.type === "delete";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && close()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-state-error">Delete Project</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete <span className="text-text-primary font-medium">{state.projectName}</span>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={close} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete Project"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
