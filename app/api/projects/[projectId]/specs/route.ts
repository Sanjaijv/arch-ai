import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const { userId } = await auth();
  const { projectId } = await params;

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!projectId) {
    return new NextResponse("Project ID is required", { status: 400 });
  }

  try {
    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (project.ownerId !== userId) {
      // Check if user is a collaborator
      const isCollaborator = project.collaborators?.some(c => c === userId);
      if (!isCollaborator) {
        return new NextResponse("Forbidden", { status: 403 });
      }
    }

    const specs = await prisma.projectSpec.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        projectId: true,
        createdAt: true,
        filePath: true, // We need this to get filename maybe? Or just use the spec ID.
      }
    });

    return NextResponse.json(specs);
  } catch (error) {
    console.error("[SPECS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
