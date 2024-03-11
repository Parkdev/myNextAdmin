// import { Sidebar } from '../_components/sidebar';

const SubscribeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-screen py-20 md:py-24 px-4 mx-auto">{children}</main>
  );
};

export default SubscribeLayout;

// const VdimageLayout = ({ children }: { children: React.ReactNode }) => {
//   return (
//     <>
//       <main className="py-20 md:py-24 px-4 mx-auto">
//         <div className="flex gap-x-7">
//           <div className="w-64 shrink-0 hidden md:block">
//             <Sidebar />
//           </div>
//           {children}
//         </div>
//       </main>
//     </>
//   );
// };

// export default VdimageLayout;
