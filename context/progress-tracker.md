# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase
- Feature 20: AI Generation — next

## Current Goal
- Implement background tasks for architecture generation via Trigger.dev.

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
- Feature 10: Liveblocks Setup — Realtime collaboration infrastructure with cached node client, deterministic user colors, and authenticated room access. Verified with production build.
- Feature 11: Base Canvas — Foundations for the collaborative canvas using Liveblocks and React Flow. Verified with production build.
- Feature 12: Shape Panel — Floating toolbar for dragging and dropping shapes onto the canvas. Implemented custom node renderer and drop logic with Liveblocks storage sync.
- Feature 13: Node Shapes — Replaced placeholder node renderer with proper SVG/CSS shapes and added a premium ghost drag preview. Verified with a successful production build.
- Fixing Canvas & UI Issues: Resolved drag-and-drop pipeline with robust multi-format handling, visual floating effects, and SSR runtime errors. The canvas is now edge-to-edge with floating sidebars, nodes are centered at the drop point, and the visual style has been enhanced with custom shapes (diamonds, hexagons, etc.) and premium glassmorphism effects.
- Feature 14: Node Editing — Add resizing and inline label editing to canvas nodes. Selected nodes show resize handles, double-click for inline editing, and all changes sync via Liveblocks.
- Feature 15: Node Color Toolbar — Add a floating color toolbar to selected nodes to change background and text colors.
- Clean Geometry: Removed all text labels, titles, and shape type indicators from canvas nodes and drag previews as per the current issues log to ensure a clean, visual-only diagramming workspace.
- Visibility & Text Editing Fix: Improved node visibility by increasing stroke contrast and glow. Restored and enhanced inline label editing with `textarea` support, ensuring focus and typing work naturally without canvas interference.
- Node Text Fixes: Implemented responsive font scaling based on node dimensions and fixed text overflow leakage by applying strict container constraints and shape-aware padding.
- Shape Visibility Alignment: Ensured all node shapes (SVG and CSS-based) have consistent high-contrast strokes and highlights for better visibility across the entire canvas.
- Vertical Text Centering: Fixed vertical alignment during text editing by dynamically adjusting the `textarea` height to match its content, allowing the parent flexbox to keep the text centered in the shape at all times.
- Feature 16: Edge Behavior — Replaced default edges with custom right-angle edges supporting arrowheads, hover effects, and inline label editing. Added 4-way connection handles to all nodes with subtle fade-in animation.
- Feature 17: Canvas Ergonomics — Implemented a floating control bar for zoom and history, and added comprehensive keyboard shortcuts for a more efficient diagramming experience.
- Feature 18: Starter Template — Implemented a starter template library with a modal selector and SVG-based diagram previews. Selecting a template replaces the current canvas and fits the view.
- Template & Node Fixes: Resolved the "node.setLocal is not a function" runtime error by switching to non-destructive Liveblocks mutations that update individual fields of LiveObjects instead of replacing entire nodes. Fixed the template modal UI by correctly overriding default dialog max-widths with `sm:max-w-4xl`, ensuring buttons and labels have enough space to render fully without truncation.
- Feature 19: Presence (Avatars & Cursor) — Implemented participant avatars and live cursors inside the editor canvas area. Added `cursor` and `thinking` to Liveblocks presence. Implemented `Collaborators` component with avatar stack and Clerk `UserButton`. Integrated components into `Canvas` with coordinate transformation via `useViewport`. Resolved redundant `UserButton` in navbar by hiding it when in project rooms. Verified with clean type check.
- Feature 20: AI Sidebar Shell — Separate AI sidebar into its own component with a tabbed UI (AI Architect and Specs), chat interface with auto-resizing input, and demo spec cards. Verified with a successful production build.
- Feature 21: Canvas Autosave — persist project state to Vercel Blob and store URL in Prisma. Debounced autosave with status indicator. Implemented save/load API routes and initial load logic for empty rooms.
- Fixed Issue: Edge Label Persistence — Resolved the issue where edge labels would disappear after editing or refreshing. Updated the `updateEdgeData` mutation to handle missing or non-LiveObject data properties and wrapped `onConnect` to ensure every new connection is initialized with a default `data` object.
- Fixed Issue: Save Button in Workspace Navbar — Added an interactive Save button to the editor navbar that tracks autosave status (Saving, Saved, Error, Save) and allows manual save triggers. The button is conditionally rendered only in the workspace context.
- Fixed Issue: Collaborative Deletion — Implemented a keyboard listener for Delete/Backspace that removes selected nodes and edges from Liveblocks storage while ignoring events from input fields.
- Fixed Issue: 4-Way Connectivity — Added unique IDs and target handles to all four sides of nodes (top, right, bottom, left) to enable full connectivity in the diagramming workspace.
- Fixed Issue: Drag & Drop Centering — Corrected the drop position calculation to ensure nodes are centered exactly under the cursor when dropped from the shape panel.
- Fixed Issue: Auto-Zoom Guard — Disabled automatic fitView on every node drop. Replaced with a guarded manual fitView that only runs once during the initial room load.
- Fixed Issue: Clerk Avatar Errors — Added img.clerk.com to the allowed image hostnames in next.config.ts.
- Fixed Issue: Redundant UserButton — Removed the UserButton from the workspace navbar (relying on the Presence avatars instead) while preserving it on the home screen navbar.

## In Progress

- None.




## Open Questions

- None yet.

## Architecture Decisions

- shadcn/ui over Tailwind v4 (CSS-based token config via @theme inline in globals.css, no tailwind.config.js).
- Dark-only theme: all shadcn :root variables set to dark values directly — no .dark class switching.
- Do not modify generated components/ui/* files after shadcn installation.
- Next.js 16 uses proxy.ts (not middleware.ts) — same API, renamed to reflect its purpose.
- Storage Flattening: Nodes and edges are stored at the root of the Liveblocks storage (not nested in a `flow` object) to ensure full compatibility with the `useLiveblocksFlow` hook and prevent "node.setLocal is not a function" runtime errors.

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