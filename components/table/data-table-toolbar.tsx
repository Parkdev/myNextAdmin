'use client';

import { Table } from '@tanstack/react-table';

import { Input } from '@/components/ui/input';
import { DataTableViewOptions } from './data-table-view-options';

import { CreateImage } from './data-table-create-image';
import { DeleteImage } from './data-table-delete-Image';
import { CreateVersion } from './data-table-create-version';
import { Button } from '@/components/ui/button';
import {
  useImageStore,
  useVDIStore,
  useVersionStore,
} from '@/store/table-popup-store';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  btnText: string;
}

export function DataTableToolbar<TData>({
  table,
  btnText,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  // 조건부 변수 설정
  let setMod: any, update: any;
  let searchOption = 'title';

  if (btnText === '이미지') {
    ({ setMod, update } = useImageStore(state => state));
  }
  if (btnText === '버전') {
    ({ setMod, update } = useVersionStore(state => state));
  }
  if (btnText === 'VDI Workspace') {
    ({ setMod, update } = useVDIStore(state => state));
    searchOption = 'name';
  }

  function CreateClickEvent() {
    setMod(false);
    update();
  }

  return (
    <div className="flex flex-col gap-y-3">
      <div className="flex items-center space-x-2">
        <Button size="sm" onClick={CreateClickEvent}>
          + 새 {btnText} 생성
        </Button>
        <DeleteImage btnText={btnText} table={table} />
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
