import { Navbar } from './_components/navbar';
import { Toaster } from '@/components/ui/toaster';

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <Navbar />
      {children}
      <Toaster />
    </div>
  );
};

export default PlatformLayout;
