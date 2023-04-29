import { PrismaClient } from '@prisma/client';

export default function Blog({blogs, found = true}) {
  return (
    <div>
      <h1>Hello</h1>
      {found ?
        <div> 
          <h1>{blogs.title && blogs.title}</h1>
          <p>{blogs.content && blogs.content}</p>
        </div>
      :
      <div>
        <h1>Nothing Found</h1>
      </div>
      }

    </div>
  )
};

export async function getServerSideProps(content) {
  console.log(content.params.id);
  const searchId = Number(content.params.id) ? Number(content.params.id) : 9999999999;
  const prisma = new PrismaClient();
  const blogs = await prisma.blog.findUnique({
    where: {
      id: searchId
    },
    select: {
      content: true,
      title: true
    }
  })

  if(!blogs) {
    return {
      props: {
        found: false
      }
    }
  }

  return {
    props: {
      blogs
    }
  }
}