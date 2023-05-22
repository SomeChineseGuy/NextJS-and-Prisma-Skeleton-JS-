import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Gallery from "./components/Gallery";
import { data } from "../pages/components/mockData";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import { useRouter } from 'next/router';

export default function Profile(users) {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  console.log(users)

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const [firstName, setFirstName] = useState("");
  const email = user.email;
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [aboutMe, setAboutMe] = useState("");
  const photo = user.picture;
  const userList = users.users;
  const destinationList = users.destinations
  const adventuresList = users.adventures
  let validUser = {};

  userList.forEach(function (item) {
    if (item.email === email) {
      validUser = item;
    }
    return validUser;
  });

  let userAdventures = []
  let userDestinations = []

  adventuresList.forEach(function (item) {
    if (item.user === validUser.id)
      userAdventures.push(item)
  })

  destinationList.forEach(function (item) {
    userAdventures.forEach(function (items) {
      if (item.id === items.destination) {
        userDestinations.push(item)
      }
    })
  })



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
    router.push('/');
  };


  return (
    user && (
      <div className=" pt-48 bg-orange-100">
        <div className="flex justify-evenly">
          <div>
            <h2 className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#5271ff] to-[#5271ee]">
              Profile Photo
            </h2>
            <Image
              src={user.picture}
              width="220"
              height="130"
              alt="Profile pic"
              className="rounded-full items-center mx-12 my-12"
              priority
            />
          </div>
          <div>
          <h2 className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#5271ff] to-[#5271ee]">
              Profile Information
            </h2>
            <p className="text-black-500 text-lg mb-1md:mb-0 pr-4 pt-3.5">
              EMAIL: {user.email}{" "}
            </p>
            <p className="text-black-500 text-lg mb-1 mt-1  md:mb-0 pr-4 pt-3.5">
              NAME: {validUser.first_name}{" "}
            </p>
            <p className="text-black-500 text-lg mb-1 mt-1  md:mb-0 pr-4 pt-3.5">
              AGE: {validUser.age}{" "}
            </p>
            <p className="text-black-500 text-lg mb-1 mt-1  md:mb-0 pr-4 pt-3.5">
              GENDER: {validUser.gender}{" "}
            </p>
            <p className="text-black-500 text-lg mb-1 mt-1  md:mb-0 pr-4 pt-3.5">
              LOCATION: {validUser.current_location}{" "}
            </p>
            <p className="text-black-500 text-lg mb-1 mt-1  md:mb-0 pr-4 pt-3.5">
              ABOUT ME: {validUser.about_me}{" "}
            </p>
          </div>
          <div>
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
                <select type="text"
                  name="gender"
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="py-2 px-2 leading-tight font-light focus:outline-none rounded-lg text-center">
                  <option value="" selected disabled hidden>Choose an option below</option>
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
