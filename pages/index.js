import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { PrismaClient } from "@prisma/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Herosection from "./components/Herosection";
import Gallery from "./components/Gallery";
import { data } from "../pages/components/mockData";
import { FaPassport } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export default function Home({users, destinations}) {
  const { user, error, isLoading } = useUser();

  return (
    <>
      <Head>
        <title>TripMate</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Herosection />
      <div className="flex flex-col justify-center items-center bg-orange-100">
        <h2 className="text-3xl text-black text-left pt-8 pb-2 font-bold">
          Top Destinations
        </h2>
        <p className="text-xl font-bold text-[#5271ff]">
          Not sure where to go, here you'll find the answer
        </p>
        <Gallery data={destinations} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany()
  const destinations = await prisma.destination.findMany()
  return {
    props: {users, destinations}
  };
}
