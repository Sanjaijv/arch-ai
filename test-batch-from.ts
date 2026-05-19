import { LiveMap, LiveObject, createClient, LiveList } from "@liveblocks/client";
import WebSocket from "ws";

const client = createClient({
  publicApiKey: "pk_dev_13JngRFbiiklrvrnEMeFSX8PUHR6NkF1Lcs6jA9S_qrrcYaQ9-WqPDBjzpBssmzp",
  polyfills: {
    WebSocket: WebSocket as any,
  },
});

const { room, leave } = client.enterRoom("test-room-2", {
  initialPresence: { cursor: null, thinking: false },
  initialStorage: {
    flow: new LiveObject({
      nodes: new LiveMap(),
      edges: new LiveMap(),
    }),
    "ai-status-feed": new LiveList([]),
    "ai-chat": new LiveList([]),
  },
});

async function main() {
  const { root } = await room.getStorage();
  const flow = root.get("flow") as LiveObject<any>;
  const nodesMap = flow.get("nodes") as LiveMap<string, any>;

  console.log("Size before:", nodesMap.size);

  const NODE_CONFIG = {
    selected: false,
    position: "atomic",
    data: "atomic",
  };

  room.batch(() => {
    // using LiveObject.from
    const newNode = (LiveObject as any).from({
      id: "1",
      type: "canvasNode",
    }, NODE_CONFIG);
    nodesMap.set("1", newNode);
  });

  console.log("Size after batch:", nodesMap.size);
  
  leave();
}

main().catch(console.error);
