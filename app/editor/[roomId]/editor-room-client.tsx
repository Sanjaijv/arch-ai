"use client";

import { CanvasWrapper } from "@/components/editor/canvas-wrapper";
import { Canvas } from "@/components/editor/canvas";
import { AiSidebar } from "@/components/editor/ai-sidebar";
import { useLayout } from "@/components/editor/layout-context";

export function EditorRoomClient({ roomId }: { roomId: string }) {
  const { isAiSidebarOpen, setIsAiSidebarOpen } = useLayout();

  return (
    <CanvasWrapper roomId={roomId}>
      <Canvas />
      <AiSidebar 
        isOpen={isAiSidebarOpen} 
        onClose={() => setIsAiSidebarOpen(false)} 
      />
    </CanvasWrapper>
  );
}
