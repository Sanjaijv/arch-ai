# Current Issues

## Issue: Production build failure in project specs API route

### Status
✅ Resolved

### Severity
P0 — Deployment blocker

### Environment
- Platform: Vercel
- Framework: Next.js
- Build command: `npm run build`
- Route:
  `./app/api/projects/[projectId]/specs/route.ts`

### Fix
- Updated `app/api/projects/[projectId]/specs/route.ts` to include `collaborators` in the Prisma query.
- Replaced the invalid scalar-only collaborator check with a real `ProjectCollaborator` email match using `currentUser()`.

---

## Error Log

```txt
./app/api/projects/[projectId]/specs/route.ts:33:38

Type error: Property 'collaborators' does not exist on type
'{ id: string; description: string | null; status: ProjectStatus;
name: string; createdAt: Date; ownerId: string;
updatedAt: Date; canvasBlobUrl: string | null; slug: string; }'.

31 | if (project.ownerId !== userId) {
32 |   // Check if user is a collaborator
33 |   const isCollaborator = project.collaborators?.some(c => c === userId);
                                       ^
34 |   if (!isCollaborator) {Type error: Property 'collaborators' does not exist on type '{ id: string; description: string | null; status: ProjectStatus; name: string; createdAt: Date; ownerId: string; updatedAt: Date; canvasBlobUrl: string | null; slug: string; }'.
  31 |     if (project.ownerId !== userId) {
  32 |       // Check if user is a collaborator
> 33 |       const isCollaborator = project.collaborators?.some(c => c === userId);
     |                                      ^
  34 |       if (!isCollaborator) {
  35 |         return new NextResponse("Forbidden", { status: 403 });
  36 |       }
Next.js build worker exited with code: 1 and signal: null
Error: Command "npm run build" exited with 1
Analyze and fix this error.
35 |      return new NextResponse("Forbidden", { status: 403 });
36 |   }

Next.js build worker exited with code: 1 and signal: null

Error: Command "npm run build" exited with 1
```

---

## Current Behavior

During production build and TypeScript validation, the build process fails while compiling the API route responsible for project specs authorization.

The route attempts to access:

```ts
project.collaborators
```

The TypeScript compiler reports that the property does not exist on the inferred `project` type.

---

## Observed Type

The `project` object is inferred as:

```ts
{
  id: string;
  description: string | null;
  status: ProjectStatus;
  name: string;
  createdAt: Date;
  ownerId: string;
  updatedAt: Date;
  canvasBlobUrl: string | null;
  slug: string;
}
```

No `collaborators` field is present.

---

## Affected File

```txt
app/api/projects/[projectId]/specs/route.ts
```

---

## Failing Code Section

```ts
if (project.ownerId !== userId) {
  // Check if user is a collaborator
  const isCollaborator =
    project.collaborators?.some(
      c => c === userId
    );

  if (!isCollaborator) {
    return new NextResponse(
      "Forbidden",
      { status: 403 }
    );
  }
}
```

---

## Impact

- Production deployment fails
- Next.js build process terminates
- TypeScript compilation does not complete
- Vercel deployment exits with status code `1`
- Application cannot reach runtime stage

---

## Notes

This is a compile-time failure occurring during static type checking.

The issue occurs before deployment completion and prevents the application from being published.