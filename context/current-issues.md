# current-issues.md

The `node.setLocal is not a function` runtime error still persists and has not been fully resolved.

Review the current implementation inside:

```txt
components/editor/canvas.tsx
components/editor/nodes/*
```

---

# PERSISTENT NODE RUNTIME ERROR

The application still throws:

```txt
## Error Type
Runtime TypeError

## Error Message
node.setLocal is not a function

Next.js version: 16.2.6 (Turbopack)
```

This indicates that the editor is still attempting to call:

```ts
node.setLocal()
```

on ReactFlow node objects that do not support that API.

---

# REQUIRED INVESTIGATION

Fully trace all usages of:

```ts
setLocal
```

inside the editor codebase.

Search for:

```txt
setLocal(
node.setLocal(
```

across:

```txt
components/editor/*
```

Especially inspect:

```txt
components/editor/canvas.tsx
components/editor/nodes/*
```

---

# ROOT ISSUE

ReactFlow nodes are plain serializable objects and do not expose Liveblocks/Yjs local mutation methods.

The current implementation is mixing incompatible state systems.

A ReactFlow node object should never receive:

```ts
node.setLocal()
```

calls.

---

# REQUIRED FIX

Remove all direct usages of:

```ts
node.setLocal()
```

from ReactFlow node objects.

Replace them with:

- proper ReactFlow state updates
- immutable node array updates
- Liveblocks storage mutations
- React state setters
- synchronized collaborative mutations

depending on the intended behavior.

---

# REQUIRED VALIDATION

Ensure that:

1. No `setLocal()` calls remain on ReactFlow nodes
2. ReactFlow only receives plain serializable node objects
3. Dragging nodes does not trigger runtime crashes
4. Editing nodes does not trigger runtime crashes
5. Selection changes do not trigger runtime crashes
6. Collaborative synchronization still works correctly
7. The canvas renders without ReactFlow exceptions

---

# REQUIRED FINAL RESULT

After fixing all issues:

1. The `node.setLocal is not a function` runtime error is completely eliminated
2. ReactFlow renders normally
3. Node interactions work correctly
4. Dragging and editing nodes no longer crash the editor
5. The editor remains stable during collaborative updates
6. ReactFlow and Liveblocks state synchronization behaves correctly