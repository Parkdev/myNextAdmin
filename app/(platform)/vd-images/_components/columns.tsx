'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

import { labels, priorities, statuses } from './data/data';
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
  // {
  //   accessorKey: 'id',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="이미지 코드" />
  //   ),
  //   cell: ({ row }) => <div className="w-[80px]">{row.getValue('id')}</div>,
  //   // enableSorting: false,
  //   enableSorting: false,
  //   enableHiding: false,
  // },
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
      const label = labels.find(label => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {label && <Badge variant="outline">{label.label}</Badge>}
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
      <div className="w-[80px] text-center">{`v. ${row.getValue('version')}`}</div>
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
      <div className="w-[120px] text-center">{`${row.getValue('modified')}`}</div>
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
      <div className="w-[80px] text-center">{`${row.getValue('created')}`}</div>
    ),
  },
  // {
  //   accessorKey: 'status',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="마지막 버전" />
  //   ),
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       status => status.value === row.getValue('status'),
  //     );

  //     // if (!status) {
  //     //   return null;
  //     // }

  //     return (
  //       <div className="flex w-[100px] items-center">
  //         {/* {status.icon && (
  //           <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )} */}
  //         <span>{status.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  // {
  //   accessorKey: 'priority',
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="수정 날짜" />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       priority => priority.value === row.getValue('priority'),
  //     );

  //     if (!priority) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {priority.icon && (
  //           <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
