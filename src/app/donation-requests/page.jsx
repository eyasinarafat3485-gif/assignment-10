'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';       
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { getAllBRequests } from '@/lib/api/bloodsAllGets';

const AllDonationRequestsPage = () => {
    const pathname = usePathname();                    

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRequests, setTotalRequests] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const itemsPerPage = 12;

    const userType = pathname.split('/')[1] || 'donor';

    const fetchRequests = async (page) => {
        try {
            setLoading(true);
            const data = await getAllBRequests(page, itemsPerPage);

            setRequests(data.requests || []);
            setTotalRequests(data.totalRequests || 0);
            setTotalPages(data.totalPages || 1);
            setCurrentPage(page);
        } catch (error) {
            console.error("Failed to fetch requests:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests(1);
    }, []);

    const handlePageChange = (page) => {
        if (page < 1 || page > totalPages) return;
        fetchRequests(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-zinc-950/70 text-zinc-100 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                        Donation <span className="text-red-500">All Requests</span>
                    </h1>
                    <p className="text-white mt-3 text-lg">
                        Your donation can save a life. Browse pending requests below and find urgent needs matching your blood group.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-96 gap-3">
                        <span className="text-red-500 font-bold text-lg animate-pulse">
                            All Requests Loading....
                        </span>
                        <span className="loading loading-spinner loading-lg text-red-500"></span>
                    </div>
                ) : requests.length === 0 ? (
                    <div className="text-center py-20 text-zinc-400 text-xl">
                        No donation requests available at the moment.
                    </div>
                ) : (
                    <>
                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-5">
                            {requests.map((req) => (
                                <div
                                    key={req._id}
                                    className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-red-600/50 transition-all duration-300 group"
                                >
                                    {/* Blood Group */}
                                    <div className="bg-zinc-800 px-6 py-4 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-red-600/10 text-red-500 rounded-xl flex items-center justify-center text-2xl font-bold border border-red-500/30">
                                                {req.bloodGroup}
                                            </div>
                                        </div>
                                        <span className="text-xs uppercase tracking-widest text-amber-400 font-medium px-3 py-1 bg-amber-500/10 rounded-full">
                                            URGENT
                                        </span>
                                    </div>

                                    {/* Card Body */}
                                    <div className="p-6 space-y-4">
                                        <div>
                                            <p className="text-white font-semibold text-lg">{req.recipientName}</p>
                                            <p className="text-zinc-500 text-sm">RECIPIENT</p>
                                        </div>

                                        {/* Location, Date, Time ... */}
                                        <div className="flex items-start gap-3">
                                            <FaMapMarkerAlt className="text-red-500 mt-1" />
                                            <div>
                                                <p className="text-zinc-300">{req.district}</p>
                                                {req.upazila && <p className="text-zinc-500 text-sm">{req.upazila}</p>}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <FaCalendarAlt className="text-red-500" />
                                            <p className="text-zinc-300">{req.requiredDate}</p>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <FaClock className="text-red-500" />
                                            <p className="text-zinc-300">{req.requiredTime}</p>
                                        </div>
                                    </div>

                                    {/* Footer Button - Dynamic Link */}
                                    <div className="px-6 pb-6">
                                        <Link
                                            href={`/${userType}/${req._id}`}   
                                            className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 rounded-xl text-center transition-all active:scale-95"
                                        >
                                            View Details →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-3 mt-12">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-5 py-3 bg-zinc-900 border border-zinc-700 rounded-xl disabled:opacity-50 hover:bg-zinc-800 transition-all"
                                >
                                    Previous
                                </button>

                                <div className="flex items-center gap-2">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`w-10 h-10 rounded-xl font-semibold transition-all ${currentPage === page
                                                    ? 'bg-red-600 text-white'
                                                    : 'bg-zinc-900 border border-zinc-700 hover:bg-zinc-800'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-5 py-3 bg-zinc-900 border border-zinc-700 rounded-xl disabled:opacity-50 hover:bg-zinc-800 transition-all"
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default AllDonationRequestsPage;