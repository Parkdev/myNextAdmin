import { Sidebar } from '../_components/sidebar';

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="w-64 shrink-0 hidden md:block">
        <Sidebar />
      </div>
      {children}
    </>
  );
};

export default PlatformLayout;
