const { PrismaClient } = require("./app/generated/prisma/client");
const { SqlDriverAdapter } = require("@prisma/adapter-pg");
const { Pool } = require("pg");
require("dotenv").config({ path: ".env.local" });

async function main() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new SqlDriverAdapter(pool);
  const prisma = new PrismaClient({ adapter });
  const project = await prisma.project.findFirst();
  console.log("RoomID:", project?.id);
  await pool.end();
}

main();
