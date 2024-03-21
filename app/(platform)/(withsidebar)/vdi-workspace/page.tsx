import { z } from 'zod';

import { nextAuthOptions } from '@/app/(auth)/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

import { promises as fs } from 'fs';
import path from 'path';
import { columns } from './_components/columns';
import { DataTable } from '@/components/table/data-table';
import { VdImagesSchema } from './_components/data/schema';

async function getData() {
  const data = await fs.readFile(
    path.join(
      process.cwd(),
      'app/(platform)/(withsidebar)/vd-images/_components/data/imgList.json',
    ),
  );

  const imgData = JSON.parse(data.toString());

  return z.array(VdImagesSchema).parse(imgData);
}

const VdImagesPage = async () => {
  const imgData = await getData();
  const session = await getServerSession(nextAuthOptions);
  const title = '이미지';
  return (
    <>
      {session ? (
        <>
          <h1 className="text-2xl font-bold">모든 {title}</h1>
          <DataTable
            title={title}
            data={imgData}
            columns={columns}
            url={{ url_id: 'title', url: '' }}
          />
        </>
      ) : (
        <div>You are not logged in</div>
      )}
    </>
  );
};

export default VdImagesPage;
