import { useEffect } from "react";
import { useReactFlow } from "@xyflow/react";

interface KeyboardShortcutsProps {
  undo: () => void;
  redo: () => void;
}

export function useKeyboardShortcuts({ undo, redo }: KeyboardShortcutsProps) {
  const { zoomIn, zoomOut } = useReactFlow();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignore shortcuts while typing in inputs, textareas, or editable text fields
      const target = event.target as HTMLElement;
      const isEditable = 
        target.tagName === "INPUT" || 
        target.tagName === "TEXTAREA" || 
        target.isContentEditable;

      if (isEditable) return;

      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const cmdCtrl = isMac ? event.metaKey : event.ctrlKey;
      const shift = event.shiftKey;

      // Zoom In: + or =
      if (event.key === "+" || event.key === "=") {
        event.preventDefault();
        zoomIn({ duration: 300 });
      }

      // Zoom Out: -
      if (event.key === "-") {
        event.preventDefault();
        zoomOut({ duration: 300 });
      }

      // Undo: Cmd/Ctrl + Z
      if (cmdCtrl && !shift && event.key.toLowerCase() === "z") {
        event.preventDefault();
        undo();
      }

      // Redo: Cmd/Ctrl + Shift + Z or Cmd/Ctrl + Y
      if (
        (cmdCtrl && shift && event.key.toLowerCase() === "z") ||
        (cmdCtrl && event.key.toLowerCase() === "y")
      ) {
        event.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [zoomIn, zoomOut, undo, redo]);
}
