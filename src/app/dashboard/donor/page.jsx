'use client';

import RecentDonationRequests from '@/components/dashboard/RecentDonationRequests';
import { useSession } from '@/lib/auth-client';
import Link from 'next/link';
import React from 'react';

const DonorHomePage = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;
    const currentUserId = user?.id || user?._id || user?.userId;

    return (
        <div className="ml-5 space-y-6">
            {/* Header */}
            <div>
                <h2 className="text-xl text-red-500 font-bold mt-0 mr-0 text-right uppercase">
                    {user?.role || 'DONOR'}
                </h2>
                <h1 className="text-2xl md:text-5xl font-bold text-white">
                    Welcome, <span className="text-red-500">
                        {user?.name ? user.name.charAt(0).toUpperCase()+user.name.slice(1):'Donor'}</span>!
                </h1>
                <p className="text-lg text-gray-300 mt-2">
                    Manage your activities and help save lives today.
                </p>
            </div>

            {/* Recent Requests Section */}
            {!isPending && currentUserId && (
                <RecentDonationRequests userId={currentUserId} role={user?.role} />
            )}

            {/* View All Button - Fixed */}
            <div className="flex justify-center pt-6 mb-5">
                <Link 
                    href="/dashboard/donor/my-requests"
                    className="bg-white text-black font-semibold px-12 py-4 rounded-2xl hover:bg-gray-100 transition-all active:scale-95"
                >
                    VIEW ALL REQUESTS
                </Link>
            </div>
        </div>
    );
};

export default DonorHomePage;