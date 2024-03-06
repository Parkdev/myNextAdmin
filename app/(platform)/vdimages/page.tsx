import { options } from '../../api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
// import { redirect } from "next/navigation";

import { Medal } from 'lucide-react';
import { ImageTable } from './_components/image-table';

const ImagesPage = async () => {
  const session = await getServerSession(options);
  return (
    <>
      {session ? (
        <div className="flex items-center justify-center flex-col">
          <div className="flex items-center justify-center flex-col">
            <ImageTable />
          </div>
        </div>
      ) : (
        <div>You are not logged in</div>
      )}
    </>
  );
};

export default ImagesPage;
