import { Fragment } from "react";
// import { Disclosure, Menu, Transition } from '@headlessui/react'
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Inter } from "next/font/google";
import Image from "next/image";
import Logo from "../../public/Logo.png";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

//font from google
const inter = Inter({ subsets: ["latin"] });

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, error, isLoading } = useUser();

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <nav className="fixed w-full h-24 shadow-xl bg-orange-100">
      <div className="flex justify-between items-center h-full w-full px-4 2xl:px-16">
        <Link href="/">
          <Image
            src={Logo}
            alt="Logo"
            width="65"
            height="25"
            className="cursor-pointer bg-blend-normal"
            priority
          />
        </Link>
        <div className="hidden sm:flex">
          <ul className="hidden sm:flex">
            <Link href="/">
              <li className="ml-10 uppercase hover:border-b text-sm">Home</li>
            </Link>
            <Link href="/new">
              <li className="ml-10 uppercase hover:border-b text-sm">
                New Adventure
              </li>
            </Link>
            <Link href="/profile">
              <li className="ml-10 uppercase hover:border-b text-sm">
                Profile
              </li>
            </Link>
            <Link href="/chat">
              <li className="ml-10 uppercase hover:border-b text-sm">Chats</li>
            </Link>
            <Link href="/notifications">
              <li className="ml-10 uppercase hover:border-b text-sm">
                Notifications
              </li>
            </Link>
            <Link href="/about">
              <li className="ml-10 uppercase hover:border-b text-sm">About</li>
            </Link>
          </ul>
        </div>
        {user && (
          <ul className="hidden sm:flex items-center">
            <Link href="/api/auth/logout">
              <li className="ml-10 uppercase hover:border-b text-sm">Logout</li>
            </Link>
            <Link href="/profile">
              <li className="ml-10 uppercase hover:border-b text-sm">
                {user.given_name}
              </li>
            </Link>
            <Link href="/profile">
              <img
                src={user.picture}
                alt="Logo"
                width="65"
                height="25"
                className="ml-10 cursor-pointer rounded-full"
                priority
              />
            </Link>
          </ul>
        )}
        {!user && (
          <Link href="/api/auth/login" className="hidden sm:flex">
            <span className="ml-10 uppercase hover:border-b text-sm">
              Login
            </span>
          </Link>
        )}
        {/* Mobile view */}
        <div onClick={handleNav} className="md:hidden cursor-pointer pl-24">
          <AiOutlineMenu size={25} />
        </div>
      </div>
      <div
        className={
          menuOpen
            ? "fixed left-0 top-0 w-[65%] sm:hidden h-screen bg-[#fce7cb] p-10 ease-in duration-500"
            : "fixed left-[-100%] top-0 p-10 ease-in duration-500"
        }
      >
        <div className="flex w-full items-center justify-end">
          <div onClick={handleNav} className="md:hidden cursor-pointer pl-24">
            <AiOutlineClose size={25} />
          </div>
        </div>
        <div className="flex-col items-center py-4">
          <ul>
            <Link href="/">
              <li
                onClick={() => setMenuOpen(false)}
                className="py-4 cursor-pointer"
              >
                Home
              </li>
            </Link>
            <Link href="/new">
              <li
                onClick={() => setMenuOpen(false)}
                className="py-4 cursor-pointer"
              >
                New Adventure
              </li>
            </Link>
            <Link href="/profile">
              <li
                onClick={() => setMenuOpen(false)}
                className="py-4 cursor-pointer"
              >
                Profile
              </li>
            </Link>
            <Link href="/chat">
              <li
                onClick={() => setMenuOpen(false)}
                className="py-4 cursor-pointer"
              >
                Chats
              </li>
            </Link>
            <Link href="/notifications">
              <li
                onClick={() => setMenuOpen(false)}
                className="py-4 cursor-pointer"
              >
                Notifications
              </li>
            </Link>
            <Link href="/about">
              <li
                onClick={() => setMenuOpen(false)}
                className="py-4 cursor-pointer"
              >
                About
              </li>
            </Link>
          </ul>
          {user && (
            <ul className="py-4 cursor-pointer">
              <Link href="/api/auth/logout">
                <li
                  onClick={() => setMenuOpen(false)}
                  className="py-4 cursor-pinter"
                >
                  Logout
                </li>
              </Link>
              <Link href="/profile">
                <li
                  onClick={() => setMenuOpen(false)}
                  className="py-4 cursor-pointer"
                >
                  {user.given_name}
                </li>
              </Link>
            </ul>
          )}
          {!user && (
            <div className="py-4 cursor-pointer">
              <Link href="/api/auth/login">Login</Link>
            </div>
          )}
        </div>
        <div className="flex flex-row justify-around pt-10 items-center">
          <Link href="/">
            <Image
              src={Logo}
              alt="Logo"
              width="65"
              height="25"
              className="cursor-pointer pt-6"
              priority
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}
