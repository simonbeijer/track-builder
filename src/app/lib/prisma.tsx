import { PrismaClient } from '@prisma/client';

// Create a Prisma client to interact with the database
const prisma = new PrismaClient();

// Export it to use in other parts of the app
export default prisma;
