import { options } from "../../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";

import { Medal } from "lucide-react";

const DashboardPage = async () => {
  const session = await getServerSession(options);
  return (
    <>
      {session ? (
        <div className="flex items-center justify-center flex-col">
          <div className="flex items-center justify-center flex-col">
            <div className="flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full">
              <Medal className="pb-1 h-6 w-6 mr-2" />
              <div className="uppercase font-bold">
                Hello {session?.user?.name}
                {JSON.stringify(session, null, 2)}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>You are not logged in</div>
      )}
    </>
  );
};

export default DashboardPage;
