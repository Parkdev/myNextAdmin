import { z } from 'zod';

import { nextAuthOptions } from '@/app/(auth)/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

import { promises as fs } from 'fs';
import path from 'path';
import { columns } from './_components/columns';
import { DataTable } from '@/components/table/data-table';
import { title, VdiListSchema } from './_components/data/schema';
import { CreateVDI } from './_components/data-table-create-VDI';

async function getData() {
  const data = await fs.readFile(
    path.join(
      process.cwd(),
      'app/(platform)/(withsidebar)/vdi-workspace/_components/data/list.json',
    ),
  );

  const listData = JSON.parse(data.toString());

  return z.array(VdiListSchema).parse(listData);
}

const VdiListPage = async () => {
  const listData = await getData();
  const session = await getServerSession(nextAuthOptions);

  return (
    <>
      {session ? (
        <>
          <h1 className="text-2xl font-bold">모든 {title}</h1>
          <DataTable
            title={title}
            data={listData}
            columns={columns}
            url={{ url_id: '', url: '' }}
          />
          <CreateVDI subject={title} />,
        </>
      ) : (
        <div>You are not logged in</div>
      )}
    </>
  );
};

export default VdiListPage;
