'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { FiChevronRight, FiAlertTriangle } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { getAllBRequests } from '@/lib/api/bloodsAllGets';

export default function FeaturedSection() {
    const pathname = usePathname();
    const [urgentRequests, setUrgentRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    // Dynamic user type based on pathname prefix, default to 'donor'
    const userType = pathname?.split('/')[1] || 'donor';

    useEffect(() => {
        const fetchUrgentRequests = async () => {
            try {
                setLoading(true);
                // Fetch only latest 3 requests to fit the clean home grid
                const data = await getAllBRequests(1, 3);
                setUrgentRequests(data.requests || []);
            } catch (error) {
                console.error("Failed to fetch urgent requests:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUrgentRequests();
    }, []);

    return (
        <section className="w-full py-10 bg-zinc-950/70 text-zinc-100">
            <div className="mx-auto px-5 lg:px-8 pt-16 pb-8 max-w-7xl">

                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-3 max-w-2xl">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-xs font-bold text-red-500 uppercase tracking-wider">
                            <FiAlertTriangle className="animate-bounce" size={12} />
                            Live Priorities
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
                            Critical Live <span className="text-red-500">Requirements</span>
                        </h2>
                        <p className="text-white text-sm md:text-base">
                            These patients need immediate assistance. If you match any of these blood groups or are nearby, please reach out instantly.
                        </p>
                    </div>

                    <Link
                        href="/donation-requests"
                        className="inline-flex items-center gap-1 text-sm font-bold text-white hover:text-red-500 transition-colors group shrink-0"
                    >
                        View All Live Requests
                        <FiChevronRight className="transform group-hover:translate-x-1 transition-transform" size={16} />
                    </Link>
                </div>

                {/* Loading State */}
                {loading ? (
                    <div className="flex justify-center items-center h-80 gap-3">
                        <span className="text-red-500 font-bold text-lg animate-pulse">
                            Requests Loading....
                        </span>
                        <span className="loading loading-spinner loading-lg text-red-500"></span>
                    </div>
                ) : urgentRequests.length === 0 ? (
                    <div className="text-center py-16 text-zinc-400 text-lg">
                        No urgent requests at the moment.
                    </div>
                ) : (
                    /* Featured Cards Grid matching All Requests page structure */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {urgentRequests.map((req) => (
                            <div
                                key={req._id}
                                className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-red-600/50 transition-all duration-300 group flex flex-col justify-between"
                            >
                                <div>
                                    {/* Top Area: Blood Group & Badge */}
                                    <div className="bg-zinc-800 px-6 py-4 flex items-center justify-between">
                                        <div className="w-12 h-12 bg-red-600/10 text-red-500 rounded-xl flex items-center justify-center text-2xl font-bold border border-red-500/30">
                                            {req.bloodGroup}
                                        </div>
                                        <span className="text-xs uppercase tracking-widest text-amber-400 font-medium px-3 py-1 bg-amber-500/10 rounded-full">
                                            URGENT
                                        </span>
                                    </div>

                                    {/* Card Content Body */}
                                    <div className="p-6 space-y-4">
                                        <div>
                                            <p className="text-white font-semibold text-lg">{req.recipientName}</p>
                                            <p className="text-zinc-500 text-sm">RECIPIENT</p>
                                        </div>

                                        {/* Meta Information (Location, Date, Time) */}
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
                                </div>

                                {/* Dynamic Action Button */}
                                <div className="px-6 pb-6">
                                    <Link
                                        href={`/donation-requests/${req._id}`}  
                                        className="block w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3.5 rounded-xl text-center transition-all active:scale-95"
                                    >
                                        View Details →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Call to Action Banner */}
                <div className="mt-16 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-red-500/10 rounded-2xl text-red-500">
                            <HiOutlineSparkles size={28} />
                        </div>
                        <div>
                            <h4 className="text-xl font-bold">Don’t see your blood group?</h4>
                            <p className="text-zinc-400 text-sm mt-1">Register as a donor to help patients in emergency.</p>
                        </div>
                    </div>

                    <Link
                        href="/register"
                        className="px-8 py-3.5 bg-white text-zinc-900 font-bold rounded-2xl hover:bg-zinc-200 transition-all shadow-lg"
                    >
                        Join as Donor
                    </Link>
                </div>
            </div>
        </section>
    );
}