import { Navbar } from './_components/navbar';

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full scroll-p-0">
      <Navbar />
      {children}
    </div>
  );
};

export default PlatformLayout;
