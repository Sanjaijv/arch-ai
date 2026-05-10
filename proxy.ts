import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect();
  }

  const { userId } = await auth();

  if (request.nextUrl.pathname === "/") {
    if (userId) {
      return NextResponse.redirect(new URL("/editor", request.url));
    } else {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
  }
});

export const config = {
  matcher: [
    "/((?!.*\\..*|_next).*)",
    "/",
    "/(api|trpc)(.*)",
  ],
};
