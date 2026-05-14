"use client";

import { useCallback, useMemo, useEffect, useRef } from "react";
import {
  ReactFlow,
  Background,
  MiniMap,
  BackgroundVariant,
  ConnectionMode,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  useEdges,
  useNodes,
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
import { Collaborators } from "./presence/collaborators";
import { Cursors } from "./presence/cursors";
import { useSaveStatus } from "./save-status-context";
import { useAutosave } from "@/hooks/use-autosave";
import { useParams } from "next/navigation";
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
  data: { label: "" },
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: "#64748b",
  },
};

function CanvasContent() {
  // 1. Force suspense to wait for storage to load before rendering
  useStorage((root) => root.flow.nodes);

  const { roomId } = useParams() as { roomId: string };
  const { setStatus, setLastSaved, setOnSave } = useSaveStatus();
  
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect: onConnectBase,
  } = useLiveblocksFlow({
    suspense: true,
  });

  // Ensure new connections have initial data
  const onConnect = useCallback((params: any) => {
    onConnectBase({
      ...params,
      data: { label: "" },
    });
  }, [onConnectBase]);
// ... (lines omitted)
  // 2. Autosave hook
  const { status: saveStatus, lastSaved: saveLastSaved, saveCanvas } = useAutosave({
    projectId: roomId,
    nodes: nodes ?? [],
    edges: edges ?? [],
  });

  // Sync save status and save function to context
  useEffect(() => {
    setStatus(saveStatus);
    if (saveLastSaved) setLastSaved(saveLastSaved);
    setOnSave(saveCanvas);
  }, [saveStatus, saveLastSaved, saveCanvas, setStatus, setLastSaved, setOnSave]);

  // 3. Initial load from blob if room is empty
  const hasAttemptedLoad = useRef(false);
  const { fitView } = useReactFlow();

  useEffect(() => {
    if (hasAttemptedLoad.current) return;
    
    const loadSavedCanvas = async () => {
      // Only load if the room is truly empty
      if (nodes.length === 0 && edges.length === 0) {
        hasAttemptedLoad.current = true;
        try {
          const response = await fetch(`/api/projects/${roomId}/canvas`);
          if (response.ok) {
            const data = await response.json();
            if (data.nodes && data.nodes.length > 0) {
              // Load the data into the room
              onNodesChange(data.nodes.map((node: any) => ({ type: "add", item: node })));
              onEdgesChange(data.edges.map((edge: any) => ({ type: "add", item: edge })));
              
              // Fit view after loading existing nodes
              setTimeout(() => {
                fitView({ duration: 800, padding: 0.2 });
              }, 100);
            }
          }
        } catch (error) {
          console.error("Failed to load saved canvas:", error);
        }
      } else if (nodes.length > 0 || edges.length > 0) {
        // If room is not empty, we don't need to load from blob
        hasAttemptedLoad.current = true;
        // Also fit view if there's content
        setTimeout(() => {
          fitView({ duration: 800, padding: 0.2 });
        }, 100);
      }
    };

    loadSavedCanvas();
  }, [roomId, nodes.length, edges.length, onNodesChange, onEdgesChange, fitView]);

  const { screenToFlowPosition, zoomIn, zoomOut } = useReactFlow();
  const reactFlowNodes = useNodes();
  const reactFlowEdges = useEdges();
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

  const deleteSelected = useMutation(({ storage }) => {
    const flow = storage.get("flow");
    const nodesMap = flow.get("nodes");
    const edgesMap = flow.get("edges");

    const selectedNodes = reactFlowNodes.filter(node => node.selected);
    const selectedEdges = reactFlowEdges.filter(edge => edge.selected);

    if (selectedNodes.length === 0 && selectedEdges.length === 0) return;

    // 1. Delete selected edges
    selectedEdges.forEach(edge => {
      edgesMap.delete(edge.id);
    });

    // 2. Delete selected nodes and their connected edges
    selectedNodes.forEach(node => {
      nodesMap.delete(node.id);
      
      // Also cleanup edges connected to the deleted node
      reactFlowEdges.forEach(edge => {
        if (edge.source === node.id || edge.target === node.id) {
          edgesMap.delete(edge.id);
        }
      });
    });
  }, [reactFlowNodes, reactFlowEdges]);

  // Issue 2: Collaborative Deletion
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isDeleteKey = event.key === "Delete" || event.key === "Backspace";
      if (!isDeleteKey) return;

      // Don't fire if the user is typing in an input
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" || 
        target.tagName === "TEXTAREA" || 
        target.isContentEditable ||
        target.closest('.nodrag')
      ) {
        return;
      }

      const selectedNodes = reactFlowNodes.filter(node => node.selected);
      const selectedEdges = reactFlowEdges.filter(edge => edge.selected);

      if (selectedNodes.length === 0 && selectedEdges.length === 0) return;

      // Prevent default behavior (like Backspace going back in history)
      event.preventDefault();
      deleteSelected();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [deleteSelected, reactFlowNodes, reactFlowEdges]);

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

  const updateMyPresence = useMutation(({ setMyPresence }, event: React.PointerEvent) => {
    const position = screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });
    setMyPresence({ cursor: position });
  }, [screenToFlowPosition]);

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  return (
    <div
      className="h-full w-full relative bg-bg-base overflow-hidden"
      onDragOver={onDragOver}
      onDrop={onDrop}
      onPointerMove={(e) => updateMyPresence(e)}
      onPointerLeave={onPointerLeave}
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
      <Cursors />

      {/* Floating UI */}
      <div className="absolute top-4 right-4 z-50 pointer-events-none">
        <Collaborators />
      </div>

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
