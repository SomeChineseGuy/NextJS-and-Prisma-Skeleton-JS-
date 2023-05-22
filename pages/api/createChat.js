import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const { matchId, adventureId} = req.body;
  const mId = parseInt(matchId);
  const aId = parseInt(adventureId)
  const prisma = new PrismaClient();
  const chat = await prisma.chat.create({
    data: {
      adventure: aId,
      match: mId,
      active: true
    },
  });
  res.send(chat);
}
