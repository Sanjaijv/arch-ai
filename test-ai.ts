import { generateText, Output } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { z } from "zod";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

const MODELS = [
  openrouter("qwen/qwen3-coder:free"),
  openrouter("meta-llama/llama-3.3-70b-instruct:free"),
];

const NODE_SHAPES = [
  "rectangle",
  "rounded-rectangle",
  "ellipse",
  "cylinder",
  "diamond",
  "triangle",
  "hexagon",
];
const NODE_COLORS = [
  { fill: "#1F1F1F" },
  { fill: "#172554" },
];

const ActionSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("addNode"),
    id: z.string(),
    shape: z.enum(NODE_SHAPES as [string, ...string[]]),
    label: z.string(),
    color: z.string(),
    x: z.number(),
    y: z.number(),
    width: z.number(),
    height: z.number(),
  }),
]);

async function main() {
  for (const model of MODELS) {
    try {
      console.log(`Attempting model: ${model.modelId}`);
      const result = await generateText({
        model: model,
        maxRetries: 1,
        output: Output.array({ element: ActionSchema }),
        system: `You are "Ghost AI". Output actions.
AVAILABLE ACTIONS:
- addNode: { type: "addNode", id: string, shape: string, label: string, color: string, x: number, y: number, width: number, height: number }
`,
        prompt: "Design a basic authentication flow architecture",
      });
      console.log("Success with", model.modelId);
      console.log(JSON.stringify(result.output, null, 2));
      break;
    } catch (e) {
      console.error("Failed", e instanceof Error ? e.message : String(e));
    }
  }
}
main();
