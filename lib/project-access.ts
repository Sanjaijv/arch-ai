import { currentUser } from "@clerk/nextjs/server";
import { getProject } from "@/lib/projects";
import { redirect } from "next/navigation";

/**
 * Gets the current Clerk identity (userId and primary email).
 * Throws a redirect to /sign-in if the user is not authenticated.
 */
export async function getCurrentUser() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const primaryEmail = user.emailAddresses.find(
    (email) => email.id === user.primaryEmailAddressId
  )?.emailAddress;

  return {
    userId: user.id,
    email: primaryEmail,
  };
}

/**
 * Checks if the current user has access to a project.
 * Returns the project if access is granted, otherwise returns null.
 */
export async function checkProjectAccess(projectId: string) {
  const { userId, email } = await getCurrentUser();
  
  const project = await getProject(projectId, userId, email);
  
  return project;
}
