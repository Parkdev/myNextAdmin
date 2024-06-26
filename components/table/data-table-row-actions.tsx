'use client';

import { MoreHorizontalIcon } from 'lucide-react';
import { Row } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { DialogTrigger } from '@/components/ui/dialog';
import { useSidePopStore } from '@/store/table-popup-store';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  title: string;
}

export function DataTableRowActions<TData>({
  row,
  title,
}: DataTableRowActionsProps<TData>) {
  const { setMod, update } = useSidePopStore(state => state);

  function ModClickEvent() {
    setMod(true);
    update(row.original);
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem className="cursor-pointer" onClick={ModClickEvent}>
          수정
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DialogTrigger asChild>
          <DropdownMenuItem className="cursor-pointer">삭제</DropdownMenuItem>
        </DialogTrigger>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
