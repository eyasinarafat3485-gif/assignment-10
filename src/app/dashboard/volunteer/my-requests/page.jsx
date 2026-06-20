'use client';

import React from 'react';
import { useSession } from '@/lib/auth-client';
import MyDonationRequestsTable from '@/components/dashboard/MyDonationRequestsTable';

const VolunteerMyRequestsPage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  
  // ডাইনামিক আইডি হ্যান্ডলিং (id, _id, বা userId যা-ই সেশনে থাকুক)
  const currentUserId = user?.id || user?._id || user?.userId;

  return (
    <div className="min-h-screen text-zinc-100 p-4 md:p-8">
      {/* Top Header & Role Badge */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-zinc-100 md:text-4xl">
            My All <span className="text-red-500">Donation Requests</span>
          </h1>
          <p className="text-lg mt-2 text-zinc-400">
            Manage and track your blood donation posts as a volunteer.
          </p>
        </div>
        <h2 className="text-xl text-red-500 font-bold uppercase tracking-wider">
          {user?.role || 'Volunteer'}
        </h2>
      </div>

      {/* সাবকম্পোনেন্ট কল — যখন সেশন লোডিং শেষ হবে এবং আইডি পাওয়া যাবে */}
      {isPending ? (
        <div className="p-10 text-center text-zinc-400">
          <span className="loading loading-spinner loading-md mb-2 block mx-auto text-red-500"></span>
          Checking session...
        </div>
      ) : currentUserId ? (
        <MyDonationRequestsTable userId={currentUserId} role={user?.role} />
      ) : (
        <div className="p-10 text-center text-zinc-500 border border-zinc-800 rounded-xl bg-zinc-900/20">
          Please log in to view your requests.
        </div>
      )}
    </div>
  );
};

export default VolunteerMyRequestsPage;