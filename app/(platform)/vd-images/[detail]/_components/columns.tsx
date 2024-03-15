'use client';

import { ColumnDef } from '@tanstack/react-table';

import { Checkbox } from '@/components/ui/checkbox';

import { ImgDetail, imgDetailSchema } from './data/schema';
import { DataTableColumnHeader } from '@/components/table/data-table-column-header';
import { DataTableRowActions } from '@/components/table/data-table-row-actions';

function MatchStatus(status: number) {
  switch (status) {
    case 1:
      return '버전 만들기 완료';
    case 2:
      return '이미지 만드는 중';
    case 3:
      return 'VM 준비 중';
    default:
      return '비할당';
  }
}

export const columns: ColumnDef<ImgDetail>[] = [
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
    accessorKey: 'version',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="이미지 버전"
        className="justify-center"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{`v. ${row.getValue('version')}`}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'description',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="설명"
        className="justify-center"
      />
    ),
    cell: ({ row }) => {
      return (
        <div className="relative flex space-x-2">
          <span className="max-w-[300px] truncate font-medium">
            {row.getValue('description')}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="상태"
        className="justify-center"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{`${MatchStatus(row.getValue('status'))}`}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'defaultImg',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="사용된 기본 이미지"
        className="justify-center"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{`${row.getValue('defaultImg')}`}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'isModifiedImg',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="커스텀"
        className="justify-center"
      />
    ),
    cell: ({ row }) => (
      <div className="text-center">{`${row.getValue('isModifiedImg') ? 'T' : 'F'}`}</div>
    ),
    enableSorting: false,
    enableHiding: false,
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
    enableSorting: false,
    enableHiding: false,
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
    enableSorting: false,
    enableHiding: false,
  },
];
