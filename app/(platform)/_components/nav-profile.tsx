'use client';

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from 'lucide-react';

export const NavProfile = () => {
  const { data: session } = useSession({
    required: true,
  });
  const pathname = usePathname();

  const [menuItem] = useState(['Profile', 'Billing', 'Settings']);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-8 w-8 rounded-full focus-visible:ring-0 focus-visible:ring-offset-0"
          >
            <Avatar className="h-9 w-9">
              <AvatarImage src={session?.user?.image!} alt="images" />
              <AvatarFallback className="bg-none">
                {session?.user?.name![0]}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session?.user?.name!}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session?.user?.email!}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {menuItem.map(item => (
              <DropdownMenuItem className="cursor-pointer">
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <Link href={`/api/auth/signout?callbackUrl=${pathname}`}>
            <DropdownMenuItem className="cursor-pointer">
              로그아웃
            </DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
