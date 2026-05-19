import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const user = await currentUser();
  const { projectId } = await params;

  if (!user?.id) {
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
      include: {
        collaborators: true,
      },
    });

    if (!project) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (project.ownerId !== user.id) {
      const email = user.emailAddresses.find(
        (e) => e.id === user.primaryEmailAddressId
      )?.emailAddress;

      const isCollaborator = email
        ? project.collaborators.some((c) => c.email === email)
        : false;

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
