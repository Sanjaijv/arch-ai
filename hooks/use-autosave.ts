import { useState, useEffect, useCallback, useRef } from "react";
import { Node, Edge } from "@xyflow/react";

export type SaveStatus = "idle" | "saving" | "saved" | "error";

interface UseAutosaveProps {
  projectId: string;
  nodes: Node[];
  edges: Edge[];
}

export function useAutosave({ projectId, nodes, edges }: UseAutosaveProps) {
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isFirstRender = useRef(true);

  const saveCanvas = useCallback(async () => {
    if (!projectId) return;

    setStatus("saving");
    try {
      const response = await fetch(`/api/projects/${projectId}/canvas`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to save canvas: ${response.status} ${response.statusText} - ${errorText}`);
      }

      setStatus("saved");
      setLastSaved(new Date());
    } catch (error) {
      console.error("Autosave error details:", error);
      setStatus("error");
    }
  }, [projectId, nodes, edges]);

  useEffect(() => {
    // Skip saving on the very first render to avoid saving empty state 
    // before it potentially loads from the blob
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Don't save if there are no nodes or edges (avoid wiping data if things are still loading)
    // Actually, if the user deletes everything, we DO want to save it.
    // But maybe we should wait until the room is definitely loaded.
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      saveCanvas();
    }, 2000); // Debounce for 2 seconds

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [nodes, edges, saveCanvas]);

  return { status, lastSaved, saveCanvas };
}
