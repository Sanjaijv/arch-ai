"use client";

import { useState, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";

export type DialogType = "create" | "rename" | "delete" | null;

export interface ProjectActionState {
  isOpen: boolean;
  type: DialogType;
  projectId?: string;
  projectName?: string;
}

export function useProjectActions() {
  const router = useRouter();
  const [state, setState] = useState<ProjectActionState>({
    isOpen: false,
    type: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
  });

  // Slugify logic for room ID / Project ID alignment
  const slug = useMemo(() => {
    if (!formData.name) return "";
    
    const base = formData.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
    
    // The spec mentions a short unique suffix
    // Since we don't know the full list of slugs here to check for uniqueness,
    // we'll append a short random string as the "unique suffix".
    // However, the spec says "generate a short unique suffix" during creation.
    // We'll add it in handleCreate.
    return base;
  }, [formData.name]);

  const openCreate = useCallback(() => {
    setFormData({ name: "" });
    setState({ isOpen: true, type: "create" });
  }, []);

  const openRename = useCallback((id: string, name: string) => {
    setFormData({ name });
    setState({ isOpen: true, type: "rename", projectId: id, projectName: name });
  }, []);

  const openDelete = useCallback((id: string, name: string) => {
    setState({ isOpen: true, type: "delete", projectId: id, projectName: name });
  }, []);

  const close = useCallback(() => {
    setState((prev) => ({ ...prev, isOpen: false }));
    setTimeout(() => {
      setState({ isOpen: false, type: null });
      setFormData({ name: "" });
    }, 200);
  }, []);

  const handleCreate = useCallback(async () => {
    if (!formData.name) return;
    
    setIsLoading(true);
    try {
      const suffix = Math.random().toString(36).substring(2, 6);
      const projectId = `${slug}-${suffix}`;
      
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          id: projectId, // Passing the custom ID to align with room ID
          name: formData.name,
          slug: projectId // We'll store the same thing in slug field
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("[CREATE_PROJECT_API_ERROR]", {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        throw new Error(errorData.error || "Failed to create project");
      }

      const project = await response.json();
      close();
      router.refresh(); // Refresh to update the sidebar
      router.push(`/editor/${project.id}`);
    } catch (error: any) {
      console.error("[CREATE_PROJECT_HANDLER_ERROR]", error);
      // You could set an error state here to show in the UI if needed
    } finally {
      setIsLoading(false);
    }
  }, [formData.name, slug, close, router]);

  const handleRename = useCallback(async () => {
    if (!formData.name || !state.projectId) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/projects/${state.projectId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: formData.name }),
      });

      if (!response.ok) throw new Error("Failed to rename project");

      close();
      router.refresh();
    } catch (error) {
      console.error("[RENAME_PROJECT]", error);
    } finally {
      setIsLoading(false);
    }
  }, [formData.name, state.projectId, close, router]);

  const handleDelete = useCallback(async () => {
    if (!state.projectId) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/projects/${state.projectId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete project");

      close();
      
      // If we are on the project page being deleted, redirect to /editor
      const isCurrentProject = window.location.pathname.includes(`/editor/${state.projectId}`);
      if (isCurrentProject) {
        router.push("/editor");
      } else {
        router.refresh();
      }
    } catch (error) {
      console.error("[DELETE_PROJECT]", error);
    } finally {
      setIsLoading(false);
    }
  }, [state.projectId, close, router]);

  return {
    state,
    formData,
    setFormData,
    slug,
    isLoading,
    openCreate,
    openRename,
    openDelete,
    close,
    handleCreate,
    handleRename,
    handleDelete,
  };
}
