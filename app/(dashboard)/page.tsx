import { Medal } from "lucide-react";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";

const DashboardPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col">
        <div className="flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full">
          <Medal className="pb-1 h-6 w-6 mr-2" />
          <div className="uppercase font-bold">Test</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
