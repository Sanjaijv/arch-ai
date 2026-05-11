import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: pg.Pool | undefined;
};

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const isAccelerate = databaseUrl.startsWith("prisma+postgres://");

const createPrismaClient = () => {
  const logOptions: any[] = ["error", "warn"];

  if (isAccelerate) {
    // Use Accelerate URL for Prisma Postgres / Accelerate connections
    return new PrismaClient({
      accelerateUrl: databaseUrl,
      log: logOptions,
    });
  }

  // Use standard pg adapter for direct PostgreSQL connections
  // Cache the pool globally in development to avoid "Server has closed the connection"
  const pool = globalForPrisma.pool ?? new pg.Pool({ connectionString: databaseUrl });
  
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.pool = pool;
  }

  const adapter = new PrismaPg(pool);
  return new PrismaClient({ 
    adapter,
    log: logOptions,
  });
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
