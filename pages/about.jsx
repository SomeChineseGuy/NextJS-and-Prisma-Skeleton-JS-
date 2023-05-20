import { PrismaClient } from "@prisma/client";
import aboutImg from ".././public/aboutImg.png";
import customerReview from ".././public/customerReview.png";
import Image from "next/image";
import satisfaction from ".././public/satisfaction.png";

export default function About() {
  return (
    <div className="pt-48 flex flex-col h-screen bg-orange-100">
      <h1 className="text-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#5271ff] to-[#5271ee]">About TripMate</h1>
      <div className="flex">
      <Image
              src={aboutImg}
              alt="Logo"
              width="350"
              height="50"
              className="ml-80"
              priority
            />
            <div className="">
             <p className="text-gray-500 ml-7 px-16 text-lg mt-10 mr-96">We are experienced in bringing adventures to folks around the world, with exciting destinations in the world as our specialties. Start your adventure now!</p>
             <Image
              src={customerReview}
              alt="Logo"
              width="450"
              height="50"
              className="ml-44 mt-10"
              priority
            />
             </div>
            </div>
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