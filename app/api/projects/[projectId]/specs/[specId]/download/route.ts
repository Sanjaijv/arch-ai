import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ projectId: string; specId: string }> }
) {
  try {
    const user = await currentUser();
    const { projectId, specId } = await params;

    if (!user || !user.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!projectId || !specId) {
      return new NextResponse("Project ID and Spec ID are required", { status: 400 });
    }

    const userId = user.id;
    const userEmail = user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress;

    // 1. Verify project spec exists and fetch associated project
    let projectSpec;
    try {
      projectSpec = await prisma.projectSpec.findUnique({
        where: { id: specId },
        include: {
          project: {
            include: { collaborators: true }
          }
        }
      });
    } catch (e) {
      console.error("Prisma findUnique error:", e);
      return new NextResponse(`Database error during project spec lookup: ${e instanceof Error ? e.message : "Unknown error"}`, { status: 500 });
    }

    if (!projectSpec || projectSpec.projectId !== projectId) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const project = projectSpec.project;

    // 2. Check access
    const isOwner = project.ownerId === userId;
    const isCollaborator = userEmail ? project.collaborators.some(c => c.email === userEmail) : false;

    if (!isOwner && !isCollaborator) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // 3. Fetch from Vercel Blob
    try {
      const response = await fetch(projectSpec.filePath, {
        headers: {
          Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch from blob: ${response.statusText} (${response.status})`);
      }

      const content = await response.text();

      return new NextResponse(content, {
        headers: {
          'Content-Type': 'text/markdown',
          'Content-Disposition': `attachment; filename="spec-${specId}.md"`,
        },
      });
    } catch (e) {
      console.error("Vercel Blob fetch error:", e);
      return new NextResponse("Error fetching spec data from storage", { status: 500 });
    }
  } catch (error) {
    console.error("[PROJECT_SPEC_DOWNLOAD_GET] Top-level error:", error);
    return new NextResponse(
      error instanceof Error ? error.message : "Internal Error",
      { status: 500 }
    );
  }
}
