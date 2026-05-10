"use client";

import { useState, useCallback, useMemo } from "react";

export type DialogType = "create" | "rename" | "delete" | null;

export interface ProjectDialogState {
  isOpen: boolean;
  type: DialogType;
  projectId?: string;
  projectName?: string;
}

export function useProjectDialogs() {
  const [projects, setProjects] = useState([
    { id: "1", name: "E-commerce Monolith", slug: "e-commerce-monolith", owned: true },
    { id: "2", name: "Notification Service", slug: "notification-service", owned: true },
  ]);

  const [state, setState] = useState<ProjectDialogState>({
    isOpen: false,
    type: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
  });

  const slug = useMemo(() => {
    return formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
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
    // Delay resetting type to avoid flicker during close animation
    setTimeout(() => {
      setState({ isOpen: false, type: null });
      setFormData({ name: "" });
    }, 200);
  }, []);

  const handleCreate = useCallback(async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newProject = {
      id: Math.random().toString(36).substring(7),
      name: formData.name,
      slug: slug,
      owned: true,
    };
    setProjects((prev) => [...prev, newProject]);
    setIsLoading(false);
    close();
  }, [formData.name, slug, close]);

  const handleRename = useCallback(async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setProjects((prev) =>
      prev.map((p) =>
        p.id === state.projectId ? { ...p, name: formData.name } : p
      )
    );
    setIsLoading(false);
    close();
  }, [formData.name, state.projectId, close]);

  const handleDelete = useCallback(async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setProjects((prev) => prev.filter((p) => p.id !== state.projectId));
    setIsLoading(false);
    close();
  }, [state.projectId, close]);

  return {
    projects,
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

export type UseProjectDialogsReturn = ReturnType<typeof useProjectDialogs>;
