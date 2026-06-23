
'use client';

import { useSession } from '@/lib/auth-client';
import React, { useEffect, useState } from 'react';
import FundingTable from './FundingTable'; 
import { FaHandHoldingUsd } from 'react-icons/fa';

const FundingHistoryPage = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;
    
    const [fundings, setFundings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/api/funding')
            .then((res) => res.json())
            .then((data) => {
                setFundings(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching fundings:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="min-h-screen bg-zinc-950/70 text-zinc-100 py-8 px-4">
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                    All Funding <span className="text-red-500">History</span>
                </h1>
                <p className="text-white mt-3 text-lg max-w-2xl mx-auto">
                    The funding history of NEA reflects its ongoing support for arts and culture through various grants and programs over the years.
                </p>
            </div>

            {/* Give Fund Button Form */}
            <form action="/api/checkout_sessions" method="POST">
                <section className='mx-auto text-center mb-8'>
                    <button type="submit" role="link" className="bg-green-600 cursor-pointer text-white px-15 py-4 rounded-lg hover:bg-green-500 text-2xl font-medium transition-all">
                        Give Fund
                    </button>
                </section>
            </form>

            {/* Funding Table Component */}
            <div className="max-w-6xl mx-auto mt-12">
                <h2 className="text-xl font-semibold text-white mb-4">Recent Fund Donations</h2>
                {loading ? (
                    <div className="text-center py-10 text-zinc-400">Loading funding history...</div>
                ) : (
                    <FundingTable fundings={fundings} />
                )}
            </div>
        </div>
    );
};

export default FundingHistoryPage;


