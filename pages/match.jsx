import { PrismaClient } from "@prisma/client";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { data } from "../pages/components/mockData";
import Carousel from "../pages/components/Carousel";
import Image from "next/image";

export default function Match({ users }) {
  return (
    <section className="flex flex-col items-center pt-48 sm:pt-36 w-full h-[860px] bg-orange-100">
      <section>
        <span>Filter</span>
      </section>
      <div className=" max-w-lg">
        <Carousel>
          {users.map((user) => (
            <img key={user["id"]} src={user["profile_photo"]} />
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  return {
    props: { users },
  };
}
