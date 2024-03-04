import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:opacity-75 transition items-center gap-x-2 hidden md:flex">
        <Image 
          src="/next.svg" 
          alt="Logo"
          height={30}
          width={80}/>
      </div>
      <p className="text-lg text-neutral-700 uppercase"></p>
    </Link>
  );
};