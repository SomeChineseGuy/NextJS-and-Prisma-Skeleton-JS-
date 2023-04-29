// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client';
export default async function handler(req, res) {
  const prisma = new PrismaClient();
  if(req.method === "GET") {

  }

  if(req.method === "POST") {
    const userInput = req.body.userInput
    console.log(userInput);
    
    // const blogs = await prisma.blog.findMany();
    const blogs = await prisma.blog.findMany({
        where: {
          title: {
            contains: userInput
          }
        }
    })

    console.log(blogs);
    res.send(JSON.stringify({blogs: blogs}))

  }

  if(req.method === "DELETE") {
    
  }
  // res.status(200).json({ name: 'John Doe' })

}