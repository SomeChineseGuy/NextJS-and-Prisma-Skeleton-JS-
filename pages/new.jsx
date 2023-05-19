import { PrismaClient } from "@prisma/client";

export default function New() {
  return (
    <div>
      <h1>New Adventure</h1>
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