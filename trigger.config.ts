import { defineConfig } from "@trigger.dev/sdk";
import { prismaExtension } from "@trigger.dev/build/extensions/prisma";

export default defineConfig({
  project: process.env.TRIGGER_PROJECT_REF || "proj_placeholder",
  runtime: 'node',
  dirs: ["trigger"],
  maxDuration: 3600,
  logLevel: "info",
  retries: {
    enabledInDev: false,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
    },
  },
  build: {
    extensions: [
      prismaExtension({
        mode: "legacy",
        schema: "prisma/schema.prisma",
        migrate: true,
        // Arch AI uses app/generated/prisma as output
        // We should ensure the extension knows about this if needed, 
        // but usually it finds it from the schema.
      }),
    ],
  },
});
