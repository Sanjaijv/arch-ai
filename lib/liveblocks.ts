import { Liveblocks } from "@liveblocks/node";

let liveblocks: Liveblocks | null = null;

/**
 * Returns a cached Liveblocks node client.
 * Uses lazy initialization to avoid key validation errors at build time.
 */
export function getLiveblocks() {
  if (!liveblocks) {
    const secret = process.env.LIVEBLOCKS_SECRET_KEY;
    if (!secret) {
      throw new Error("LIVEBLOCKS_SECRET_KEY is not defined");
    }
    liveblocks = new Liveblocks({ secret });
  }
  return liveblocks;
}

/**
 * Deterministically maps a user ID to a consistent color from a fixed palette.
 */
export function getUserColor(userId: string) {
  const COLORS = [
    "#FF5733", // Coral
    "#33FF57", // Mint
    "#3357FF", // Royal Blue
    "#F333FF", // Fuchsia
    "#FF33A8", // Hot Pink
    "#33FFF5", // Cyan
    "#FFBD33", // Amber
    "#A833FF", // Purple
  ];
  
  let hash = 0;
  for (let i = 0; i < userId.length; i++) {
    hash = userId.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % COLORS.length;
  return COLORS[index];
}
