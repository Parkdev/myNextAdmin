'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { title, VdiList } from './data/schema';
import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { DataTableRowActions } from '@/components/table/data-table-row-actions';
import { useRouter, usePathname } from 'next/navigation';

export const columns: ColumnDef<VdiList>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="워크스페이스"
        className="justify-center"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="relative flex space-x-2 justify-center">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('name')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="유형"
        className="justify-center"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{`${row.getValue('category')}`}</div>
    ),
  },
  {
    accessorKey: 'sessionCount',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="전체 세션 수"
        className="justify-center"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{`${row.getValue('sessionCount')}`}</div>
    ),
  },
  {
    accessorKey: 'loadBalance',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="부하 분산 유형"
        className="justify-center"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{`${row.getValue('loadBalance')}`}</div>
    ),
  },
  {
    id: 'actions',
    accessorKey: 'action',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="설정"
        className="justify-center"
      />
    ),

    cell: ({ row }) => (
      <div className="flex justify-center">
        <DataTableRowActions row={row} title={title} />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
