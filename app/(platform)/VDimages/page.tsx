import { options } from '../../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';

import { promises as fs } from "fs";
import path from 'path';
import { z } from 'zod';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { taskSchema } from './_components/data/schema';

async function getTasks() {
  const data = await fs.readFile(
    path.join(
      process.cwd(),
      'app/(platform)/VDimages/_components/data/tasks.json',
    ),
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

const ImagesPage = async () => {
  const tasks = await getTasks();
  const session = await getServerSession(options);

  return (
    <>
      {session ? (
        <div className="flex items-center justify-center flex-col">
          <div className="flex items-center justify-center flex-col">
            <DataTable data={tasks} columns={columns} />
          </div>
        </div>
      ) : (
        <div>You are not logged in</div>
      )}
    </>
  );
};

export default ImagesPage;
