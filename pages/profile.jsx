import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Gallery from "./components/Gallery";
import { data } from "../pages/components/mockData";
import Image from "next/image";
import { PrismaClient } from "@prisma/client";
import { useState, useEffect } from "react";


export default function Profile(users) {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  const [firstName, setFirstName] = useState("")
  const email = user.email
  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [currentLocation, setCurrentLocation] = useState("")
  const [aboutMe, setAboutMe] = useState("")
  const photo = user.picture
  const userList = users.users
  let validUser = {}

  userList.forEach(function (item) {
    if(item.email === email){
      validUser = item  
    }
    return validUser
  })

  const saveProfile = async e => {
    e.preventDefault();
    const body = {firstName, email, age, gender, currentLocation, aboutMe, photo}
    await fetch('/api/profile', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body),
    })
  }

  return (
    user && (
      <div className=" pt-48 bg-orange-100">
        <div className="flex justify-evenly">
        <div>
        <h2 className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#5271ff] to-[#5271ee]">Profile Photo</h2>
        <Image src={user.picture}
                width="220"
                height="130"
                alt="Profile pic"
                className="rounded-full items-center mx-12 my-12"
                priority/>
        </div>
        <div >
        <h2 className="text-center text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#5271ff] to-[#5271ee]">Update Profile Information</h2>
        <p className="text-gray-500 text-lg block md:text-right mb-1 md:mb-0 pr-4 pt-3.5">EMAIL: {user.email} </p>
        <form  onSubmit={saveProfile}>
        <label className="text-gray-500 uppercase text-lg block md:text-right mb-1 md:mb-0 pr-4 pt-3.5">Name:
        <input type="text" name="firstName" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder={validUser.first_name} className="py-2 px-4 leading-tight font-light focus:outline-none rounded-lg"/>
        </label>
        <label className="text-gray-500 uppercase text-lg block md:text-right mb-1 md:mb-0 pr-4 pt-3.5">Age:
        <input type="text" name="age" id="age" value={age} onChange={e => setAge(e.target.value)} placeholder={validUser.age} className="py-2 px-4 leading-tight font-light focus:outline-none rounded-lg"/>
        </label>
        <label className="text-gray-500 uppercase text-lg block md:text-right mb-1 md:mb-0 pr-4 pt-3.5">Gender:
        <input type="text" name="gender" id="gender" value={gender} onChange={e => setGender(e.target.value)} placeholder={validUser.gender} className="py-2 px-4 leading-tight font-light focus:outline-none rounded-lg"/>
        </label>
        <label className="text-gray-500 uppercase text-lg block md:text-right mb-1 md:mb-0 pr-4 pt-3.5">Location:
        <input type="text" name="currentLocation" id="currentLocation" value={currentLocation} onChange={e => setCurrentLocation(e.target.value)} placeholder={validUser.current_location} className="py-2 px-4 leading-tight font-light focus:outline-none rounded-lg"/>
        </label>
        <label className="text-gray-500 uppercase text-lg block md:text-right mb-1 md:mb-0 pr-4 pt-3.5">About Me:
        <input type="text" name="aboutMe" id="aboutMe" value={aboutMe} onChange={e => setAboutMe(e.target.value)} placeholder={validUser.about_me} className="py-2 px-4 leading-tight font-light focus:outline-none rounded-lg"/>
        </label>
        <button className=" my-5 bg-white hover:bg-gray-100 text-gray-500 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex" type="submit">Save</button>
        </form>
        </div>
        </div>
        <h2 className="text-center mx-12 my-12 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#5271ff] to-[#5271ee]">Previous Adventures</h2>
        <Gallery data={data} />
      </div>
    )
  );
}

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const users = await prisma.user.findMany()
  return {
    props: { users },
  };
}