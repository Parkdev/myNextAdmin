"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useLocalStorage } from "usehooks-ts";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion } from "@/components/ui/accordion";
import { useState } from "react";

import { NavItem } from "./nav-item";

interface SidebarProps {
  storageKey?: string;
}

export const Sidebar = ({ storageKey = "d-sidebar-state" }: SidebarProps) => {
  //임시 대시보드
  const [boards, setBoards] = useState<Object[]>([
    {
      category: 1,
      name: "대시보드",
      href: "/dashboard",
      current: true,
      icon: null,
    },
    { category: 1, name: "Menu2", href: "#", current: false, icon: null },
    { category: 1, name: "Menu3", href: "#", current: false, icon: null },
    { category: 1, name: "Menu4", href: "#", current: false, icon: null },
    {
      category: 2,
      name: "Menu5",
      href: "#",
      current: false,
      icon: "Calendar",
    },
    {
      category: 2,
      name: "Menu6",
      href: "#",
      current: false,
      icon: "BookmarkSlash",
    },
    {
      category: 2,
      name: "Menu7",
      href: "#",
      current: false,
      icon: "Briefcase",
    },
    {
      category: 2,
      name: "Menu8", // 알람 데이터
      href: "#",
      current: false,
      icon: "BuildingLibrary",
    },
  ]);

  const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
    storageKey,
    {},
  );

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
    setExpanded((curr) => ({
      ...curr,
      [id]: !expanded[id],
    }));
  };

  //   if (!isLoadedOrg || !isLoadedOrgList || userMemberships.isLoading) {
  //     return (
  //       <>
  //         <Skeleton />
  //       </>
  //     );
  //   }

  return (
    <>
      <div className="font-bold text-xs flex items-center mb-1">
        <span className="pl-4">대시보드</span>
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

      <Accordion
        type="multiple"
        defaultAccordionValue={defaultAccordionValue}
        className="space-y-2"
      >
        {boards.map((board, idx) => (
          <NavItem
            key={idx}
            id={idx}
            board={board}
            isExpanded={true}
            onExpand={onExpand}
          ></NavItem>
        ))}
      </Accordion>
    </>
  );
};
