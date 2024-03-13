'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

import { labels } from './data/data';
import { Task } from './data/schema';
import { DataTableColumnHeader } from './table/data-table-column-header';
import { DataTableRowActions } from './table/data-table-row-actions';

export const columns: ColumnDef<Task>[] = [
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
      // const label = labels.find(label => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
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
        className="ml-[2px] justify-center"
      />
    ),
    cell: ({ row }) => <DataTableRowActions row={row} />,
    enableSorting: false,
    enableHiding: false,
  },
];
