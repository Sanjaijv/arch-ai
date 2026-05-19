const { Liveblocks } = require("@liveblocks/node");
require("dotenv").config({ path: ".env.local" });

async function main() {
  const secret = process.env.LIVEBLOCKS_SECRET_KEY;
  if (!secret) {
    console.error("LIVEBLOCKS_SECRET_KEY is not defined");
    return;
  }
  const liveblocks = new Liveblocks({ secret });
  console.log("Methods:", Object.getOwnPropertyNames(Object.getPrototypeOf(liveblocks)));
}

main();
