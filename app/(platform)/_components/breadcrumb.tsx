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
import Link from 'next/link';

interface BreadcrumbComponentProps {
  title: string;
}

export function BreadcrumbComponent({ title }: BreadcrumbComponentProps) {
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
          <BreadcrumbLink asChild>
            <Link href="/">
              <HomeIcon className="h-4 w-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {pathArray.map((path, idx) => {
          const isLast = idx === pathArray.length - 1;
          const defaultTitle = matchUrl.find(itm => itm.url === path)?.name;
          const url = '/' + pathArray.slice(0, idx + 1).join('/');
          return (
            <BreadcrumbItem key={path}>
              <BreadcrumbLink asChild>
                <Link href={url}>{defaultTitle || title || path}</Link>
              </BreadcrumbLink>
              {!isLast && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
