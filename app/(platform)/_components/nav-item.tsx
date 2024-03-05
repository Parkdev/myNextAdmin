"use client";

import { AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import internal from "stream";

import { Notebook } from "lucide-react";

interface NavItemProps {
  isExpanded: boolean;
  id: number;
  board: string;
  onExpand: (id: string) => void;
}

export const NavItem = ({ isExpanded, id, board, onExpand }: NavItemProps) => {
  return (
    <>
      <AccordionItem value={id} className="border-none">
        <AccordionTrigger
          onClick={() => onExpand(board)}
          className={`flex items-center gap-x-2 p-1.5 text-neutral-700 rounded-md hover:bg-neutral-500/10 transition text-start no-underline hover:no-underline`}
        >
          <div className="flex items-center gap-x-2">
            <div className="w-7 h-7 relative">
              <Notebook className="h-6 w-6 pt-1 opacity-50" />
            </div>
            <span>{board}</span>
          </div>
        </AccordionTrigger>
      </AccordionItem>
    </>
  );
};
