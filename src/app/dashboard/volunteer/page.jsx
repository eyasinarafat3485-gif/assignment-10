// 'use client'
// import { useSession } from '@/lib/auth-client';
// import React from 'react';

// const VolunteerHomePage = () => {
//     const {data: session, isPending} = useSession();
//     const user = session?.user;
//     console.log(user, isPending);
//     return (
//         <div className='ml-5'>
//              <h2 className='text-xl text-red-500 font-bold mt-0 mr-0 text-right uppercase'>
//                 {user?.role}
//             </h2>
//              <h1 className='text-2xl md:text-5xl font-bold text-white'>
//                 Welcome, <span className='text-red-500'>
//                     {user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : ''}
//                 </span>!
//             </h1>
//             <p className='text-lg mt-2'>A single blood donation can save up to three lives.</p>
//         </div>
//     );
// };

// export default VolunteerHomePage;


'use client';

import React from 'react';
import { useSession } from '@/lib/auth-client';
import Link from 'next/link';
import RecentDonationRequests from '@/components/dashboard/RecentDonationRequests';

const VolunteerHomePage = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;
    const currentUserId = user?.id || user?._id || user?.userId;

    return (
        <div className="ml-5 space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-xl text-red-500 font-bold mt-0 mr-0 text-right uppercase">
                    {user?.role || 'VOLUNTEER'}
                </h2>
                <h1 className="text-2xl md:text-5xl font-bold text-white">
                    Hello, <span className="text-red-500">
                        {user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : 'Volunteer'}
                    </span>!
                </h1>
                <p className="text-lg text-gray-300 mt-2">
                    Manage your activities and help save lives today.
                </p>
            </div>

            {/* Recent Activity / Requests Section */}
            {!isPending && currentUserId && (
                <RecentDonationRequests userId={currentUserId} role={user?.role} />
            )}

            {/* View All Button */}
            <div className="flex justify-center pt-6">
                <Link 
                    href="/dashboard/volunteer/my-requests"  // Change path if your volunteer page is different
                    className="bg-white text-black font-semibold px-12 py-4 rounded-2xl hover:bg-gray-100 transition-all active:scale-95"
                >
                    VIEW ALL REQUESTS
                </Link>
            </div>
        </div>
    );
};

export default VolunteerHomePage;