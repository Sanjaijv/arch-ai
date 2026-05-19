import { LiveObject } from "@liveblocks/client";

const obj = new LiveObject();
obj.set("position", { x: 0, y: 0 });

console.log(obj.get("position") instanceof LiveObject);
console.log(obj.get("position"));
