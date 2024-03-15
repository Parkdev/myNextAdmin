import { z } from 'zod';

import { nextAuthOptions } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

import { promises as fs } from 'fs';
import path from 'path';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { imgDetailSchema } from './_components/data/schema';

async function getData() {
  const data = await fs.readFile(
    path.join(
      process.cwd(),
      'app/(platform)/vd-images/[detail]/_components/data/imgdetail.json',
    ),
  );

  const details = JSON.parse(data.toString());

  return z.array(imgDetailSchema).parse(details);
}

const VdImagesPage = async () => {
  const details = await getData();
  const session = await getServerSession(nextAuthOptions);

  return (
    <>
      {session ? (
        <>
          <h1 className="text-2xl font-bold">이미지 상세</h1>
          <DataTable data={details} columns={columns} />
        </>
      ) : (
        <div>You are not logged in</div>
      )}
    </>
  );
};

export default VdImagesPage;
