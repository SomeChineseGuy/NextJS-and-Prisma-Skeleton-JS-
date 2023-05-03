import Link from "next/link";
import React from "react";
import styles from "@/styles/Home.module.css";


export default function Navbar(props) {
  return (
    <nav className="bg-gray-800 text-gray-400 h-20 flex items-center">
      <div className="">Hi, {props.user.firstName}!</div>
    </nav>
  );
}

