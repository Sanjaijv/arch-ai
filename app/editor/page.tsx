import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getProjects } from "@/lib/projects";
import { EditorLayout } from "@/components/editor/editor-layout";
import { EditorHomeContent } from "./editor-home-content";

export default async function Home() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    redirect("/sign-in");
  }

  const userEmail = user.emailAddresses[0]?.emailAddress;
  const { owned, shared } = await getProjects(userId, userEmail);

  return (
    <EditorLayout initialProjects={owned} initialSharedProjects={shared}>
      <EditorHomeContent />
    </EditorLayout>
  );
}
