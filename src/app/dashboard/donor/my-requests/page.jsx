'use client';

import React, { useState } from 'react';
import { useSession } from '@/lib/auth-client';
import MyDonationRequestsTable from '@/components/dashboard/MyDonationRequestsTable';

const DonorMyRequestsPage = () => {
  const { data: session, isPending } = useSession();
  const user = session?.user;
  const currentUserId = user?.id || user?._id || user?.userId;

  const [statusFilter, setStatusFilter] = useState('All Status');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const statuses = ['All Status', 'Pending', 'In Progress', 'Done', 'Cancelled'];

  return (
    <div className="min-h-screen text-zinc-100 ">
      <h2 className='text-xl text-red-500 font-bold text-right uppercase'>
        {user?.role}
      </h2>
      <div className="flex justify-between items-center p-4 md:p-8">
        <div className='-ml-4 md:-m-0'>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
            My <span className="text-red-500"> All Requests</span>
          </h1>
          <p className="text-white mt-2">Track my all personal blood requests overview</p>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-sm font-medium text-zinc-300 hover:bg-zinc-800 transition-all shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-zinc-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
            </svg>
            {statusFilter}
          </button>

          {isFilterOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setIsFilterOpen(false)}></div>
              <div className="absolute right-0 mt-2 w-44 rounded-xl border border-zinc-800 bg-zinc-950 p-1.5 shadow-xl z-20 text-left">
                {statuses.map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status);
                      setIsFilterOpen(false);
                    }}
                    className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-all ${statusFilter === status
                        ? 'bg-zinc-900 text-red-500'
                        : 'text-zinc-300 hover:bg-zinc-900'
                      }`}
                  >
                    {statusFilter === status && <span className="text-red-500">✓</span>}
                    {status}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {!isPending && currentUserId && (
        <MyDonationRequestsTable userId={currentUserId} role={user?.role} statusFilter={statusFilter} />
      )}
    </div>
  );
};

export default DonorMyRequestsPage;