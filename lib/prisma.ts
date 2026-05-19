import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: pg.Pool | undefined;
};

const databaseUrl = process.env.DATABASE_URL;

const createPrismaClient = () => {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  const logOptions: any[] = ["error", "warn"];

  const pool = globalForPrisma.pool ?? new pg.Pool({
    connectionString: databaseUrl,
    max: 20,
    idleTimeoutMillis: 60000,
    connectionTimeoutMillis: 20000,
  });

  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.pool = pool;
  }

  const adapter = new PrismaPg(pool);
  return new PrismaClient({
    adapter,
    log: logOptions,
  });
};

const getPrismaClient = () => {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = createPrismaClient();
  }

  return globalForPrisma.prisma;
};

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop, receiver) {
    return Reflect.get(getPrismaClient() as any, prop, receiver);
  },
  has(_target, prop) {
    return Reflect.has(getPrismaClient() as any, prop);
  },
  ownKeys() {
    return Reflect.ownKeys(getPrismaClient() as any);
  },
  getPrototypeOf() {
    return Reflect.getPrototypeOf(getPrismaClient() as any);
  },
  apply(_target, thisArg, args) {
    return Reflect.apply(getPrismaClient() as any, thisArg, args);
  },
}) as PrismaClient;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
