'use client';

import { useSession } from '@/lib/auth-client';
import React from 'react';

const FundingHistoryPage = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;
    console.log(user, isPending);

    return (
        <div className="min-h-screen bg-zinc-950/70 text-zinc-100 py-8 px-4">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                    All Funding <span className="text-red-500">History</span>
                </h1>
                <p className="text-white mt-3 text-lg">
                    The funding history of NEA reflects its ongoing support for arts and culture through various grants and programs over the years.
                </p>
            </div>
        </div>
    );
};

export default FundingHistoryPage;