import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const { firstName, email, age, gender, currentLocation, aboutMe, photo } =
    req.body;
  console.log(firstName, email, age, gender, currentLocation, aboutMe, photo);
  const prisma = new PrismaClient();
  const user = await prisma.user.upsert({
    where: {
      email: email,
    },
    update: {
      first_name: firstName,
      email: email,
      age: age,
      gender: gender,
      current_location: currentLocation,
      about_me: aboutMe,
    },
    create: {
      first_name: firstName,
      email: email,
      age: age,
      gender: gender,
      current_location: currentLocation,
      about_me: aboutMe,
      profile_photo: photo,
    },
  });
  res.send(JSON.stringify(user));
}
