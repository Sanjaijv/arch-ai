import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkProjectAccess, getCurrentUser } from "@/lib/project-access";
import { createClerkClient } from "@clerk/nextjs/server";

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
    const project = await checkProjectAccess(projectId);

    if (!project) {
      return new NextResponse("Not Found", { status: 404 });
    }

    const collaborators = await prisma.projectCollaborator.findMany({
      where: { projectId },
      orderBy: { createdAt: "asc" },
    });

    const emails = collaborators.map((c) => c.email);
    
    // Enrich with Clerk data
    const clerkUsers = await clerkClient.users.getUserList({
      emailAddress: emails,
    });

    const enrichedCollaborators = collaborators.map((c) => {
      const clerkUser = clerkUsers.data.find((u) => 
        u.emailAddresses.some((e) => e.emailAddress === c.email)
      );

      return {
        id: c.id,
        email: c.email,
        name: clerkUser ? `${clerkUser.firstName ?? ""} ${clerkUser.lastName ?? ""}`.trim() : null,
        imageUrl: clerkUser?.imageUrl ?? null,
        createdAt: c.createdAt,
      };
    });

    return NextResponse.json(enrichedCollaborators);
  } catch (error) {
    console.error("[COLLABORATORS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    const { projectId } = await params;
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

    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return new NextResponse("Invalid email", { status: 400 });
    }

    const collaborator = await prisma.projectCollaborator.upsert({
      where: {
        projectId_email: {
          projectId,
          email: email.toLowerCase(),
        },
      },
      update: {},
      create: {
        projectId,
        email: email.toLowerCase(),
      },
    });

    return NextResponse.json(collaborator);
  } catch (error) {
    console.error("[COLLABORATORS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
