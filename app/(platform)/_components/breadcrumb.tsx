'use client';

import { usePathname } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useState } from 'react';
import { HomeIcon } from 'lucide-react';

export function BreadcrumbComponent() {
  const pathArray = usePathname().split('/').filter(Boolean);

  const [matchUrl] = useState([
    {
      url: 'vd-images',
      name: '모든 이미지',
    },
    {
      url: 'VDI',
      name: 'VDI Workspace',
    },
    {
      url: 'policies',
      name: '데이터 보존 정책',
    },
  ]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <HomeIcon className="h-4 w-4" />
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {pathArray.map((path, idx) => {
          const isLast = idx === pathArray.length - 1;
          const title = matchUrl.find(itm => itm.url === path)?.name;
          return (
            <BreadcrumbItem key={path}>
              <BreadcrumbLink href={`/${path}`}>{title || path}</BreadcrumbLink>
              {!isLast && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
