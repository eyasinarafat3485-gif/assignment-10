'use client'
import { useSession } from '@/lib/auth-client';
import React from 'react';
import DonationRequestFormContainer from '@/components/dashboard/DonationRequestFormContainer';
// import DonationRequestFormContainer from './DonationRequestFormContainer';

const CreateDonationRequestPage = () => {
    const {data: session, isPending} = useSession();
          const user = session?.user;
          console.log(user, isPending);
  return (
    <div className="min-h-screen px-4 py-10 md:px-8">
      {/* <h2 className="text-xl text-red-500 font-bold mt-0 mr-0 text-right uppercase">
        New Donation Request
      </h2> */}

      <h2 className='text-xl text-red-500 font-bold mt-0 mr-0 text-right uppercase'>
                {user?.role}
            </h2>

      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-black tracking-tight text-zinc-100 md:text-4xl">
            New <span className="text-red-500">Donation Request</span>
          </h1>
          <p className="mt-2 text-sm text-white">
            Complete the form below to broadcast an urgent request to the donor community.
          </p>
        </div>

        {/* Reusable Sub Component */}
        <DonationRequestFormContainer />
      </div>
    </div>
  );
};

export default CreateDonationRequestPage;