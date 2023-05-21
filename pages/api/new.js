import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  console.log(req.body);
  const { user, city, gender_preference } = req.body;
  // console.log(user, city, gender_preference);
  if (req.method === "POST") {
    const prisma = new PrismaClient();
    const adventure = await prisma.adventure.create({
      data: {
        gender_preference: gender_preference,
        destination: Number(city),
        user: user,
      },
    });
    res.send(JSON.stringify(adventure));
  }
}
