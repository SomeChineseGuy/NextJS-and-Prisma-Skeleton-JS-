import { PrismaClient } from "@prisma/client";

export default function About() {
  return (
    <div className="flex flex-col justify-center items-center bg-orange-100">
      <h1>About</h1>
    </div>
  )
}

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany()
  console.log(users)
  return {
    props: {users}
  };
}