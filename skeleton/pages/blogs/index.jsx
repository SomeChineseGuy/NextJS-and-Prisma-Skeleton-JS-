import { PrismaClient } from '@prisma/client';

export default function Blogs ({blogs}) {
  console.log(blogs);
  return (
    <div>
      <h1>Blogs</h1>
      {blogs && blogs.map(blog => {
        
          return (
            <div key={blog.id}> 
              <h1>{blog.title}</h1>
              <p>{blog.content}</p>
            </div>
          );
        
      })}
    </div>
  )
}

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  // const blogs = await prisma.blog.findMany();
  const blogs = await prisma.blog.findMany({
    where: {
      published: true
    }
  })
  console.log(blogs);

  return {
    props: {
      blogs
    }
  }
}