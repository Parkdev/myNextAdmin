'use client';

import { Button } from '@/components/ui/button';

import { Table } from '@tanstack/react-table';

import { useState } from 'react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DeleteImage<TData>({ table }: DataTableToolbarProps<TData>) {
  const [isSelected, setIsSelected] = useState([]);

  return (
    <>
      {/* <Dialog> // 컴포넌트 공유를 위해 data-table에서 설정중*/}
      {!table.getSelectedRowModel().rows.length ? null : (
        <DialogTrigger asChild>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => console.log(table.getSelectedRowModel())}
          >
            - 이미지 삭제
          </Button>
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>삭제 하시겠어요?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <DialogClose asChild>
            <Button type="submit" onClick={() => console.log('삭제로직 진행')}>
              삭제
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              닫기
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
      {/* </Dialog> */}
    </>
  );
}
