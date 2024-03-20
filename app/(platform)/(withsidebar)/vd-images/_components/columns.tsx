'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { VdImages } from './data/schema';
import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { DataTableRowActions } from '@/components/table/data-table-row-actions';
import { useRouter, usePathname } from 'next/navigation';
import { VdImagesSchema } from './data/schema';

export const columns: ColumnDef<VdImages>[] = [
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
    accessorKey: 'title',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="이미지 명"
        className="justify-center"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="relative flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue('title')}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'version',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="마지막 버전"
        className="justify-center"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{`v. ${row.getValue('version')}`}</div>
    ),
  },
  {
    accessorKey: 'modified',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="마지막 수정 일자"
        className="justify-center"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{`${row.getValue('modified')}`}</div>
    ),
  },
  {
    accessorKey: 'created',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="생성 일자"
        className="justify-center"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{`${row.getValue('created')}`}</div>
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
        <DataTableRowActions row={row} Schema={VdImagesSchema} />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
