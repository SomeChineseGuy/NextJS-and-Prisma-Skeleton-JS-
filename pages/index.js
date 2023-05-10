import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { PrismaClient } from "@prisma/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Herosection from "./components/Herosection";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ blogs }) {
  const { user, error, isLoading } = useUser();
  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;

  // if (user) {
  return <Herosection />;
}
// }

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const blogs = await prisma.blog.findMany();

  return {
    props: { blogs },
  };
}

// {user ? (
//   <div>
//     <Head>
//       <title>NextJs Primsa Skeleton</title>
//       <meta name="description" content="Generated by create next app" />
//       <meta
//         name="viewport"
//         content="width=device-width, initial-scale=1"
//       />
//       <link rel="icon" href="/favicon.ico" />
//     </Head>
//     <main className={styles.main}>
//       {/* <h1>
//     Welcome {user.name}! <a href="/api/auth/logout">Logout</a>
//   </h1> */}
//     </main>
//   </div>
// ) : (
//   <div>
//     <a href="/api/auth/login?returnTo=/profile">Login</a>
//   </div>
