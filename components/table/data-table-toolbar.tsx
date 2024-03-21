'use client';

import { Table } from '@tanstack/react-table';

import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';

import { CreateImage } from './data-table-create-image';
import { DeleteImage } from './data-table-delete-Image';
import { CreateVersion } from './data-table-create-version';
import { Button } from '@/components/ui/button';
import { useImageStore, useVersionStore } from '@/store/table-popup-store';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  btnText: string;
}

export function DataTableToolbar<TData>({
  table,
  btnText,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const { setMod, update } =
    btnText === '이미지'
      ? useImageStore(state => state)
      : useVersionStore(state => state);

  function CreateClickEvent() {
    setMod(false);
    update();
  }

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center space-x-2">
        <Button size="sm" onClick={CreateClickEvent}>
          + 새 {btnText} 생성
        </Button>
        <DeleteImage btnText={btnText} table={table} />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="이름 검색"
            value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
            onChange={event =>
              table.getColumn('title')?.setFilterValue(event.target.value)
            }
            className="h-9 w-[300px] lg:w-[500px]"
          />
        </div>
        <div className="flex items-center space-x-2">
          <DataTableViewOptions table={table} />
        </div>
      </div>
    </div>
  );
}
