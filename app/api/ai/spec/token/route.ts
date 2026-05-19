import { auth as clerkAuth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth as triggerAuth } from "@trigger.dev/sdk";

export async function POST(request: Request) {
  const { userId } = await clerkAuth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const { runId } = body;

    if (!runId) {
      return new NextResponse("Missing runId", { status: 400 });
    }

    // Verify ownership using the TaskRun record
    const taskRun = await prisma.taskRun.findUnique({
      where: { runId },
    });

    if (!taskRun || taskRun.userId !== userId) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Generate a Trigger.dev public token scoped to that run
    const publicToken = await triggerAuth.createPublicToken({
      scopes: {
        read: {
          runs: [runId],
        },
      },
      expirationTime: "1h",
    });

    return NextResponse.json({ token: publicToken });
  } catch (error) {
    console.error("[AI_SPEC_TOKEN_POST_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
