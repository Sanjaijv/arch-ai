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
import { useMutation, useStorage } from "@liveblocks/react/suspense";
import { ShapePanel } from "./shape-panel";
import { CanvasNodeComponent, CanvasNode } from "./nodes/canvas-node";
import "@xyflow/react/dist/style.css";

const nodeTypes = {
  canvasNode: CanvasNodeComponent,
};

export function Canvas() {
  // 1. Force suspense to wait for storage to load before rendering
  useStorage((root) => root.nodes);

  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
  } = useLiveblocksFlow({
    suspense: true,
  });

  const { screenToFlowPosition } = useReactFlow();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      // Try to get data from multiple formats for cross-browser compatibility
      // Prioritize our specific custom type to avoid collisions with other drag data
      const data = 
        event.dataTransfer.getData("application/x-arch-ai") || 
        event.dataTransfer.getData("application/reactflow") || 
        event.dataTransfer.getData("text/plain");

      if (!data) {
        console.warn("No drag data found");
        return;
      }

      // Basic validation to avoid SyntaxError with non-JSON data (like "drag")
      if (!data.trim().startsWith("{")) {
        console.warn("Dropped data is not a valid JSON object:", data);
        return;
      }

      try {
        const { type, width, height } = JSON.parse(data);

        // Get drop position relative to the flow and center the node
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
            color: "#1F1F1F", // Default color
          },
        };

        // Use onNodesChange to add the node - this is more integrated with useLiveblocksFlow
        onNodesChange([{ type: "add", item: newNode as any }]);
      } catch (error) {
        console.error("Failed to parse dropped data:", error, data);
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
        onNodesChange={onNodesChange as OnNodesChange}
        onEdgesChange={onEdgesChange as OnEdgesChange}
        onConnect={onConnect as OnConnect}
        nodeTypes={nodeTypes}
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
        <MiniMap 
          className="!bg-bg-surface/80 !backdrop-blur-md !border-border-default rounded-xl overflow-hidden shadow-2xl"
          maskColor="rgba(0, 0, 0, 0.6)"
          nodeColor="rgba(255, 255, 255, 0.1)"
          nodeStrokeWidth={3}
          zoomable
          pannable
        />
      </ReactFlow>
      <ShapePanel />
    </div>
  );
}
