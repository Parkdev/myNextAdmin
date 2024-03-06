'use client';

import { usePathname, useRouter } from 'next/navigation';

import Link from 'next/link';
import { Notebook, Plus } from 'lucide-react';
import { useLocalStorage } from 'usehooks-ts';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useState } from 'react';

import { NavItem } from './nav-item';

interface SidebarProps {
  storageKey?: string;
}

export const Sidebar = ({ storageKey = 'd-sidebar-state' }: SidebarProps) => {
  //임시 대시보드
  type subCate = {
    id: number;
    name: string;
    url: string;
    current: boolean;
  };
  type MyBoard = {
    id: number;
    name: string;
    url: string;
    subCate: subCate[];
    current: boolean;
    icon: any;
  };
  const [boards, setBoards] = useState<MyBoard[]>([
    {
      id: 1,
      name: '이미지 관리',
      url: '/Image',
      subCate: [
        { id: 1, name: '모든 이미지', url: '/vdimages', current: true },
        { id: 2, name: '삭제된 이미지', url: '/deleted', current: false },
      ],
      current: false,
      icon: null,
    },
    {
      id: 2,
      name: 'VDI Workspace',
      url: '/VDI',
      subCate: [
        {
          id: 1,
          name: '모든 워크스페이스',
          url: '/workSpaces',
          current: false,
        },
        {
          id: 2,
          name: '삭제된 워크스페이스',
          url: '/deletedSpaces',
          current: false,
        },
        { id: 3, name: '업무시간 관리', url: '/deletedSpaces', current: false },
      ],
      current: false,
      icon: null,
    },
    {
      id: 3,
      name: '데이터 보존 정책',
      url: '/policies',
      subCate: [
        { id: 1, name: '모든 정책', url: '/allPolicies', current: false },
      ],
      current: false,
      icon: null,
    },
  ]);

  const router = useRouter();
  const pathname = usePathname();

  //   const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
  //     storageKey,
  //     {},
  //   );

  //   const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
  //     (acc: string[], key: string) => {
  //       if (expanded[key]) {
  //         acc.push(key);
  //       }

  //       return acc;
  //     },
  //     [],
  //   );

  //   const onExpand = (id: string) => {
  //     setExpanded((curr) => ({
  //       ...curr,
  //       [id]: !expanded[id],
  //     }));
  //   };

  //   if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
  //     return (
  //       <>
  //         <Skeleton />
  //       </>
  //     );
  //   }

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <>
      <div className="font-bold text-xs flex items-center mb-1">
        <span className="pl-4">Menus</span>
        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
        >
          <Link href="/dashboard">
            <Plus className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <Accordion type="multiple" className="space-y-2">
        {boards.map(board => (
          <AccordionItem value={board.url} className="border-none">
            <AccordionTrigger
              className={`${board.current ? 'bg-sky-500/10 text-sky-700' : ''} flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline`}
            >
              <div className="flex items-center gap-x-3">
                <div className="bg-blue-500 rounded-lg p-2 relative">
                  <Notebook className="h-4 w-4 text-white" />
                </div>
                <span>{board.name}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-1 text-neutral-700">
              {board.subCate.map((sub, idx) => (
                <Button
                  key={idx}
                  size="sm"
                  onClick={() => onClick(sub.url)}
                  className={`w-full font-normal justify-start pl-10 mb-1 " ${sub.current && 'bg-sky-500/10 text-sky-700'}`}
                  variant="ghost"
                >
                  {sub.name}
                </Button>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};
