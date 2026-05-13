"use client";

import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Background,
  MiniMap,
  BackgroundVariant,
  ConnectionMode,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  useReactFlow,
} from "@xyflow/react";
import { useLiveblocksFlow } from "@liveblocks/react-flow";
import { useMutation, useStorage, useHistory } from "@liveblocks/react/suspense";
import { LiveObject } from "@liveblocks/client";
import { ShapePanel } from "./shape-panel";
import { CanvasControls } from "./canvas-controls";
import { useKeyboardShortcuts } from "@/hooks/use-keyboard-shortcuts";
import { CanvasNodeComponent } from "./nodes/canvas-node";
import { CanvasNode } from "@/types/canvas";
import { DragProvider, useDrag } from "./drag-context";
import { DragPreview } from "./drag-preview";
import { StarterTemplatesModal } from "./starter-templates-modal";
import { useTemplates } from "./template-context";
import { CanvasTemplate } from "./starter-templates";
import "@xyflow/react/dist/style.css";

import { CanvasEdgeComponent } from "./edges/canvas-edge";
import { MarkerType } from "@xyflow/react";

const nodeTypes = {
  canvasNode: CanvasNodeComponent,
};

const edgeTypes = {
  canvasEdge: CanvasEdgeComponent,
};

const defaultEdgeOptions = {
  type: "canvasEdge",
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "#64748b",
  },
};

function CanvasContent() {
  // 1. Force suspense to wait for storage to load before rendering
  useStorage((root) => root.flow.nodes);

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useLiveblocksFlow({
    suspense: true,
  });

  const { screenToFlowPosition, zoomIn, zoomOut, fitView } = useReactFlow();
  const { setMousePosition } = useDrag();
  const history = useHistory();
  const { isModalOpen, closeModal } = useTemplates();

  const importTemplate = useMutation(({ storage }, template: CanvasTemplate) => {
    const flow = storage.get("flow");
    const nodesMap = flow.get("nodes");
    const edgesMap = flow.get("edges");

    // Clear existing
    Array.from(nodesMap.keys()).forEach((key) => nodesMap.delete(key));
    Array.from(edgesMap.keys()).forEach((key) => edgesMap.delete(key));

    // Use onNodesChange and onEdgesChange to add items correctly
    // This ensures they are wrapped with toLiveblocksInternalNode which adds setLocal
    onNodesChange(template.nodes.map(node => ({ type: "add", item: node as any })));
    onEdgesChange(template.edges.map(edge => ({ type: "add", item: edge as any })));

    // Fit view after a short delay to allow React Flow to process the changes
    setTimeout(() => {
      fitView({ duration: 800, padding: 0.2 });
    }, 100);
  }, [fitView, onNodesChange, onEdgesChange]);

  // Initialize keyboard shortcuts
  useKeyboardShortcuts({
    undo: () => history.undo(),
    redo: () => history.redo(),
  });

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    
    // Update mouse position for the ghost preview
    setMousePosition({ x: event.clientX, y: event.clientY });
  }, [setMousePosition]);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const data = 
        event.dataTransfer.getData("application/x-arch-ai") || 
        event.dataTransfer.getData("application/reactflow") || 
        event.dataTransfer.getData("text/plain");

      if (!data) return;
      if (!data.trim().startsWith("{")) return;

      try {
        const { type, width, height } = JSON.parse(data);

        const position = screenToFlowPosition({
          x: event.clientX - (width || 150) / 2,
          y: event.clientY - (height || 100) / 2,
        });

        const newNode: CanvasNode = {
          id: `${type}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          type: "canvasNode",
          position,
          data: {
            label: "",
            shape: type,
            width: width || 150,
            height: height || 100,
            color: "#1F1F1F",
          },
        };

        // Use onNodesChange to add the node correctly
        onNodesChange([{ type: "add", item: newNode as any }]);
      } catch (error) {
        console.error("Failed to parse dropped data:", error);
      }
    },
    [screenToFlowPosition, onNodesChange]
  );

  return (
    <div 
      className="h-full w-full relative bg-bg-base overflow-hidden"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <ReactFlow
        nodes={nodes ?? []}
        edges={edges ?? []}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        connectionMode={ConnectionMode.Loose}
        fitView
        colorMode="dark"
        className="!bg-transparent !border-none !shadow-none"
      >
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1} 
          color="rgba(255, 255, 255, 0.08)"
        />
      </ReactFlow>
      <CanvasControls />
      <ShapePanel />
      <DragPreview />
      <StarterTemplatesModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        onImport={importTemplate}
      />
    </div>
  );
}

export function Canvas() {
  return (
    <DragProvider>
      <CanvasContent />
    </DragProvider>
  );
}
