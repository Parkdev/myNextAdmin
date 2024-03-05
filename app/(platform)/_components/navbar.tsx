import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export const Navbar = async () => {
  const session = await getServerSession(options);

  return (
    <div className="fixed top-0 w-full h-14 px-4 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          {session ? (
            <Button size="sm" variant="outline" asChild>
              <Link href="/api/auth/signout?callbackUrl=/dashboard">
                로그아웃
              </Link>
            </Button>
          ) : (
            <Button size="sm" asChild>
              <Link href="/api/auth/signin?callbackUrl=/dashboard">로그인</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
