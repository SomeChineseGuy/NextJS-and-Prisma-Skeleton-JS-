import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

import prisma from "@/prisma/prismaclient";
import Layout from "@/components/layout/Layout";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps() {
  // !!! ask Alvin about this !!!
  const user = await prisma.user.findUnique({
    where: {
      id: 1,
    },
  });

  return {
    props: { user }, // will be passed to the page component as props
  };
}

export default function Home({ user }) {
  return (
    <>
      <Layout user={user}></Layout>
    </>
  );
}

// export async function getStaticProps() {
//   const prisma = new PrismaClient()
//   const blogs = await prisma.blog.findMany()

//   return {
//     props : { blogs }
//   }
// }
