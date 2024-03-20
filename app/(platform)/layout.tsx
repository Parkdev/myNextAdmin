import { Navbar } from './_components/navbar';
import { Toaster } from '@/components/ui/toaster';

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      <main className="py-10 px-4 mx-auto">
        <div className="flex gap-x-7">{children}</div>
      </main>
      <Toaster />
    </div>
  );
};

export default PlatformLayout;
