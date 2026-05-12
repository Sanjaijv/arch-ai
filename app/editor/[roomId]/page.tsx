import { checkProjectAccess, getCurrentUser } from "@/lib/project-access";
import { getProjects } from "@/lib/projects";
import { EditorLayout } from "@/components/editor/editor-layout";
import { AccessDenied } from "@/components/editor/access-denied";
import { CanvasWrapper } from "@/components/editor/canvas-wrapper";
import { Canvas } from "@/components/editor/canvas";

interface EditorRoomPageProps {
  params: Promise<{
    roomId: string;
  }>;
}

export default async function EditorRoomPage({ params }: EditorRoomPageProps) {
  const { roomId } = await params;
  
  // 1. Check project access
  const project = await checkProjectAccess(roomId);
  
  if (!project) {
    return <AccessDenied />;
  }

  // 2. Fetch projects for the sidebar
  const { userId, email } = await getCurrentUser();
  const { owned, shared } = await getProjects(userId, email);

  return (
    <EditorLayout
      initialProjects={owned}
      initialSharedProjects={shared}
      projectName={project.name}
      activeProjectId={project.id}
      isOwner={project.isOwner}
    >
      <CanvasWrapper roomId={roomId}>
        <Canvas />
      </CanvasWrapper>
    </EditorLayout>
  );
}

