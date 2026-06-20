
// 'use client';

// import React from 'react';
// import { useSession } from '@/lib/auth-client';
// // import MyDonationRequests from './MyDonationRequests';

// const MyDonationRequestsPage = () => {
//      const { data: session, isPending } = useSession();
//     const user = session?.user;
//     console.log(user, isPending);
//   return (
//     <div className="min-h-screen ">
//          <h2 className='text-xl text-red-500 font-bold mt-0 mr-0 text-right uppercase'>
//                  {user?.role}
//            </h2>
//       <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
//         <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-black tracking-tight text-zinc-100 md:text-4xl">
//               My All <span className="text-red-500">Donation Requests</span>
//             </h1>
//             <p className="text-lg mt-2 text-white">
//               Manage and track your blood donation posts.
//             </p>
//           </div>
//         </div>

//         {/* Reusable Component */}
//         {/* <MyDonationRequests /> */}
//       </div>
//     </div>
//   );
// };

// export default MyDonationRequestsPage;



'use client';

import React from 'react';
import { useSession } from '@/lib/auth-client';
import MyDonationRequestsTable from '@/components/dashboard/MyDonationRequestsTable';

const DonorMyRequestsPage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const currentUserId = user?.id || user?._id || user?.userId;

  return (
    <div className="min-h-screen text-zinc-100 p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-100 md:text-4xl">
            Donor <span className="text-red-500">Panel</span>
          </h1>
          <p className="text-zinc-400 mt-1">Track your personal blood requests</p>
        </div>
        <span className="px-3 py-1 text-xs font-bold bg-red-500/10 text-red-400 border border-red-500/20 rounded-full uppercase">
          {user?.role || 'donor'}
        </span>
      </div>

      {/* সাবকম্পোনেন্ট কল */}
      {!isPending && currentUserId && (
        <MyDonationRequestsTable userId={currentUserId} role={user?.role} />
      )}
    </div>
  );
};

export default DonorMyRequestsPage;