# Current Issues

## Issue: Production build failure in Liveblocks test file

### Status
✅ Resolved

### Severity
P0 — Build-breaking issue

### Environment
- Platform: Vercel
- Framework: Next.js
- Build command: `npm run build`
- File:
  `./test-liveblocks.ts`

### Fix
- Updated `test-liveblocks.ts` to remove invalid `toImmutable` property access from `LiveMap` and `LiveList`.
- Kept the file as a valid compile-time scratch/test file by using `toJSON()` only.

---

## Error Log

```txt
./test-liveblocks.ts:4:24

Type error: Property 'toImmutable' does not exist on type
'LiveMap<"key", LiveObject<{ a: number; }>>'.

2 |
3 | const map = new LiveMap([["key", new LiveObject({a: 1})]]);
>4 | console.log(typeof map.toImmutable === "function"
    ? "toImmutable exists"
    : "toImmutable missing");
                         ^

5 | console.log("toJSON:", map.toJSON());
6 |
7 | const list = new LiveList([new LiveObject({a: 1})]);

Next.js build worker exited with code: 1 and signal: null

Error: Command "npm run build" exited with 1
```

---

## Current Behavior

During the production build process, TypeScript compilation fails while processing a Liveblocks test file.

The file attempts to access:

```ts
map.toImmutable
```

The compiler reports that the property does not exist on the inferred `LiveMap` type.

---

## Affected File

```txt
test-liveblocks.ts
```

---

## Failing Code Section

```ts
const map = new LiveMap([
  ["key", new LiveObject({ a: 1 })]
]);

console.log(
  typeof map.toImmutable === "function"
    ? "toImmutable exists"
    : "toImmutable missing"
);
```

---

## Observed Type

```ts
LiveMap<
  "key",
  LiveObject<{
    a: number;
  }>
>
```

The type definition available during compilation does not expose:

```ts
toImmutable
```

---

## Impact

- Production deployment fails
- Next.js build process terminates
- TypeScript validation does not complete
- Vercel deployment exits with status code `1`
- Application cannot proceed to runtime

---

## Notes

This issue occurs during compile-time type checking.

The build process terminates before deployment completion and prevents application publishing.