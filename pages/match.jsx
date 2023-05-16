import { useState } from "react";
import { PrismaClient } from "@prisma/client";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { useRouter } from "next/router";
import { data } from "../pages/components/mockData";

export default function Match({ users }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? users.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === users.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const handleReplace = () => {
    router.replace("/");
  };

  return (
    <div className="h-[780px] w-full m-auto pt-48 pb-16 px-4 bg-orange-100 group flex flex-col items-center justify-center">
      <div
        className="flex w-[750px] h-full rounded-2xl bg-center bg-cover duration-500 shadow-2xl hover:shadow-inner bg-gradient-to-r from-[#FFD482] to-[#EE8162] "
        // style={{ backgroundImage: `url(${data[0].img})` }}
      >
        <div className="basis-1/2 flex justify-end items-center">
          <img
            src={users[currentIndex]["profile_photo"]}
            alt=""
            className=" object-fit h-[500px] rounded-[10%] py-3"
          />
        </div>
        <div className="relative basis-1/2 text-left pt-5 px-10">
          <h2 className=" text-3xl mb-5">
            {users[currentIndex]["first_name"]}
          </h2>
          <ul>
            <li>
              <span className="font-extrabold">About me: </span>{" "}
              <p>{users[currentIndex]["about_me"]}</p>
            </li>
            <li>
              <span className="font-extrabold">My Age: </span>
              <p>{users[currentIndex]["age"]}</p>
            </li>
            <li>
              <span className="font-extrabold">Current Location: </span>
              <p>{users[currentIndex]["current_location"]}</p>
            </li>
          </ul>
          <div
            onClick={() => router.replace(`user/${users[currentIndex]["id"]}`)}
            className="border-2 border-blue-600 rounded-lg px-3 py-2 m-3 text-blue-600 cursor-pointer hover:bg-blue-600 hover:text-blue-200 absolute bottom-0 right-0 h-10 w-25"
          >
            Match
          </div>
          {/* <button className="absolute bottom-0 right-0 h-16 w-16">Match</button> */}
        </div>
      </div>
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {users.map((user, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <RxDotFilled />
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  return {
    props: { users },
  };
}
