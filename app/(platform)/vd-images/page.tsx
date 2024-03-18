import { z } from 'zod';

import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

import { promises as fs } from 'fs';
import path from 'path';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { VdImagesSchema } from './_components/data/schema';

async function getData() {
  const data = await fs.readFile(
    path.join(
      process.cwd(),
      'app/(platform)/vd-images/_components/data/imgList.json',
    ),
  );

  const imgData = JSON.parse(data.toString());

  return z.array(VdImagesSchema).parse(imgData);
}

const VdImagesPage = async () => {
  const imgData = await getData();
  const session = await getServerSession(nextAuthOptions);

  return (
    <>
      {session ? (
        <>
          <h1 className="text-2xl font-bold">모든 이미지</h1>
          <DataTable
            data={imgData}
            columns={columns}
            url={{ url_id: 'version', url: '/test2' }}
          />
        </>
      ) : (
        <div>You are not logged in</div>
      )}
    </>
  );
};

export default VdImagesPage;
