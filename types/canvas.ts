import { Node, Edge } from "@xyflow/react";

export const NODE_SHAPES = [
  "rectangle",
  "diamond",
  "circle",
  "pill",
  "cylinder",
  "hexagon",
] as const;

export type NodeShape = (typeof NODE_SHAPES)[number];

export const NODE_COLORS = [
  { fill: "#1F1F1F", text: "#EDEDED", name: "Neutral" },
  { fill: "#10233D", text: "#52A8FF", name: "Blue" },
  { fill: "#2E1938", text: "#BF7AF0", name: "Purple" },
  { fill: "#331B00", text: "#FF990A", name: "Orange" },
  { fill: "#3C1618", text: "#FF6166", name: "Red" },
  { fill: "#3A1726", text: "#F75F8F", name: "Pink" },
  { fill: "#0F2E18", text: "#62C073", name: "Green" },
  { fill: "#062822", text: "#0AC7B4", name: "Teal" },
] as const;

export type NodeColor = (typeof NODE_COLORS)[number];

export type CanvasNodeData = {
  label: string;
  color: string;
  shape: NodeShape;
  width: number;
  height: number;
} & Record<string, unknown>;

export const getMatchingTextColor = (fillColor?: string) => {
  const colorPair = NODE_COLORS.find((c) => c.fill === fillColor);
  return colorPair?.text || "#EDEDED";
};

export type CanvasNode = Node<CanvasNodeData>;
export type CanvasEdge = Edge;
