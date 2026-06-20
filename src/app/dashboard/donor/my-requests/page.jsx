'use client';

import React from 'react';
import { useSession } from '@/lib/auth-client';
import MyDonationRequestsTable from '@/components/dashboard/MyDonationRequestsTable';

const DonorMyRequestsPage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const currentUserId = user?.id || user?._id || user?.userId;

  return (
    <div className="min-h-screen text-zinc-100 ">
      <h2 className='text-xl text-red-500 font-bold text-right uppercase'>
              {user?.role}
            </h2>
      <div className="flex justify-between items-center p-4 md:p-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-100 md:text-4xl">
            Donor Panel<span className="text-red-500"> All Requests</span>
          </h1>
          <p className="text-white mt-1">Track your personal blood requests</p>
        </div>
      </div>

      {/* সাবকম্পোনেন্ট কল */}
      {!isPending && currentUserId && (
        <MyDonationRequestsTable userId={currentUserId} role={user?.role} />
      )}
    </div>
  );
};

export default DonorMyRequestsPage;