import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/Logo.png";

export default function Footer() {
  return (
    <footer className="h-1/3 w-full flex flex-col justify-center items-center p-5 bg-orange-100">
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
      <span className="text-sm">© 2023 All rights reserved</span>
    </footer>
  );
}
