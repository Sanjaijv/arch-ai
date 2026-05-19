"use client";

import { 
  ZoomIn, 
  ZoomOut, 
  Maximize, 
  Undo2, 
  Redo2 
} from "lucide-react";
import { useReactFlow } from "@xyflow/react";
import { useHistory } from "@liveblocks/react/suspense";
import { cn } from "@/lib/utils";

export function CanvasControls() {
  const { zoomIn, zoomOut, fitView } = useReactFlow();
  const history = useHistory();

  // Helper to handle actions with a short animation
  const handleZoomIn = () => zoomIn({ duration: 300 });
  const handleZoomOut = () => zoomOut({ duration: 300 });
  const handleFitView = () => fitView({ duration: 300 });

  const canUndo = history.canUndo();
  const canRedo = history.canRedo();

  return (
    <div className="absolute bottom-8 left-8 z-50">
      <div className="flex items-center gap-1 p-1.5 bg-surface/80 backdrop-blur-xl border border-border-default rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <ControlButton 
            onClick={handleZoomOut} 
            title="Zoom Out"
            icon={ZoomOut}
          />
          <ControlButton 
            onClick={handleFitView} 
            title="Fit View"
            icon={Maximize}
          />
          <ControlButton 
            onClick={handleZoomIn} 
            title="Zoom In"
            icon={ZoomIn}
          />
        </div>

        {/* Divider */}
        <div className="w-[1px] h-4 bg-border-default mx-1" />

        {/* History Controls */}
        <div className="flex items-center gap-1">
          <ControlButton 
            onClick={() => history.undo()} 
            disabled={!canUndo}
            title="Undo"
            icon={Undo2}
          />
          <ControlButton 
            onClick={() => history.redo()} 
            disabled={!canRedo}
            title="Redo"
            icon={Redo2}
          />
        </div>
      </div>
    </div>
  );
}

interface ControlButtonProps {
  onClick: () => void;
  disabled?: boolean;
  title: string;
  icon: any;
}

function ControlButton({ onClick, disabled, title, icon: Icon }: ControlButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "p-2 rounded-full transition-all duration-200",
        "text-text-muted hover:text-text-primary hover:bg-subtle",
        "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-text-muted",
        "flex items-center justify-center"
      )}
    >
      <Icon size={18} strokeWidth={2} />
    </button>
  );
}
