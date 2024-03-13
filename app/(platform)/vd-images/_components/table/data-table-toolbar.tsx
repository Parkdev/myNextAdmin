'use client';

import { X } from 'lucide-react';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';

import { priorities, statuses } from '../data/data';
import { DataTableFacetedFilter } from './data-table-faceted-filter';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="타이틀 검색"
          value={
            ((table.getColumn('title')?.getFilterValue() as string) ||
              (table.getColumn('id')?.getFilterValue() as string)) ??
            ''
          }
          onChange={event =>
            table.getColumn('title')?.setFilterValue(event.target.value)
          }
          className="h-8 w-[300px] lg:w-[500px]"
        />
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
