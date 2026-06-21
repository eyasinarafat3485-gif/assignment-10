'use client';

import { useSession } from '@/lib/auth-client';
import React from 'react';

const SearchDonorPage = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;
    if (isPending){
        <div>Loading...</div>
    }
    console.log(user, isPending);

    return (
        <div className="min-h-screen bg-zinc-950/70 text-zinc-100 py-8 px-4">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                    Find a <span className="text-red-500">Blood Donor</span>
                </h1>
                <p className="text-white mt-3 text-lg">
                    If you're eligible to donate blood, please consider visiting your local blood donation center to help save lives.
                </p>
            </div>
        </div>
    );
};

export default SearchDonorPage;