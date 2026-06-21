'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BiTimeFive, BiMap, BiUserVoice } from 'react-icons/bi';
import { FiChevronRight, FiAlertTriangle } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { FaDropbox } from 'react-icons/fa';
import { getAllBRequests } from '@/lib/api/bloodsAllGets';

export default function FeaturedSection() {
    const [urgentRequests, setUrgentRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUrgentRequests = async () => {
            try {
                setLoading(true);
                // Fetch only latest 4 requests
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
            <div className=" mx-auto px-5 lg:px-8 pt-16 pb-8">

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
                    <div className="flex justify-center items-center h-80">
                        <span className="loading loading-spinner loading-lg text-red-500"></span>
                    </div>
                ) : urgentRequests.length === 0 ? (
                    <div className="text-center py-16 text-zinc-400">
                        No urgent requests at the moment.
                    </div>
                ) : (
                    /* Featured Cards Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {urgentRequests.map((request) => (
                            <div
                                key={request._id}
                                className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 hover:border-red-600/50 shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                            >
                                {/* Top Accent Line */}
                                <div className="absolute top-0 inset-x-0 h-1.5 bg-red-600" />

                                <div>
                                    {/* Status & Time */}
                                    <div className="flex justify-between items-center mb-5">
                                        <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-red-500/10 text-red-400">
                                            URGENT
                                        </span>
                                        <div className="flex items-center gap-1 text-zinc-400 text-xs">
                                            <BiTimeFive size={16} />
                                            <span>Just now</span>
                                        </div>
                                    </div>

                                    {/* Blood Group */}
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-16 rounded-2xl bg-red-600/10 flex items-center justify-center text-red-500 relative">
                                            <FaDropbox size={36} />
                                            <span className="absolute text-2xl font-black text-white top-1/2 -translate-y-1/2">
                                                {request.bloodGroup}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-black text-white tracking-tight">
                                                {request.bloodGroup} Required
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Details */}
                                    <div className="space-y-4 text-sm border-t border-zinc-800 pt-5">
                                        <div className="flex items-start gap-3">
                                            <BiUserVoice className="text-red-500 mt-1" size={20} />
                                            <p className="text-zinc-300">
                                                <span className="text-zinc-500">Recipient:</span> {request.recipientName}
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <BiMap className="text-red-500 mt-1" size={20} />
                                            <p className="text-zinc-300">
                                                <span className="text-zinc-500">Location:</span> {request.district}
                                                {request.upazila && `, ${request.upazila}`}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <Link
                                    href={`/donor/requests/${request._id}`}
                                    className="mt-8 w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-2xl text-center transition-all active:scale-95"
                                >
                                    Donate Now
                                </Link>
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
                        className="px-8 py-3.5 bg-white text-zinc-900 font-bold rounded-2xl hover:bg-zinc-200 transition-all"
                    >
                        Join as Donor
                    </Link>
                </div>
            </div>
        </section>
    );
}