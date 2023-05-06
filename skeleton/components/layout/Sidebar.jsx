import Link from "next/link";
import React, { useState, useRef } from "react";

export default function Sidebar() {
  const [activeMenuIndex, setActiveMenuIndex] = useState(0);

  // add paths when they're completed
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
          <Link
            key={i}
            href={`${link.path}`}
            className={`h-20 w-full justify-center hover:bg-gray-100 flex items-center ${links[activeMenuIndex].label === link.label ? "bg-gray-200" : ""}`}
            onClick={() => setActiveMenuIndex(i)}
            >
              {link.label}
          </Link>
        )})}
    </div>
  );
};


//look up react-context to access props data from any component