import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Gallery from "./components/Gallery";
import { data } from "../pages/components/mockData";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Profile(users) {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  console.log(users);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const [firstName, setFirstName] = useState("");
  const email = user.email;
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const [update, setUpdate] = useState(true);
  const photo = user.picture;
  const userList = users.users;
  const destinationList = users.destinations;
  const adventuresList = users.adventures;
  let validUser = {};

  userList.forEach(function (item) {
    if (item.email === email) {
      validUser = item;
    }
    return validUser;
  });

  let userAdventures = [];
  let userDestinations = [];

  adventuresList.forEach(function (item) {
    if (item.user === validUser.id) userAdventures.push(item);
  });

  destinationList.forEach(function (item) {
    userAdventures.forEach(function (items) {
      if (item.id === items.destination) {
        userDestinations.push(item);
      }
    });
  });

  const handleUpdate = () => {
    console.log("update");
    update ? setUpdate(false) : setUpdate(true);
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    const body = {
      firstName,
      email,
      age,
      gender,
      currentLocation,
      aboutMe,
      photo,
    };
    await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    handleUpdate();
    router.push("/profile");
  };

  return (
    user && (
      <div className=" pt-48 bg-orange-100 flex flex-col justify-center items-center">
        {/* Main box profile */}
        <div className=" w-[1000px] h-[450px] py-10 rounded-2xl shadow-lg hover:shadow-inner bg-gradient-to-r from-[#FFD482] to-[#EE8162]">
          <div className="flex justify-evenly  bg-gray-500 bg-opacity-20 shadow-[inset_0_-2px_4px_rgba(0,0,0,0.6)] rounded-xl mx-24">
            {/* Profile pic box */}
            <div className=" ">
              <h2 className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#5271ff] to-[#5271ee]">
                {/* Profile Photo */}
              </h2>
              <Image
                src={user.picture}
                width="220"
                height="130"
                alt="Profile pic"
                className="rounded-full border-solid border-[#EE8162] border-[4px] items-center mx-12 my-12"
                priority
              />
            </div>
            {/* profile info box */}
            <div className={" w-[370px] " + (!update && "hidden")}>
              <div className="p-5 h-[100px] w-auto">
                <h2 className="text-lg">{user.given_name}</h2>
                <h3 className="text-gray-600">{validUser.current_location}</h3>
                <div
                  onClick={handleUpdate}
                  className="border-2 border-blue-600 rounded-lg text-center pt-1 text-blue-600 cursor-pointer hover:bg-blue-600 hover:text-blue-200 relative bottom-[50px] right-[-230px] h-10 w-[95px]"
                >
                  Update
                </div>
              </div>
              <div className="pl-5 flex flex-row justify-start">
                <div className="basis-1/4  text-gray-500">
                  <ul className="p-2">
                    <li className=" py-2">Name </li>
                    <li className=" py-2">Email </li>
                    <li className=" py-2">Age</li>
                    <li className=" py-2">Gender</li>
                    <li className=" py-2">Location</li>
                    <li className=" py-2">About me</li>
                  </ul>
                </div>
                <div className="basis-3/4">
                  <ul className="p-2">
                    <li className=" py-2">{validUser.first_name} </li>
                    <li className=" py-2"> {user.email} </li>
                    <li className=" py-2">{validUser.age}</li>
                    <li className=" py-2">{validUser.gender}</li>
                    <li className=" py-2">{validUser.current_location}</li>
                    <li className=" py-2">{validUser.about_me}</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Update profile */}
            <div className={" px-1 w-[370px] " + (update && "hidden")}>
              <h2 className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#5271ff] to-[#5271ee]">
                Update Profile Information
              </h2>
              <form onSubmit={saveProfile}>
                <label className="text-gray-500 uppercase text-lg block md:text-right mb-1 md:mb-0 pr-4 pt-3.5">
                  Name:
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className=" text-center py-2 px-4 leading-tight font-light focus:outline-none rounded-lg"
                  />
                </label>
                <label className="text-gray-500 uppercase text-lg block md:text-right mb-1 md:mb-0 pr-4 pt-3.5">
                  Age:
                  <input
                    type="text"
                    name="age"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="text-center py-2 px-4 leading-tight font-light focus:outline-none rounded-lg"
                  />
                </label>
                <label className="text-gray-500 uppercase text-lg block md:text-right mb-1 md:mb-0 pr-4 pt-3.5">
                  Gender:
                  <select
                    type="text"
                    name="gender"
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="py-2 px-2 leading-tight font-light focus:outline-none rounded-lg text-center"
                  >
                    <option value="" selected disabled hidden>
                      Choose an option below
                    </option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                    <option value="Non-Binary">Non-Binary</option>
                  </select>
                </label>
                <label className="text-gray-500 uppercase text-lg block md:text-right mb-1 md:mb-0 pr-4 pt-3.5">
                  Location:
                  <input
                    type="text"
                    name="currentLocation"
                    id="currentLocation"
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                    className="py-2 px-4 leading-tight font-light focus:outline-none rounded-lg text-center"
                  />
                </label>
                <label className="text-gray-500 uppercase text-lg block md:text-right mb-1 md:mb-0 pr-4 pt-3.5">
                  About Me:
                  <input
                    type="text"
                    name="aboutMe"
                    id="aboutMe"
                    value={aboutMe}
                    onChange={(e) => setAboutMe(e.target.value)}
                    className="text-center py-2 px-4 leading-tight font-light focus:outline-none rounded-lg"
                  />
                </label>
                <button
                  className=" my-5 bg-white hover:bg-gray-100 text-gray-500 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex"
                  type="submit"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
        <h2 className="text-center mx-12 my-12 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#5271ff] to-[#5271ee]">
          Previous Adventures
        </h2>
        <Gallery data={userDestinations} />
      </div>
    )
  );
}

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany();
  const destinations = await prisma.destination.findMany();
  const adventures = await prisma.adventure.findMany();
  return {
    props: { users, destinations, adventures },
  };
}
