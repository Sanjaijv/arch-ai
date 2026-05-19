import { LiveObject } from "@liveblocks/client";

const obj = new LiveObject({
  position: { x: 0, y: 0 },
  data: { label: "test" }
});

console.log(obj.get("position") instanceof LiveObject);
