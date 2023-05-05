import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  const transactions = await prisma.transaction.findMany({
    include: { sources: true, categories: true },
  });
  res.send(JSON.stringify(transactions));
}
