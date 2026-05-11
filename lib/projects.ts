import { prisma } from "@/lib/prisma";

export interface ProjectWithRole {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
  updatedAt: Date;
  isOwner: boolean;
}

/**
 * Fetches projects owned by the user and projects shared with the user.
 */
export async function getProjects(userId: string, email?: string): Promise<{ owned: ProjectWithRole[], shared: ProjectWithRole[] }> {
  // Fetch owned projects
  const ownedProjects = await prisma.project.findMany({
    where: {
      ownerId: userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  const owned: ProjectWithRole[] = ownedProjects.map(p => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    ownerId: p.ownerId,
    updatedAt: p.updatedAt,
    isOwner: true,
  }));

  // Fetch shared projects if email is provided
  let shared: ProjectWithRole[] = [];
  if (email) {
    const sharedProjects = await prisma.project.findMany({
      where: {
        collaborators: {
          some: {
            email: email,
          },
        },
        NOT: {
          ownerId: userId,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    shared = sharedProjects.map(p => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      ownerId: p.ownerId,
      updatedAt: p.updatedAt,
      isOwner: false,
    }));
  }

  return { owned, shared };
}

/**
 * Fetches a single project if the user has access.
 */
export async function getProject(projectId: string, userId: string, email?: string) {
  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      collaborators: true,
    },
  });

  if (!project) return null;

  const isOwner = project.ownerId === userId;
  const isCollaborator = email ? project.collaborators.some(c => c.email === email) : false;

  if (!isOwner && !isCollaborator) return null;

  return {
    ...project,
    isOwner,
  };
}
