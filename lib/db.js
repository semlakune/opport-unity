import { PrismaClient } from '@prisma/client';

// Create a single instance of PrismaClient if it doesn't already exist.
const db = globalThis.db || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;

export default db;
