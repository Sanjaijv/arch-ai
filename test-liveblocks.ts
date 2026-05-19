import { LiveMap, LiveObject, LiveList } from "@liveblocks/client";

const map = new LiveMap([["key", new LiveObject({ a: 1 })]]);
console.log("map toJSON:", map.toJSON());

const list = new LiveList([new LiveObject({ a: 1 })]);
console.log("list toJSON:", list.toJSON());
