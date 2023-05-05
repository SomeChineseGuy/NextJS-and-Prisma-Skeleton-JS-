import Link from "next/link";
import React, { useState } from "react";
import styles from "@/styles/Home.module.css";

export default function Sidebar() {

const links = [
  {label: 'Overview', path: "/"},
  {label: 'Accounts', path: "/"},
  {label: 'Budgets', path: "/"},
  {label: 'Reports', path: "/"},
];

  return (
    <div className="flex-col w-1/6 items-center justify-center">
      {links.map( (link, i) => {
        return (
        <li className="list-none bg-gray-900">
          <Link
            key={i}
            href={`${link.path}`}
            >{link.label}
          </Link>
        </li>
        )})}
    </div>
  );
};


