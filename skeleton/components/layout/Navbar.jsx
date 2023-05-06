import Link from "next/link";
import React from "react";
import styles from "@/styles/Home.module.css";


export default function Navbar(props) {
  return (
    <div className="flex justify-end">
      <nav className="bg-nav-gray text-gray-900 h-20 w-5/6 flex justify-start items-center ps-20">
        <img className="rounded-full object-fill h-12 w-12 me-4" src="https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mo-mockup-118823744.jpg" alt="user-image" />
        <div className="">Hi, {props.user.firstName}!</div>
      </nav>
    </div>

  );
}

