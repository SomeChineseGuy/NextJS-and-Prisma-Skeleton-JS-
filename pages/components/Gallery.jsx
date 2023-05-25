import React from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import { HiLocationMarker } from "react-icons/hi";
import { useRouter } from "next/router";

export default function Gallery(props) {
  const router = useRouter();
  const slideLeft = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft - 500;
  };

  const slideRight = () => {
    var slider = document.getElementById("slider");
    slider.scrollLeft = slider.scrollLeft + 500;
  };

  const data = props.data;

  return (
    <>
      <div className="relative flex w-full items-center justify-center bg-orange-100 px-100">
        <MdChevronLeft
          className="opacity-50 cursor-pointer hover:opacity-100"
          onClick={slideLeft}
          size={40}
        />
        <div
          id="slider"
          className="w-5/6 h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide bg-orange-100 object p"
        >
          {data.map((item) => (
            <div
              className="w-[275px] h-[275px] m-6 inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300 rounded-[35%] bg-cover bg-no-repeat"
              style={{ backgroundImage: `url(${item["photo"]})` }}
              key={item["id"]}
              onClick={() => router.push(`/city/${item["id"]}`)}
            >
              <div className="shadow-md shadow-slate-950 h-[30px] w-[120px] rounded-md bg-white">
                <span className="flex justify-center items-center font-bold">
                  <HiLocationMarker /> {item["city"]}
                </span>
              </div>
            </div>
          ))}
        </div>
        <MdChevronRight
          className="opacity-50 cursor-pointer hover:opacity-100"
          onClick={slideRight}
          size={40}
        />
      </div>
    </>
  );
}

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const destinations = await prisma.destination.findMany();
  return {
    props: { destinations },
  };
}
