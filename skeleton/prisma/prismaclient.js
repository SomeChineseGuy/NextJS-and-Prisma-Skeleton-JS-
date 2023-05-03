import { PrismaClient } from "@prisma/client";

let prisma;
global.prisma = new PrismaClient();
prisma = global.prisma;

export default prisma;
