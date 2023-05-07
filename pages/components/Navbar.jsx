
import { Fragment } from 'react'
// import { Disclosure, Menu, Transition } from '@headlessui/react'
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Inter } from 'next/font/google'
import Image from 'next/image'
import Logo from '../../public/Logo.png'
import Link from 'next/link';
import { AiOutlineMenu } from 'react-icons/ai'
import { useState } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';

//font from google
const inter = Inter({ subsets: ['latin']});

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, error, isLoading } = useUser();


  const handleNav = () => {
    setMenuOpen(!menuOpen);
  }
  console.log(user);
  return (
  <nav className='fixed w-full h-24 shadow-xl bg-orange-100'>
    <div className='flex justify-between items-center h-full w-full px-4 2xl:px-16'>
      <Link href='/'>
        <Image 
          src={Logo}
          alt="Logo"
          width="65"
          height="25"
          className='cursor-pointer bg-blend-normal'
          priority
        />
      </Link>
      <div className='hidden sm:flex'>
        <ul className='hidden sm:flex'>
          <Link href='/'>
          <li className='ml-10 uppercase hover:border-b text-sm'>Home</li>
          </Link>
          <Link href='/new'>
          <li className='ml-10 uppercase hover:border-b text-sm'>New Adventure</li>
          </Link>
          <Link href='/profile'>
          <li className='ml-10 uppercase hover:border-b text-sm'>Profile</li>
          </Link>
          <Link href='/chat'>
          <li className='ml-10 uppercase hover:border-b text-sm'>Chats</li>
          </Link>
          <Link href='/notifications'>
          <li className='ml-10 uppercase hover:border-b text-sm'>Notifications</li>
          </Link>
          <Link href='/about'>
          <li className='ml-10 uppercase hover:border-b text-sm'>About</li>
          </Link>
        </ul>
      </div>
        {user && (
          <ul className='hidden sm:flex content-center'>
            <Link href='/api/auth/logout'>
              <li className='ml-10 uppercase hover:border-b text-sm'>          
              Logout</li>
            </Link>
              <Link href='/profile'>
                <li className='ml-10 uppercase hover:border-b text-sm'>{user.given_name}</li>
              </Link>
              <Link href='/profile'>
                <img 
                src={user.picture}
                alt="Logo"
                width="65"
                height="25"
                className='ml-20 cursor-pointer rounded-full'
                priority
                />
              </Link>

          </ul>
        )}
        {!user && (
          <Link href='/api/auth/login'>
            <span className='ml-10 uppercase hover:border-b text-sm'>Login</span>
          </Link>
        )}

      <div onClick={handleNav} className='md:hidden cursor-pointer pl-24'>
        <AiOutlineMenu size={25} />
      </div>
    </div>

  </nav>    
  ); 
};

{/* <nav className="flex justify-between m-[20px] border-black">
      <img src="#" alt="TripMate Logo" className="border-solid-[1px]-black" />
      <ul className="flex">
        <li>Home</li>
        <li>New Adventure</li>
        <li>Profile</li>
        <li>Chats</li>
        <li>Notifications</li>
        <li>About</li>
      </ul>
      <div className="flex">
        <img src="#" alt="Profile photo" />
        <a href="/api/auth/logout">Logout</a>
        
      </div>
    </nav> */}

