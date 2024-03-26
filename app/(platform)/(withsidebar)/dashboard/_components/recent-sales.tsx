'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Laptop } from 'lucide-react';
import { useState } from 'react';

export function RecentSales() {
  //임시 데이터
  const [data] = useState(['Device 1', 'Device2', 'Device3']);
  return (
    <div className="space-y-8">
      {data.map(device => (
        <div className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage
              src="/avatars/laptop.svg"
              className="h-5 w-5 m-auto"
            ></AvatarImage>
            <AvatarFallback>DV</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{device}</p>
            <p className="text-sm text-muted-foreground">Description</p>
          </div>
          <div className="ml-auto font-medium">123</div>
        </div>
      ))}
    </div>
  );
}
