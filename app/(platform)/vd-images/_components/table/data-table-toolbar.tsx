'use client';

import { Table } from '@tanstack/react-table';

import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';

import { CreateImage } from './data-table-create-image';
import { DeleteImage } from './data-table-delete-Image';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex gap-x-3">
        <CreateImage />
        <DeleteImage table={table} />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="타이틀 검색"
            value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
            onChange={event =>
              table.getColumn('title')?.setFilterValue(event.target.value)
            }
            className="h-8 w-[300px] lg:w-[500px]"
          />
        </div>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
