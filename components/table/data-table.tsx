'use client';

import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Dialog } from '@/components/ui/dialog';
import { Sheet } from '@/components/ui/sheet';

import { DataTablePagination } from '@/components/table/data-table-pagination';
import { DataTableToolbar } from '@/components/table/data-table-toolbar';
import { CreateImage } from './data-table-create-image';
import { CreateVersion } from './data-table-create-version';

interface UrlParam {
  url_id: string;
  url: string;
}

interface DataTableProps<TData, TValue> {
  title: string;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  url?: UrlParam;
}

export function DataTable<TData, TValue>({
  title,
  columns,
  data,
  url,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  //팝업 관리
  const [popParam, setPopParam] = useState<string | null>(null);

  const handleClick = (newParam: string | null) => {
    setPopParam(newParam);
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const router = useRouter();
  const pathname = usePathname();

  const clickRoute = (href: string) => {
    router.push(`${pathname}/${href}`);
  };

  return (
    <div className="space-y-4 w-full">
      <Dialog>
        <DataTableToolbar table={table} subject={title} />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map(row => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && 'selected'}
                  >
                    {row.getVisibleCells().map(cell => {
                      let isMatch, customUrl: string;
                      if (url) {
                        isMatch = cell.id.endsWith(url.url_id);
                        customUrl =
                          url.url || (row.original as { id: string }).id;
                      }

                      return (
                        <TableCell
                          key={cell.id}
                          className={isMatch ? 'cursor-pointer' : ''}
                          onClick={
                            isMatch ? () => clickRoute(customUrl) : undefined
                          }
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Dialog>
      <DataTablePagination table={table} />
    </div>
  );
}
