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
// import { Task } from '@/app/(platform)/vd-images/_components/data/schema';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
  Schema: any;
}

export function DataTableRowActions<TData>({
  row,
  Schema,
}: DataTableRowActionsProps<TData>) {
  const task = Schema.parse(row.original);

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
        <DropdownMenuItem>
          <Button size="sm" variant="ghost" className="h-auto p-0">
            수정
          </Button>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <DialogTrigger asChild>
            <Button size="sm" variant="ghost" className="h-auto p-0">
              삭제
            </Button>
          </DialogTrigger>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
