import { task, metadata } from "@trigger.dev/sdk";
import { generateText, Output, NoObjectGeneratedError } from "ai";
import { google } from "@ai-sdk/google";

const MODELS = [
  google("gemini-2.5-pro"),
  google("gemini-2.5-flash"),
  google("gemini-1.5-pro"),
];

import { getLiveblocks } from "@/lib/liveblocks";
import { createClient, LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import WebSocket from "ws";
import { NODE_COLORS, NODE_SHAPES } from "@/types/canvas";
import { z } from "zod";

const ActionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("addNode"),
    id: z.string(),
    shape: z.enum(NODE_SHAPES),
    label: z.string(),
    color: z.string(),
    x: z.number(),
    y: z.number(),
    width: z.number(),
    height: z.number(),
  }),
  z.object({
    type: z.literal("moveNode"),
    id: z.string(),
    x: z.number(),
    y: z.number(),
  }),
  z.object({
    type: z.literal("resizeNode"),
    id: z.string(),
    width: z.number(),
    height: z.number(),
  }),
  z.object({
    type: z.literal("updateNodeData"),
    id: z.string(),
    label: z.string().optional(),
    color: z.string().optional(),
    shape: z.enum(NODE_SHAPES).optional(),
  }),
  z.object({
    type: z.literal("deleteNode"),
    id: z.string(),
  }),
  z.object({
    type: z.literal("addEdge"),
    id: z.string(),
    source: z.string(),
    target: z.string(),
    label: z.string().optional(),
  }),
  z.object({
    type: z.literal("deleteEdge"),
    id: z.string(),
  }),
]);

type Action = z.infer<typeof ActionSchema>;

export const designAgent = task({
  id: "design-agent",
  run: async (payload: { prompt: string; roomId: string }) => {
    const { prompt, roomId } = payload;
    const liveblocksNode = getLiveblocks();

    // 1. Generate a session token for the AI agent
    const session = liveblocksNode.prepareSession("ghost-ai", {
      userInfo: {
        name: "Ghost AI",
        avatar: "https://arch-ai.com/ghost-ai.png",
        color: "#6457f9",
      },
    });
    session.allow(roomId, session.FULL_ACCESS);
    const { body } = await session.authorize();
    const token = JSON.parse(body).token;

    // 2. Initialize real-time client with polyfills
    const client = createClient({
      authEndpoint: async () => ({ token }),
      polyfills: {
        WebSocket: WebSocket as any,
      },
    });

    const { room, leave } = client.enterRoom(roomId, {
      initialPresence: { cursor: null, thinking: false },
      initialStorage: {
        flow: new LiveObject({
          nodes: new LiveMap(),
          edges: new LiveMap(),
        }),
        "ai-status-feed": new LiveList([]),
        "ai-chat": new LiveList([]),
      },
    });

    try {
      // 3. Setup presence and status
      const { root } = await room.getStorage();

      // Set AI presence
      room.updatePresence({ cursor: { x: 0, y: 0 }, thinking: true });

      // Ensure feeds exist
      let statusFeed = root.get("ai-status-feed") as LiveList<any>;
      if (!statusFeed) {
        root.set("ai-status-feed", new LiveList([]));
        statusFeed = root.get("ai-status-feed") as LiveList<any>;
      }

      let chatFeed = root.get("ai-chat") as LiveList<any>;
      if (!chatFeed) {
        root.set("ai-chat", new LiveList([]));
      }

      const addStatus = (text: string, level: "info" | "success" | "error" | "thinking" = "info") => {
        statusFeed.push({
          text,
          level,
          timestamp: Date.now(),
        });
        metadata.set("status", text);
      };

      addStatus(`Ghost AI: Starting generation for "${prompt}"`);

      // 4. Fetch current state
      let flow = root.get("flow") as LiveObject<any>;
      if (!flow) {
        console.log("[AI_DESIGN_AGENT] Initializing root.flow Object");
        root.set("flow", new LiveObject({ nodes: new LiveMap(), edges: new LiveMap() }));
        flow = root.get("flow") as LiveObject<any>;
      }
      
      let nodesMap = flow.get("nodes") as LiveMap<string, any>;
      let edgesMap = flow.get("edges") as LiveMap<string, any>;

      console.log(`[AI_DESIGN_AGENT] Connected to room: ${roomId}`);
      addStatus(`Ghost AI: Connected to room ${roomId}. Storage ready.`, "info");

      const currentNodes = Array.from(nodesMap.entries()).map(([id, node]) => ({
        id,
        ...(typeof (node as any).toObject === "function" ? (node as any).toObject() : node),
      }));
      const currentEdges = Array.from(edgesMap.entries()).map(([id, edge]) => ({
        id,
        ...(typeof (edge as any).toObject === "function" ? (edge as any).toObject() : edge),
      }));

      console.log(`[AI_DESIGN_AGENT] Current state: ${currentNodes.length} nodes, ${currentEdges.length} edges`);

      addStatus("Ghost AI: Analyzing architecture...");

      // 5. Generate actions with AI via OpenRouter (Manual Fallback)
      let actions: Action[] | undefined;
      let lastError: any;

      for (const model of MODELS) {
        try {
          console.log(`[AI_DESIGN_AGENT] Attempting generation with model...`);
          const result = await generateText({
            model: model,
            maxRetries: 1,
            output: Output.array({ element: ActionSchema }),
            system: `You are "Ghost AI", an expert system architect and visual designer.
Your goal is to design system architectures on a collaborative canvas.
You communicate by outputting a JSON array of actions that mutate the canvas.

CANVAS RULES:
- Coordinate system: (x, y). (0, 0) is the center of the viewport usually.
- Node Shapes: ${NODE_SHAPES.join(", ")}.
- Node Colors (Fill): ${NODE_COLORS.map(c => c.fill).join(", ")}.
- Node Padding: Ensure labels have enough space.
- Connections: Use edges to show data flow or relationships.

AVAILABLE ACTIONS:
- addNode: { type: "addNode", id: string, shape: string, label: string, color: string, x: number, y: number, width: number, height: number }
- moveNode: { type: "moveNode", id: string, x: number, y: number }
- resizeNode: { type: "resizeNode", id: string, width: number, height: number }
- updateNodeData: { type: "updateNodeData", id: string, label?: string, color?: string, shape?: string }
- deleteNode: { type: "deleteNode", id: string }
- addEdge: { type: "addEdge", id: string, source: string, target: string, label?: string }
- deleteEdge: { type: "deleteEdge", id: string }

CURRENT STATE:
Nodes: ${JSON.stringify(currentNodes)}
Edges: ${JSON.stringify(currentEdges)}

INSTRUCTIONS:
1. Interpret the user's prompt carefully.
2. If they ask to "add" something, create new nodes and edges.
3. If they ask to "reorganize" or "move", use moveNode.
4. Always provide valid IDs for new elements (e.g., "node-1", "edge-1").
5. DO NOT generate an empty array if you can satisfy the request.`,
            prompt: prompt,
          });
          actions = result.output;
          break;
        } catch (error) {
          console.warn(`[AI_DESIGN_AGENT] Model failed:`, error);
          lastError = error;
        }
      }

      if (!actions) {
        throw lastError || new Error("All fallback models failed to generate actions.");
      }

      addStatus("Ghost AI: Applying changes to canvas...");

      // 6. Apply actions to storage
      // We push a final message to the chat feed from the backend for robustness
      const pushToChat = (content: string) => {
        let chatFeed = root.get("ai-chat") as LiveList<any>;
        if (!chatFeed) {
          root.set("ai-chat", new LiveList([]));
          chatFeed = root.get("ai-chat") as LiveList<any>;
        }
        chatFeed.push({
          id: crypto.randomUUID(),
          content,
          sender: {
            id: "ghost-ai",
            name: "Ghost AI",
            avatar: "https://arch-ai.com/ghost-ai.png",
          },
          role: "assistant",
          timestamp: Date.now(),
        });
      };

      const NODE_CONFIG = {
        selected: false,
        dragging: false,
        measured: false,
        resizing: false,
        position: "atomic",
        sourcePosition: "atomic",
        targetPosition: "atomic",
        extent: "atomic",
        origin: "atomic",
        handles: "atomic",
        data: "atomic",
      };

      const EDGE_CONFIG = {
        selected: false,
        markerStart: "atomic",
        markerEnd: "atomic",
        label: "atomic",
        labelBgPadding: "atomic",
        data: "atomic",
      };

      room.batch(() => {
        for (const action of actions) {
          console.log(`[AI_DESIGN_AGENT] Applying action: ${action.type}`, action);
          
          switch (action.type) {
            case "addNode": {
              const newNode = LiveObject.from({
                id: action.id,
                type: "canvasNode",
                position: { x: action.x, y: action.y },
                width: action.width,
                height: action.height,
                data: {
                  label: action.label,
                  shape: action.shape,
                  color: action.color,
                  width: action.width,
                  height: action.height,
                },
              }, NODE_CONFIG as any);
              nodesMap.set(action.id, newNode);
              break;
            }
            case "moveNode": {
              const node = nodesMap.get(action.id);
              if (node && typeof (node as any).set === "function") {
                node.set("position", { x: action.x, y: action.y });
              }
              break;
            }
            case "resizeNode": {
              const node = nodesMap.get(action.id);
              if (node && typeof (node as any).set === "function") {
                const currentData = (node as any).get("data");
                node.set("data", { 
                  ...(typeof currentData?.toObject === "function" ? currentData.toObject() : currentData),
                  width: action.width, 
                  height: action.height 
                });
                node.set("width", action.width);
                node.set("height", action.height);
              }
              break;
            }
            case "updateNodeData": {
              const node = nodesMap.get(action.id);
              if (node && typeof (node as any).set === "function") {
                const currentData = (node as any).get("data");
                const plainData = typeof currentData?.toObject === "function" ? currentData.toObject() : currentData;
                
                node.set("data", {
                  ...plainData,
                  ...(action.label !== undefined ? { label: action.label } : {}),
                  ...(action.color !== undefined ? { color: action.color } : {}),
                  ...(action.shape !== undefined ? { shape: action.shape } : {}),
                });
              }
              break;
            }
            case "deleteNode":
              nodesMap.delete(action.id);
              // Cleanup connected edges
              for (const [edgeId, edge] of edgesMap.entries()) {
                const edgeObj = (edge as any).toObject?.() || edge;
                if (edgeObj.source === action.id || edgeObj.target === action.id) {
                  edgesMap.delete(edgeId);
                }
              }
              break;
            case "addEdge": {
              const newEdge = LiveObject.from({
                id: action.id,
                source: action.source,
                target: action.target,
                type: "canvasEdge",
                animated: false,
                data: { label: action.label || "" },
              }, EDGE_CONFIG as any);
              edgesMap.set(action.id, newEdge);
              break;
            }
            case "deleteEdge":
              edgesMap.delete(action.id);
              break;
          }
        }
      });

      const finalNodesCount = nodesMap.size;
      const finalEdgesCount = edgesMap.size;

      addStatus(`Ghost AI: Successfully applied ${actions.length} changes. (Total: ${finalNodesCount} nodes, ${finalEdgesCount} edges)`, "success");
      pushToChat(`I've updated the canvas with ${actions.length} changes. The architecture now contains ${finalNodesCount} elements.`);

      return {
        success: true,
        actionsCount: actions.length,
      };
    } catch (error: any) {
      console.error("Design agent error:", error);

      let errorMessage = error.message || "Unknown error";
      if (NoObjectGeneratedError.isInstance(error)) {
        errorMessage = `AI failed to generate valid canvas actions. ${error.cause}`;
      }
      try {
        const { root } = await room.getStorage();
        const statusFeed = root.get("ai-status-feed") as LiveList<any>;
        if (statusFeed) {
          statusFeed.push({
            text: `Ghost AI Error: ${errorMessage}`,
            level: "error",
            timestamp: Date.now(),
          });
        }
      } catch (innerError) {
        console.error("Failed to push error status:", innerError);
      }
      throw error;
    } finally {
      // Clear presence
      room.updatePresence({ thinking: false, cursor: null });
      
      // Wait longer to ensure WebSocket messages are flushed in Node.js environment
      await new Promise((resolve) => setTimeout(resolve, 5000));
      
      leave();
    }
  },
});
