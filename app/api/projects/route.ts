import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const projects = await prisma.project.findMany({
      where: {
        ownerId: userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("[PROJECTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, id, slug } = body;

    const project = await prisma.project.create({
      data: {
        id,
        slug: slug || id,
        name: name || "Untitled Project",
        ownerId: userId,
      },
    });

    return NextResponse.json(project);
  } catch (error: any) {
    console.error("[PROJECTS_POST_ERROR]", error);
    
    // Check for Prisma unique constraint violation
    if (error.code === "P2002") {
      return NextResponse.json(
        { error: "A project with this ID or slug already exists" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error.message || "Failed to create project" },
      { status: 500 }
    );
  }
}
