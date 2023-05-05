import React from "react"; 
import Link from 'next/link';


export default function Navbar () {
  return (
<div>
<nav className='nav_not_signed_in' >   
        <Link href="/">Doggo Dash</Link>
        <Link href="/search">Search</Link>
        <Link href="/signUp">Sign Up</Link>
        <Link href="/signIn">Sign in</Link>
 </nav>

 {/* <nav className='nav_signed_in' >   
        <Link href="/">Doggo Dash</Link>
        <Link href="/search">Search</Link>
        <Link href="/messages">Messages</Link> 
        <Link href="/userProfile">User Profile</Link>
        <Link href="/petProfile">Pet Profile</Link>
        <button> Log Out</button>
 </nav> */}

</div>
  );
}
 

