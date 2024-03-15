import { BreadcrumbComponent } from '../_components/breadcrumb';
import { Sidebar } from '../_components/sidebar';

const VdImageLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="py-10 px-4 mx-auto">
        <div className="flex gap-x-7">
          <div className="w-64 shrink-0 hidden md:block">
            <Sidebar />
          </div>
          <div className="px-4 w-full md:w-3/4 flex flex-col">
            <div className="w-full flex flex-col gap-y-3">
              <BreadcrumbComponent title="" />
              {children}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default VdImageLayout;
