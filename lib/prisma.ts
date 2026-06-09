// Fichier: lib/prisma.ts
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

// Vérification que l'URL est bien présente
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in environment variables.");
}

// Création de l'adaptateur pour PostgreSQL
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

// Évite de créer plusieurs instances de PrismaClient en développement (hot reload)
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;