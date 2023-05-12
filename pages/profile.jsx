import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Gallery from "./components/Gallery";
import { data } from "../pages/components/mockData";
import Image from "next/image";

export default function Profile() {
  const { user, error, isLoading } = useUser();
  console.log(user);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div className="pt-48 bg-orange-100">
        <Image src={user.picture} width="100" height="100" alt="Profile pic" />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <Gallery data={data} />
      </div>
    )
  );
}
