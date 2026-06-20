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

// 'use client';

// import React, { useEffect, useState } from 'react';
// import { useSession } from '@/lib/auth-client';
// import { getMyBloodRequests } from '@/lib/api/allBloodRequest';
// // import { getMyBloodRequests } from '../services/bloodRequests'; // আপনার সঠিক ফাইল পাথটি এখানে দিন

// const MyDonationRequestsPage = () => {
//   const { data: session, isPending } = useSession();
//   const user = session?.user;

//   // ডাটা এবং লোডিং স্টেট
//   const [requests, setRequests] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // যখন সেশন লোডিং শেষ হবে এবং ইউজার অবজেক্ট পাওয়া যাবে
//     if (!isPending && user?.id) {
//       setIsLoading(true);
//       // এখানে user.id ব্যবহার করা হয়েছে (আপনার সেশনে যদি _id বা userId থাকে তবে সেটা লিখবেন)
//       getMyBloodRequests(user.id)
//         .then((data) => {
//           // যদি ডাটা সিঙ্গেল অবজেক্ট না হয়ে অ্যারে হয়, তবে সেভ করবে
//           setRequests(Array.isArray(data) ? data : []);
//           setIsLoading(false);
//         })
//         .catch((err) => {
//           console.error("Error fetching requests:", err);
//           setIsLoading(false);
//         });
//     }
//   }, [user, isPending]);

//   return (
//     <div className="min-h-screen text-zinc-100">
//       {/* User Role Display */}
//       <h2 className='text-xl text-red-500 font-bold mt-4 mr-4 text-right uppercase'>
//         {user?.role || 'Guest'}
//       </h2>

//       <div className="mx-auto max-w-6xl px-4 py-10 md:px-8">
//         {/* Header Section */}
//         <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-black tracking-tight text-zinc-100 md:text-4xl">
//               My All <span className="text-red-500">Donation Requests</span>
//             </h1>
//             <p className="text-lg mt-2 text-zinc-400">
//               Manage and track your blood donation posts.
//             </p>
//           </div>
//         </div>

//         {/* --- Table Section --- */}
//         <div className="mt-8 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
//           {isPending || isLoading ? (
//             // লোডিং অবস্থা
//             <div className="p-10 text-center text-zinc-400">
//               <span className="loading loading-spinner loading-md mb-2 block mx-auto text-red-500"></span>
//               Loading your blood requests...
//             </div>
//           ) : requests.length === 0 ? (
//             // যদি কোনো রিকোয়েস্ট না থাকে
//             <div className="p-10 text-center text-zinc-400">
//               No blood donation requests found.
//             </div>
//           ) : (
//             // ডাইনামিক টেবিল
//             <table className="w-full text-left border-collapse text-sm">
//               <thead>
//                 <tr className="border-b border-zinc-800 bg-zinc-900 text-zinc-400 uppercase font-semibold">
//                   <th className="p-4">Recipient</th>
//                   <th className="p-4">Blood Group</th>
//                   <th className="p-4">Location</th>
//                   <th className="p-4">Date & Time</th>
//                   <th className="p-4">Status</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-zinc-800">
//                 {requests.map((request) => (
//                   <tr key={request._id} className="hover:bg-zinc-800/30 transition-colors">
//                     {/* রিসিভেন্ট এর নাম ও হাসপাতালের নাম */}
//                     <td className="p-4">
//                       <div className="font-bold text-zinc-200">{request.recipientName}</div>
//                       <div className="text-xs text-zinc-500">{request.hospitalName}</div>
//                     </td>
//                     {/* ব্লাড গ্রুপ */}
//                     <td className="p-4">
//                       <span className="inline-block px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 font-bold">
//                         {request.bloodGroup}
//                       </span>
//                     </td>
//                     {/* লোকেশন বা ঠিকানা */}
//                     <td className="p-4">
//                       <div className="text-zinc-300">{request.upazila}, {request.district}</div>
//                       <div className="text-xs text-zinc-500">{request.division}</div>
//                     </td>
//                     {/* তারিখ এবং সময় */}
//                     <td className="p-4">
//                       <div className="text-zinc-300">{request.requiredDate}</div>
//                       <div className="text-xs text-zinc-500">{request.requiredTime}</div>
//                     </td>
//                     {/* স্ট্যাটাস */}
//                     <td className="p-4">
//                       <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
//                         request.status === 'Pending' 
//                           ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
//                           : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
//                       }`}>
//                         {request.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//         {/* --- Table Section End --- */}

//       </div>
//     </div>
//   );
// };

// export default MyDonationRequestsPage;



'use client';

import React from 'react';
import { useSession } from '@/lib/auth-client';
import MyDonationRequestsTable from '@/components/dashboard/MyDonationRequestsTable';
// import MyDonationRequestsTable from '@/components/MyDonationRequestsTable'; // সঠিক পাথ দিন

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