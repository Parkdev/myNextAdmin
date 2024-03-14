import { z } from 'zod';

import { options } from '../../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

import { promises as fs } from 'fs';
import path from 'path';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { taskSchema } from './_components/data/schema';

async function getTasks() {
  const data = await fs.readFile(
    path.join(
      process.cwd(),
      'app/(platform)/vd-images/_components/data/tasks.json',
    ),
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

const VdImagesPage = async () => {
  const tasks = await getTasks();
  const session = await getServerSession(options);

  return (
    <>
      {session ? (
        <>
          <h1 className="text-2xl font-bold">모든 이미지</h1>
          <DataTable data={tasks} columns={columns} />
        </>
      ) : (
        <div>You are not logged in</div>
      )}
    </>
  );
};

export default VdImagesPage;
