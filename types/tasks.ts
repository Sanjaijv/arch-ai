import { z } from "zod";

export const AIStatusMessageSchema = z.object({
  text: z.string().optional(),
  message: z.string().optional(), // For backward compatibility if needed
  level: z.enum(["info", "success", "error", "thinking"]),
  timestamp: z.number(),
  userId: z.string().optional(),
});

export type AIStatusMessage = z.infer<typeof AIStatusMessageSchema>;

export const AIChatMessageSchema = z.object({
  id: z.string(),
  content: z.string(),
  sender: z.object({
    id: z.string(),
    name: z.string(),
    avatar: z.string(),
  }),
  role: z.enum(["user", "assistant"]),
  timestamp: z.number(),
});

export type AIChatMessage = z.infer<typeof AIChatMessageSchema>;
