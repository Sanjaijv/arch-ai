import { task, metadata } from "@trigger.dev/sdk";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { put } from "@vercel/blob";
import { prisma } from "../lib/prisma";

const MODELS = [
  google("gemini-2.5-pro"),
  google("gemini-2.5-flash"),
  google("gemini-1.5-pro"),
];

const InputSchema = z.object({
  projectId: z.string(),
  roomId: z.string(),
  chatHistory: z.array(z.any()),
  nodes: z.array(z.any()),
  edges: z.array(z.any()),
});

export const generateSpec = task({
  id: "generate-spec",
  run: async (payload: unknown) => {
    const parsed = InputSchema.parse(payload);
    const { projectId, roomId, chatHistory, nodes, edges } = parsed;

    const addStatus = (text: string, level: "info" | "success" | "error" | "thinking" = "info") => {
      metadata.set("status", text);
    };

    addStatus("Starting spec generation...");

    let lastError: any;
    let generatedSpec: string | undefined;

    for (const model of MODELS) {
      try {
        console.log(`[AI_SPEC_AGENT] Attempting generation with model...`);
        const result = await generateText({
          model: model,
          maxRetries: 1,
          system: `You are an expert system architect and technical writer.
Your goal is to generate a comprehensive Markdown technical specification based on a collaborative system architecture canvas.

You are given the current nodes and edges on the canvas, along with the recent chat history between users and AI.

Please generate a well-structured technical specification including:
1. Overview: High-level summary of the architecture.
2. Components: Details of the major nodes/components.
3. Data Flow / Connections: How the components interact (based on edges).
4. Key Considerations: Any notable technical, scaling, or design implications discussed or implied by the architecture.

Keep the output entirely in Markdown format. Do not use markdown code block wrapping around the entire output if possible, just return raw markdown content.`,
          prompt: `CURRENT STATE:\nNodes: ${JSON.stringify(nodes)}\nEdges: ${JSON.stringify(edges)}\n\nCHAT HISTORY:\n${JSON.stringify(chatHistory)}\n\nGenerate the technical specification now.`,
        });
        generatedSpec = result.text;
        break;
      } catch (error) {
        console.warn(`[AI_SPEC_AGENT] Model failed:`, error);
        lastError = error;
      }
    }

    if (!generatedSpec) {
      throw lastError || new Error("All fallback models failed to generate spec.");
    }

    addStatus("Saving spec...");

    let blob;
    try {
      blob = await put(`projects/${projectId}/specs/${Date.now()}.md`, generatedSpec, {
        access: 'private',
        contentType: 'text/markdown',
        addRandomSuffix: true,
      });
    } catch (e) {
      console.error("[AI_SPEC_AGENT] Vercel Blob put error:", e);
      throw new Error(`Vercel Blob error: ${e instanceof Error ? e.message : "Unknown error"}`);
    }

    try {
      await prisma.projectSpec.create({
        data: {
          projectId,
          filePath: blob.url,
        },
      });
    } catch (e) {
      console.error("[AI_SPEC_AGENT] Prisma projectSpec create error:", e);
      throw new Error(`Prisma error: ${e instanceof Error ? e.message : "Unknown error"}`);
    }

    addStatus("Spec generated successfully.", "success");

    return generatedSpec;
  },
});
