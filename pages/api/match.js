import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const { active, user, user_2, id } = req.body;
  if (req.method === "POST") {
    const prisma = new PrismaClient();
    const match = await prisma.match.create({
      data: {
        active: active,
        adventure: id,
        user_1: user,
        user_2: user_2,
      },
    });
    res.send(JSON.stringify(match));
    
  }

}
