import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const user = await currentUser();
    const { projectId } = await params;

    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!projectId) {
      return new NextResponse("Project ID is required", { status: 400 });
    }

    const userId = user.id;
    const userEmail = user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress;

    const body = await request.json();

    // 1. Verify project exists and user is owner or collaborator
    let project;
    try {
      // Log the attempt to help debug "Database error during project lookup"
      console.log(`[PROJECT_CANVAS_PUT] Looking up project: ${projectId} for user: ${userId}`);

      project = await prisma.project.findUnique({
        where: { id: projectId },
        include: { collaborators: true }
      });
    } catch (e) {
      console.error("Prisma findUnique error:", e);
      return new NextResponse(`Database error during project lookup: ${e instanceof Error ? e.message : "Unknown error"}`, { status: 500 });
    }

    if (!project) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const isOwner = project.ownerId === userId;
    const isCollaborator = userEmail ? project.collaborators.some(c => c.email === userEmail) : false;

    if (!isOwner && !isCollaborator) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // 2. Validate body
    if (!body || !body.nodes) {
      return new NextResponse("Invalid canvas data", { status: 400 });
    }

    // 3. Upload JSON to Vercel Blob
    let blob;
    try {
      // Use unique filename per save to avoid overwrite conflicts and ensure immediate consistency
      // addRandomSuffix: true is the default and provides the most reliable behavior
      blob = await put(`projects/${projectId}/canvas.json`, JSON.stringify(body), {
        access: 'private',
        contentType: 'application/json',
        addRandomSuffix: true,
        allowOverwrite: true,
      });
    } catch (e) {
      console.error("Vercel Blob put error:", e);
      return new NextResponse(`Vercel Blob error: ${e instanceof Error ? e.message : "Unknown error"}`, { status: 500 });
    }

    // 4. Update project with new blob URL
    try {
      await prisma.project.update({
        where: { id: projectId },
        data: {
          canvasBlobUrl: blob.url,
        },
      });
    } catch (e) {
      console.error("Prisma update error:", e);
      return new NextResponse("Database error during project update", { status: 500 });
    }

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("[PROJECT_CANVAS_PUT] Top-level error:", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Internal Error",
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const user = await currentUser();
    const { projectId } = await params;

    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!projectId) {
      return new NextResponse("Project ID is required", { status: 400 });
    }

    const userId = user.id;
    const userEmail = user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress;

    const project = await prisma.project.findUnique({
      where: { id: projectId },
      include: { collaborators: true }
    });

    if (!project) {
      return new NextResponse("Not Found", { status: 404 });
    }

    // Check access
    const isOwner = project.ownerId === userId;
    const isCollaborator = userEmail ? project.collaborators.some(c => c.email === userEmail) : false;

    if (!isOwner && !isCollaborator) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    if (!project.canvasBlobUrl) {
      return NextResponse.json({ nodes: [], edges: [] });
    }

    // Fetch from Vercel Blob
    try {
      const response = await fetch(project.canvasBlobUrl, {
        headers: {
          Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch from blob: ${response.statusText} (${response.status})`);
      }

      const canvasData = await response.json();
      return NextResponse.json(canvasData);
    } catch (e) {
      console.error("Vercel Blob fetch error:", e);
      return new NextResponse("Error fetching canvas data from storage", { status: 500 });
    }
  } catch (error) {
    console.error("[PROJECT_CANVAS_GET] Top-level error:", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Internal Error",
      { status: 500 }
    );
  }
}
