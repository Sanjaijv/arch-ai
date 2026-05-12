import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/project-access";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string; email: string }> }
) {
  try {
    const { projectId, email: encodedEmail } = await params;
    const email = decodeURIComponent(encodedEmail);
    const { userId } = await getCurrentUser();

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return new NextResponse("Not Found", { status: 404 });
    }

    if (project.ownerId !== userId) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    await prisma.projectCollaborator.delete({
      where: {
        projectId_email: {
          projectId,
          email: email.toLowerCase(),
        },
      },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[COLLABORATOR_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
