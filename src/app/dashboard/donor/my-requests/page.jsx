// 'use client'
// import ProfilePage from '@/components/dashboard/ProfilePage';
// import { useSession } from '@/lib/auth-client';
// import React from 'react';

// const DonorMyRequestsPage = () => {
//     const { data: session, isPending } = useSession();
//     const user = session?.user;
//     console.log(user, isPending);
//     return (
//         <div>
//             <h2 className='text-xl text-red-500 font-bold mt-0 mr-0 text-right uppercase'>
//                 {user?.role}
//             </h2>
//         </div>
//     );
// };

// export default DonorMyRequestsPage;


'use client';

import React from 'react';
import { useSession } from '@/lib/auth-client';
// import MyDonationRequests from './MyDonationRequests';

const MyDonationRequestsPage = () => {
     const { data: session, isPending } = useSession();
    const user = session?.user;
    console.log(user, isPending);
  return (
    <div className="min-h-screen ">
         <h2 className='text-xl text-red-500 font-bold mt-0 mr-0 text-right uppercase'>
                 {user?.role}
           </h2>
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-zinc-100 md:text-4xl">
              My All <span className="text-red-500">Donation Requests</span>
            </h1>
            <p className="text-lg mt-2 text-white">
              Manage and track your blood donation posts.
            </p>
          </div>
        </div>

        {/* Reusable Component */}
        {/* <MyDonationRequests /> */}
      </div>
    </div>
  );
};

export default MyDonationRequestsPage;