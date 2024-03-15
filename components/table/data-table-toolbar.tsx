'use client';

import { Table } from '@tanstack/react-table';

import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';

import { CreateImage } from './data-table-create-image';
import { DeleteImage } from './data-table-delete-Image';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  btnText: string;
}

export function DataTableToolbar<TData>({
  table,
  btnText,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center space-x-2">
        <CreateImage btnText={btnText} />
        <DeleteImage table={table} />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="타이틀 검색"
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
