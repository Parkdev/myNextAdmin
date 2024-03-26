'use client';

import { Table } from '@tanstack/react-table';

import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';

import { DeleteImage } from './data-table-delete-Image';
import { Button } from '@/components/ui/button';
import { useSidePopStore } from '@/store/table-popup-store';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  subject: string;
}

export function DataTableToolbar<TData>({
  table,
  subject,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  // 조건부 변수 설정
  const { setMod, update } = useSidePopStore(state => state);
  let searchOption = 'title';

  function CreateClickEvent() {
    setMod(false);
    update();
  }

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center space-x-2">
        <Button size="sm" onClick={CreateClickEvent}>
          + 새 {subject} 생성
        </Button>
        <DeleteImage subject={subject} table={table} />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="검색"
            value={table.getColumn(searchOption)?.getFilterValue() as string}
            onChange={event =>
              table.getColumn(searchOption)?.setFilterValue(event.target.value)
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
