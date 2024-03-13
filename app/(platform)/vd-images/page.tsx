import { z } from 'zod';

import { options } from '../../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

import { promises as fs } from 'fs';
import path from 'path';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { taskSchema } from './_components/data/schema';
import { CreateImage } from './_components/createImage';
import { DeleteImage } from './_components/deleteImage';

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
        <div className="px-4 w-full md:w-3/4 flex flex-col">
          <div className="w-full flex flex-col gap-y-3">
            <div className="flex gap-x-3">
              <CreateImage />
              <DeleteImage />
            </div>

            <DataTable data={tasks} columns={columns} />
          </div>
        </div>
      ) : (
        <div>You are not logged in</div>
      )}
    </>
  );
};

export default VdImagesPage;
