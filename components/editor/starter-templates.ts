import { CanvasNode, CanvasEdge, NodeShape } from "@/types/canvas";

export interface CanvasTemplate {
  id: string;
  name: string;
  description: string;
  nodes: CanvasNode[];
  edges: CanvasEdge[];
}

const createNode = (
  id: string,
  label: string,
  shape: NodeShape,
  x: number,
  y: number,
  color: string = "#1F1F1F",
  width: number = 150,
  height: number = 100
): CanvasNode => ({
  id,
  type: "canvasNode",
  position: { x, y },
  data: {
    label,
    shape,
    color,
    width,
    height,
  },
});

const createEdge = (
  id: string,
  source: string,
  target: string,
  label?: string
): CanvasEdge => ({
  id,
  source,
  target,
  label,
  type: "canvasEdge",
});

export const CANVAS_TEMPLATES: CanvasTemplate[] = [
  {
    id: "microservices",
    name: "Microservices Architecture",
    description: "A standard microservices pattern with API Gateway, Auth, and Services.",
    nodes: [
      createNode("client", "Web Client", "rectangle", 0, 150, "#10233D"),
      createNode("gateway", "API Gateway", "pill", 250, 150, "#2E1938"),
      createNode("auth", "Auth Service", "diamond", 500, 0, "#3C1618"),
      createNode("user-service", "User Service", "rectangle", 500, 150, "#0F2E18"),
      createNode("order-service", "Order Service", "rectangle", 500, 300, "#062822"),
      createNode("db1", "User DB", "cylinder", 750, 150, "#1F1F1F", 100, 80),
      createNode("db2", "Order DB", "cylinder", 750, 300, "#1F1F1F", 100, 80),
    ],
    edges: [
      createEdge("e1", "client", "gateway"),
      createEdge("e2", "gateway", "auth"),
      createEdge("e3", "gateway", "user-service"),
      createEdge("e4", "gateway", "order-service"),
      createEdge("e5", "user-service", "db1"),
      createEdge("e6", "order-service", "db2"),
    ],
  },
  {
    id: "cicd-pipeline",
    name: "CI/CD Pipeline",
    description: "Automated workflow from code commit to production deployment.",
    nodes: [
      createNode("git", "Git Repo", "rectangle", 0, 100, "#331B00"),
      createNode("build", "Build & Test", "hexagon", 250, 100, "#10233D"),
      createNode("docker", "Dockerize", "rectangle", 500, 100, "#062822"),
      createNode("staging", "Staging", "rectangle", 750, 0, "#2E1938"),
      createNode("prod", "Production", "rectangle", 750, 200, "#3C1618"),
    ],
    edges: [
      createEdge("e1", "git", "build"),
      createEdge("e2", "build", "docker"),
      createEdge("e3", "docker", "staging"),
      createEdge("e4", "docker", "prod"),
    ],
  },
  {
    id: "event-driven",
    name: "Event-Driven System",
    description: "Asynchronous communication via message brokers and consumers.",
    nodes: [
      createNode("producer", "Event Producer", "rectangle", 0, 150, "#3A1726"),
      createNode("broker", "Message Broker", "pill", 250, 150, "#331B00", 200, 80),
      createNode("consumer1", "Consumer A", "rectangle", 550, 50, "#0F2E18"),
      createNode("consumer2", "Consumer B", "rectangle", 550, 250, "#062822"),
      createNode("analytics", "Analytics Engine", "hexagon", 800, 150, "#2E1938"),
    ],
    edges: [
      createEdge("e1", "producer", "broker"),
      createEdge("e2", "broker", "consumer1"),
      createEdge("e3", "broker", "consumer2"),
      createEdge("e4", "consumer1", "analytics"),
      createEdge("e5", "consumer2", "analytics"),
    ],
  },
];
