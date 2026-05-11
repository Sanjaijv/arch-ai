# current-issues.md

Review the project creation flow and fix the following issues. Check
the project API routes, Prisma schema, and project action hooks first.
Do not break existing editor or authentication behavior.

---

# Current Problems

Creating a project from the editor home modal does not work.

Observed behavior:

- clicking "Create Project" does nothing visually
- project is not added to sidebar
- sidebar still shows:
  `No projects yet`
- frontend throws:
  `Failed to create project`
- backend shows PostgreSQL SSL warnings
- previous Prisma schema mismatch issues existed involving
  `Project.slug`

The stack currently uses:

- Next.js 16
- Turbopack
- Prisma
- PostgreSQL
- Clerk
- App Router
- Server Components

---

# Current Errors

## 1. Frontend Create Project Error

```txt
Failed to create project
```

Location:

```txt
hooks/use-project-actions.ts:85
```

Current failing code:

```ts
if (!response.ok) {
  throw new Error("Failed to create project");
}
```

The create project request is returning a non-2xx response.

---

## 2. PostgreSQL SSL Warning

```txt
SECURITY WARNING: The SSL modes 'prefer', 'require',
and 'verify-ca' are treated as aliases for 'verify-full'.
```

The current database connection configuration is using an SSL mode
that will change behavior in future pg versions.

The warning currently appears during editor page rendering.

---

## 3. Previous Prisma Schema Error

A previous runtime error existed:

```txt
The column `Project.slug` does not exist in the current database.
```

This indicates the database schema and Prisma schema were previously
out of sync.

Verify the schema is now fully migrated and consistent.

---

# Issues

## 1. Fix Project Creation API Flow

Review the entire create project request lifecycle.

Check:

- create project API route
- frontend fetch request
- request payload
- Prisma create query
- response handling
- Clerk authentication usage

Ensure:

- project creation succeeds
- valid JSON response is returned
- frontend receives a successful response
- modal closes correctly
- newly created project appears in sidebar immediately
- no silent request failures occur

Do not break existing project fetching behavior.

---

## 2. Verify Prisma Project Schema

Review the `Project` Prisma model and database migration state.

Ensure:

- `slug` exists in both:
  - Prisma schema
  - PostgreSQL database
- all migrations are applied
- Prisma client is regenerated
- create queries no longer fail due to schema mismatch

Required commands should succeed:

```bash
npx prisma migrate dev
npx prisma generate
```

---

## 3. Improve Create Project Error Handling

The frontend currently throws only:

```txt
Failed to create project
```

Improve error handling so actual backend errors are surfaced.

Requirements:

- log API response body on failure
- log backend error message
- preserve existing UI flow
- avoid generic silent failures

Do not expose sensitive server details to users.

---

## 4. Verify Clerk Authentication in Create Route

Check Clerk authentication inside the project creation API route.

Ensure:

- authenticated users can create projects
- userId is properly resolved
- unauthenticated requests return proper errors
- Clerk server APIs work correctly with App Router

Do not bypass authentication.

---

## 5. Fix PostgreSQL SSL Configuration Warning

Review the PostgreSQL connection string and Prisma adapter setup.

Current warning:

```txt
SECURITY WARNING: The SSL modes 'prefer', 'require',
and 'verify-ca' are treated as aliases for 'verify-full'.
```

Update the connection configuration so that:

- secure SSL behavior is preserved
- future pg compatibility issues are avoided
- warnings no longer appear during development

Preferred secure configuration:

```env
sslmode=verify-full
```

Do not weaken SSL behavior.

---

## 6. Verify Prisma Connection Lifecycle Stability

The project previously experienced:

```txt
Server has closed the connection
```

Review the Prisma singleton and pg.Pool reuse logic.

Ensure:

- Prisma client is globally cached
- pg.Pool is globally cached
- Turbopack reloads do not recreate pools repeatedly
- project creation queries work reliably
- sidebar project fetches remain stable

Do not remove Accelerate support.

---

## 7. Sidebar Refresh After Project Creation

After successful creation:

- newly created project should immediately appear in:
  - My Projects sidebar
- empty state should disappear automatically
- manual page refresh should not be required

Preserve existing sidebar layout and behavior.

---

# Scope

- Fix only the project creation and Prisma/PostgreSQL issues
- Do not redesign the editor UI
- Do not modify canvas behavior
- Do not remove Clerk authentication
- Do not remove Prisma adapter architecture
- Do not replace PostgreSQL
- Preserve existing project fetching logic
- Preserve App Router compatibility
- Preserve Turbopack compatibility
- `npm run build` must pass