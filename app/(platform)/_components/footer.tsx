import Link from "next/link";

import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full px-4 border-t bg-slate-100 font-bold">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />
        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full">
          <Button size="sm" variant="ghost">
            개인정보처리방침
          </Button>
          <Button size="sm" variant="ghost">
            서비스 약관
          </Button>
        </div>
      </div>
    </div>
  );
};
