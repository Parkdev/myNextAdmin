'use client';

import { usePathname, useRouter } from 'next/navigation';

import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';

import { Notebook } from 'lucide-react';
import { MyBoard } from './sidebar';
import { useState } from 'react';
import { Item } from '@radix-ui/react-dropdown-menu';

interface NavItemProps {
  mainId: string;
  idx: number;
  name: string;
  isExpanded: boolean;
  onExpand: (id: string) => void;
}

type subCate = {
  id: string;
  menus: subMenu[];
};

type subMenu = {
  id: string;
  name: string;
  url: string;
  current: boolean;
};

export const NavItem = ({
  isExpanded,
  mainId,
  idx,
  name,
  onExpand,
}: NavItemProps) => {
  // 임시 카테고리 아이템
  const [subCate, setSubCate] = useState<subCate[]>([
    {
      id: '1',
      menus: [
        { id: '1', name: '모든 이미지', url: '/vd-images', current: false },
        { id: '2', name: '삭제된 이미지', url: '/deleted', current: false },
      ],
    },
    {
      id: '2',
      menus: [
        {
          id: '1',
          name: '모든 워크스페이스',
          url: '/workSpaces',
          current: false,
        },
        {
          id: '2',
          name: '삭제된 워크스페이스',
          url: '/deletedSpaces',
          current: false,
        },
        {
          id: '3',
          name: '업무시간 관리',
          url: '/deletedSpaces',
          current: false,
        },
      ],
    },
    {
      id: '3',
      menus: [
        { id: '1', name: '모든 정책', url: '/allPolicies', current: false },
      ],
    },
  ]);
  const router = useRouter();
  const pathname = '/' + usePathname().split('/')[1];

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <>
      <AccordionItem value={mainId} className="border-none">
        <AccordionTrigger
          onClick={() => onExpand(mainId)}
          className={`${subCate[idx].menus.some(itm => itm.url === pathname) && !isExpanded && 'bg-sky-500/10 text-sky-700'} flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline `}
        >
          <div className="flex items-center gap-x-3">
            <div className="bg-gray-500 rounded-lg p-2 relative">
              <Notebook className={`h-4 w-4 text-white`} />
            </div>
            <span>{name}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent className="pt-1 text-neutral-700">
          {subCate[idx].menus.map((sub, idx) => (
            <Button
              key={idx}
              size="sm"
              onClick={() => onClick(sub.url)}
              className={`w-full font-normal justify-start pl-10 mb-1 " ${pathname === sub.url && 'bg-sky-500/10 text-sky-700'}`}
              variant="ghost"
            >
              {sub.name}
            </Button>
          ))}
        </AccordionContent>
      </AccordionItem>
    </>
  );
};
