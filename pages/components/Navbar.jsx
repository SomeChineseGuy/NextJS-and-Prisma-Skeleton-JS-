
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Dashboard', href: '#', current: true },
  { name: 'Team', href: '#', current: false },
  { name: 'Projects', href: '#', current: false },
  { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    
    <nav className="flex justify-between m-[20px] border-black">
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
    </nav>
  ) 
}

