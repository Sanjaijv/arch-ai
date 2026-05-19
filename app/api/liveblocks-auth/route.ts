import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getLiveblocks, getUserColor } from "@/lib/liveblocks";
import { getProject } from "@/lib/projects";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId || !user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get the room from the request body
    const { room } = await req.json();
    
    if (!room) {
      return new NextResponse("Room ID is required", { status: 400 });
    }

    const projectId = room;

    const primaryEmail = user.emailAddresses.find(
      (email) => email.id === user.primaryEmailAddressId
    )?.emailAddress;

    // Verify project access
    console.log(`[LIVEBLOCKS_AUTH] Checking access for user ${userId} to room ${projectId}`);
    const project = await getProject(projectId, userId, primaryEmail);

    if (!project) {
      console.warn(`[LIVEBLOCKS_AUTH] Access denied for user ${userId} to room ${projectId}`);
      return new NextResponse("Forbidden", { status: 403 });
    }

    const liveblocks = getLiveblocks();

    // Create a session for the current user
    const session = liveblocks.prepareSession(userId, {
      userInfo: {
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || "Anonymous",
        avatar: user.imageUrl,
        color: getUserColor(userId),
      },
    });

    // Give the user full access to the project room
    session.allow(projectId, session.FULL_ACCESS);

    // Authorize the user and return the result
    const { status, body } = await session.authorize();
    return new NextResponse(body, { status });
  } catch (error) {
    console.error("[LIVEBLOCKS_AUTH_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
