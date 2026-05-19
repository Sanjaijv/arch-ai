import { LiveMap, LiveObject } from "@liveblocks/client";

const map = new LiveMap<string, any>();
const node = new LiveObject({ id: "1" });
map.set("1", node);
console.log("Size:", map.size);
