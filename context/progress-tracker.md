# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase
- Feature 10: AI Generation — next

## Current Goal
- Implement background tasks for architecture generation.

## Completed

- Feature 01: Design System — shadcn/ui installed and configured for Tailwind v4, dark-only theme tokens in globals.css, Button/Card/Dialog/Input/Tabs/Textarea/ScrollArea components added to components/ui/, lucide-react installed, lib/utils.ts cn() helper in place. TypeScript compiles clean.
- Feature 02: Editor Chrome — `EditorNavbar`, `ProjectSidebar`, and `EditorLayout` implemented. Managed sidebar state with floating animation and tabs. Integrated into `app/page.tsx`.
- Feature 03: Auth — Clerk authentication integrated with `ClerkProvider` and themes (dark, shadcn). Route protection via `proxy.ts`. Custom two-panel auth pages. UserButton added to editor navbar. Home page redirects based on auth status.
- Feature 04: Project Dialogs — Project creation, renaming, and deletion UI with mock data. Added editor home screen and sidebar actions. Fixed lint warnings to match specification.
- Feature 05: Prisma — Defined `Project` and `ProjectCollaborator` models, implemented cached client singleton with Accelerate branching, and applied initial migration.
- Feature 06: Project APIs — Implemented REST endpoints for list/create/rename/delete projects with owner checks and Clerk authentication. Verified with a successful production build.
- Feature 07: Wire Editor Home — Connected the editor home sidebar and dialogs to the real project API. Converted Editor Home to a server component for data fetching, implemented the `useProjectActions` hook, and added a data helper for owned and shared projects.
- Feature 08: Editor Workspace Shell — server-side access checks, three-column layout with project sidebar highlighting, and AI assistant placeholder.
- Feature 09: Share Dialog — Collaborative project access and management UI with Clerk enrichment.

## In Progress

## Next Up
- Feature 10: AI Generation — Background tasks for architecture generation.



## Open Questions

- None yet.

## Architecture Decisions

- shadcn/ui over Tailwind v4 (CSS-based token config via @theme inline in globals.css, no tailwind.config.js).
- Dark-only theme: all shadcn :root variables set to dark values directly — no .dark class switching.
- Do not modify generated components/ui/* files after shadcn installation.
- Next.js 16 uses proxy.ts (not middleware.ts) — same API, renamed to reflect its purpose.

## Session Notes

- Using Next.js 16.2.4 with React 19 and Tailwind CSS v4.
- shadcn version 4.5.0 was used; it auto-detected Tailwind v4.
- lucide-react ^1.11.0 installed as a direct dependency.
- @clerk/nextjs ^7.2.7 and @clerk/ui ^1.6.7 installed.
- @liveblocks/node installed alongside existing @liveblocks/client, @liveblocks/react, @liveblocks/react-flow, @liveblocks/react-ui. Liveblocks client uses lazy init (getLiveblocks()) to avoid key validation errors at build time.
- @vercel/blob ^2.3.3 installed. BLOB_READ_WRITE_TOKEN set in .env.local.
- @trigger.dev/sdk ^4.4.4 installed. trigger.config.ts reads project ref from TRIGGER_PROJECT_REF env var. TRIGGER_SECRET_KEY must be set in .env.local for triggering tasks from server code. Run `npx trigger.dev@latest dev` for local development; deploy with `npx trigger.dev@latest deploy`.
- Prisma 7.8.0 — generated client goes to app/generated/prisma/; import PrismaClient from @/app/generated/prisma/client (no index.ts in v7). Constructor always requires { adapter } argument. @prisma/adapter-pg used for all connections.
- prisma.config.ts uses schema: "prisma/" (multi-file schema) and reads DATABASE_URL from .env via dotenv.