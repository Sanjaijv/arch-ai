import { auth } from "@clerk/nextjs/server";
import { auth as triggerAuth } from "@trigger.dev/sdk";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { designAgent } from "@/trigger/design-agent";

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const { prompt, roomId, projectId } = body;

    if (!prompt || !roomId) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const targetProjectId = projectId || roomId;

    // Trigger the task through Trigger.dev
    const handle = await designAgent.trigger({ prompt, roomId });

    // Create a public token for the frontend to track the run
    const publicToken = await triggerAuth.createPublicToken({
      scopes: {
        read: {
          runs: [handle.id],
          tasks: [designAgent.id],
        },
      },
      expirationTime: "1h",
    });

    // Create a TaskRun record in Prisma to track ownership and verify later
    try {
      await prisma.taskRun.create({
        data: {
          runId: handle.id,
          projectId: targetProjectId,
          userId,
        },
      });
    } catch (dbError) {
      console.error("[AI_DESIGN_DB_ERROR] Failed to create TaskRun record:", dbError);
      // We continue even if DB logging fails, as the task is already triggered
    }

    return NextResponse.json({ 
      runId: handle.id,
      publicToken
    });
  } catch (error: any) {
    console.error("[AI_DESIGN_POST_ERROR] Full error details:", {
      message: error.message,
      stack: error.stack,
      cause: error.cause,
    });
    return new NextResponse(JSON.stringify({ 
      error: "Internal Error", 
      message: error.message 
    }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
