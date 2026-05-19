"use client";

import { useOthers } from "@liveblocks/react/suspense";
import { useViewport } from "@xyflow/react";
import { Cursor } from "./cursor";

export function Cursors() {
  const others = useOthers();
  const { x: tx, y: ty, zoom } = useViewport();

  return (
    <>
      {others.map(({ connectionId, presence, info }) => {
        if (!presence?.cursor) return null;

        // Convert flow coordinates back to screen coordinates
        // screenX = (flowX * zoom) + tx
        // screenY = (flowY * zoom) + ty
        const x = presence.cursor.x * zoom + tx;
        const y = presence.cursor.y * zoom + ty;

        return (
          <Cursor
            key={connectionId}
            name={info.name || "Anonymous"}
            color={info.color || "#00c8d4"}
            x={x}
            y={y}
            thinking={presence.thinking}
          />
        );
      })}
    </>
  );
}
