import { LiveObject, LiveMap } from "@liveblocks/client";

const obj = new LiveObject({ id: "1" });
console.log("constructor:", obj);

// Is there a .from method?
try {
  const fromObj = (LiveObject as any).from({ id: "2" });
  console.log("from:", fromObj);
} catch (e) {
  console.log("error:", e instanceof Error ? e.message : String(e));
}
