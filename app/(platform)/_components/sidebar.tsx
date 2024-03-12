'use client';

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
import { useEffect, useState } from 'react';
import { NavItem } from './nav-item';

interface SidebarProps {
  storageKey?: string;
}

// 임시 대시보드 type

export type MyBoard = {
  id: string;
  name: string;
  url: string;
  current: boolean;
  icon: any;
};

export const Sidebar = ({ storageKey = 'd-sidebar-state' }: SidebarProps) => {
  //임시 대시보드
  const [boards, setBoards] = useState<MyBoard[]>([
    {
      id: '1',
      name: '이미지 관리',
      url: '/vd-images',
      current: false,
      icon: null,
    },
    {
      id: '2',
      name: 'VDI Workspace',
      url: '/VDI',
      current: false,
      icon: null,
    },
    {
      id: '3',
      name: '데이터 보존 정책',
      url: '/policies',
      current: false,
      icon: null,
    },
  ]);

  // 로컬스토리지 사용하기
  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {},
  );

  // 디폴트 아코디언
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
    (acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key);
      }
      return acc;
    },
    [],
  );

  const onExpand = (id: string) => {
    setExpanded(curr => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  if (!isClient) {
    return (
      <div className="flex flex-col gap-y-3">
        <Skeleton className="h-[40px] w-full rounded-xl" />
        <Skeleton className="h-[40px] w-full rounded-xl" />
        <Skeleton className="h-[40px] w-full rounded-xl" />
      </div>
    );
  }

  return (
    <>
      <Accordion
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {boards.map(board => (
          <NavItem
            key={board.id}
            id={board.url}
            name={board.name}
            isExpanded={expanded[board.id]}
            onExpand={onExpand}
          />
        ))}
      </Accordion>
    </>
  );
};
