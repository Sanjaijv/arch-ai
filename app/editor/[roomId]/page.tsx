import { checkProjectAccess, getCurrentUser } from "@/lib/project-access";
import { getProjects } from "@/lib/projects";
import { EditorLayout } from "@/components/editor/editor-layout";
import { AccessDenied } from "@/components/editor/access-denied";
import { MousePointer2 } from "lucide-react";

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
      <div className="h-full w-full flex flex-col items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
        {/* Grid Background Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
        
        <div className="relative z-10 flex flex-col items-center space-y-6">
          <div className="h-20 w-20 rounded-3xl bg-bg-elevated flex items-center justify-center border border-border-default shadow-2xl rotate-3">
            <MousePointer2 className="h-10 w-10 text-accent-primary -rotate-12" />
          </div>
          
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-text-primary tracking-tight">
              Canvas Placeholder
            </h2>
            <p className="text-sm text-text-muted max-w-[300px]">
              The Liveblocks-powered interactive canvas for <span className="text-text-primary font-medium">{project.name}</span> will be implemented here.
            </p>
          </div>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-subtle border border-border-default">
            <div className="h-1.5 w-1.5 rounded-full bg-state-success animate-pulse" />
            <span className="text-[10px] font-mono text-text-secondary uppercase tracking-widest">
              Ready for collaboration
            </span>
          </div>
        </div>
      </div>
    </EditorLayout>
  );
}
