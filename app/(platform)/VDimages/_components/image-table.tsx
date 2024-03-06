'use client';
import { useState } from 'react';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const ImageTable = () => {
  type VDImages = {
    id: string;
    count: number;
    displayName: string;
    description?: string;
  };

  const [imgData] = useState<VDImages[]>([
    {
      id: 'm5gr84i9',
      displayName: 'GS 에너지',
      count: 1,
      description: 'GS 에너지',
    },
    {
      id: '3u1reuv4',
      displayName: 'GS 칼텏',
      count: 2,
      description: 'GS 칼텏',
    },
    {
      id: 'derv1ws0',
      displayName: '현대 카드',
      count: 3,
      description: '현대 카드',
    },
    {
      id: '5kma53ae',
      displayName: '현대 캐피탈',
      count: 4,
      description: '현대 캐피탈',
    },
    {
      id: 'bhqecj4p',
      displayName: '한화 생명',
      count: 5,
      description: '한화 생명',
    },
  ]);

  return (
    <>
      <Table className="text-center w-full">
        <TableHeader className="text-center">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>이미지 명</TableHead>
            <TableHead>갯수</TableHead>
            <TableHead className="">설명 </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {imgData.map(item => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.displayName}</TableCell>
              <TableCell>{item.count}</TableCell>
              <TableCell className="text-right">
                {item.description ? item.description : 'N/A'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell colSpan={2} className="">
              {imgData.reduce((sum, item) => sum + item.count, 0)}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
};
