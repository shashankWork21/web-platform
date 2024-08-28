import Image from "next/image";
import Link from "next/link";
import HeaderAuth from "../auth/header-auth";

export default function Header() {
  return (
    <div className="h-32 w-full flex flex-row justify-between items-center bg-stone-white-3 border-b-2 border-stone-white-4">
      <Link href="/">
        <Image
          className="ml-10 cursor-pointer hover:scale-110 transition-all duration-300"
          src="/Smart_Logo.svg"
          alt="SmartAlgorhythm logo"
          width={100}
          height={73.29}
        />
      </Link>
      <HeaderAuth />
    </div>
  );
}
