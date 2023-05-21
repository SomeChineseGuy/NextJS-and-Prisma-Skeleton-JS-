import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  // console.log(req.body);
  const { active, user, user_2, id } = req.body;
  // // console.log(user, city, gender_preference);
  if (req.method === "POST") {
    console.log(req.body);
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
