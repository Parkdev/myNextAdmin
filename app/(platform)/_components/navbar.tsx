import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '@/app/(auth)/api/auth/[...nextauth]/options';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { NavProfile } from './nav-profile';

export const Navbar = async () => {
  const session = await getServerSession(nextAuthOptions);

  return (
    <div className="sticky z-50 top-0 h-14 px-8 border-b w-full bg-white flex items-center">
      <div className="max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="flex items-center">
          {session ? (
            <NavProfile />
          ) : (
            <Button size="sm" asChild>
              <Link href={`/api/auth/signin`}>로그인</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
