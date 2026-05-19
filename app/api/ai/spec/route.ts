import { auth, currentUser } from "@clerk/nextjs/server";
import { auth as triggerAuth } from "@trigger.dev/sdk";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { generateSpec } from "@/trigger/generate-spec";
import { getProject } from "@/lib/projects";

export async function POST(request: Request) {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const { roomId, chatHistory, nodes, edges } = body;

    if (!roomId) {
      return new NextResponse("Missing required field: roomId", { status: 400 });
    }

    const primaryEmail = user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress;

    // Verify project access from roomId
    const project = await getProject(roomId, userId, primaryEmail);
    if (!project) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Trigger the task through Trigger.dev
    const handle = await generateSpec.trigger({
      projectId: roomId,
      roomId,
      chatHistory: chatHistory || [],
      nodes: nodes || [],
      edges: edges || [],
    });

    // Create a TaskRun record in Prisma to track ownership and verify later
    try {
      await prisma.taskRun.create({
        data: {
          runId: handle.id,
          projectId: roomId,
          userId,
        },
      });
    } catch (dbError) {
      console.error("[AI_SPEC_DB_ERROR] Failed to create TaskRun record:", dbError);
      // We continue even if DB logging fails, as the task is already triggered
    }

    return NextResponse.json({ 
      runId: handle.id
    });
  } catch (error: any) {
    console.error("[AI_SPEC_POST_ERROR] Full error details:", {
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
