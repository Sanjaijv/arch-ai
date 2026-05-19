const { Liveblocks } = require("@liveblocks/node");
require("dotenv").config({ path: ".env.local" });

async function main() {
  const secret = process.env.LIVEBLOCKS_SECRET_KEY;
  const liveblocks = new Liveblocks({ secret });
  const roomId = "test-room"; // Change to a real roomId if possible
  
  try {
    const storage = await liveblocks.getStorageDocument(roomId);
    console.log("Storage:", JSON.stringify(storage, null, 2));
  } catch (e) {
    console.error("Error:", e.message);
  }
}

main();
