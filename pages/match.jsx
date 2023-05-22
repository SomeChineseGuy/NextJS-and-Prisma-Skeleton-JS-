import { useState, useEffect } from "react";
import { PrismaClient } from "@prisma/client";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";
import { useRouter } from "next/router";
import axios from "axios";

export default function Match({ users }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selection, setSelection] = useState([]);
  const router = useRouter();

  let userSelection = router.query.gender_preference;
  let adventure_info = router.query.adventure_info;
  let user_1 = router.query.user_1;

  if (userSelection) {
    userSelection = JSON.parse(userSelection);
    user_1 = JSON.parse(user_1);
    adventure_info = JSON.parse(adventure_info);
  }

  useEffect(() => {
    fetchFilteredUser();
  }, [users]);

  //filtering user based on gender selection
  const fetchFilteredUser = async () => {
    let filteredUser = [];
    if (userSelection === "no_preference") {
      filteredUser = await users.filter((user) => user.id !== user_1);
    } else {
      filteredUser = await users.filter(
        (user) => user.gender === userSelection && user.id !== user_1
      );
    }
    setSelection(filteredUser);
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? selection.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === selection.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  const handleMatch = async () => {
    const matchInfo = {
      ...adventure_info,
      user_2: selection[currentIndex]["id"],
      active: true,
    };
    const { data } = await axios.post(
      "http://localhost:3000/api/match",
      matchInfo
    );
    router.push({
      pathname: "/chat",
      query: {
        match: JSON.stringify(data),
      },
    });
    const matchId = data.id;
    const adventureId = data.id;
    const body = { matchId, adventureId };
    await fetch("/api/createChat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  };

  return (
    <div className="h-[780px] w-full m-auto pt-48 pb-16 px-4 bg-orange-100 group flex flex-col items-center justify-center">
      <div className="flex w-[750px] h-full rounded-2xl bg-center bg-cover duration-500 shadow-2xl hover:shadow-inner bg-gradient-to-r from-[#FFD482] to-[#EE8162] ">
        {selection.length > 0 && (
          <div className="basis-1/2 flex justify-end items-center">
            <img
              src={selection[currentIndex]["profile_photo"]}
              alt=""
              className=" object-fit h-[500px] rounded-[10%] py-3"
            />
          </div>
        )}
        <div className="relative basis-1/2 text-left pt-5 px-10">
          <h2 className=" text-3xl mb-5">
            {selection.length > 0 && selection[currentIndex]["first_name"]}
          </h2>
          <ul>
            <li>
              <span className="font-extrabold">About me: </span>{" "}
              <p>
                {selection.length > 0 && selection[currentIndex]["about_me"]}
              </p>
            </li>
            <li>
              <span className="font-extrabold">My Age: </span>
              <p>{selection.length > 0 && selection[currentIndex]["age"]}</p>
            </li>
            <li>
              <span className="font-extrabold">Current Location: </span>
              <p>
                {selection.length > 0 &&
                  selection[currentIndex]["current_location"]}
              </p>
            </li>
          </ul>
          <div
            onClick={handleMatch}
            className="border-2 border-blue-600 rounded-lg px-3 py-2 m-3 text-blue-600 cursor-pointer hover:bg-blue-600 hover:text-blue-200 absolute bottom-0 right-0 h-10 w-25"
          >
            Match
          </div>
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
        {selection.map((item, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={"text-2xl cursor-pointer"}
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
