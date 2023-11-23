import { PrismaClient } from '@prisma/client';

// Create a single instance of PrismaClient if it doesn't already exist.
const prisma = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export default prisma;
