'use client';

import React, { useEffect, useState } from 'react';
import { getMyBloodRequests } from '@/lib/api/allBloodRequest';
import { FaEye, FaTrash } from 'react-icons/fa';
import Link from 'next/link';

const RecentDonationRequests = ({ userId, role }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        const fetchRecent = async () => {
            try {
                setLoading(true);
                const data = await getMyBloodRequests(userId, 1, 3);
                setRequests(Array.isArray(data?.requests) ? data.requests : []);
            } catch (error) {
                console.error("Failed to fetch recent requests:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecent();
    }, [userId]);

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mt-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Recent Requests</h3>
            </div>

            {loading ? (
                <div className="py-12 text-center text-zinc-400">
                    <span className="loading loading-spinner loading-md mb-2 block mx-auto text-red-500"></span>
                    Loading recent requests...
                </div>
            ) : requests.length === 0 ? (
                <div className="py-12 text-center text-zinc-400">
                    No recent donation requests yet.
                </div>
            ) : (
                <div className="space-y-4">
                    {requests.map((req) => {
                        // স্ট্যাটাস ম্যাচিং সহজ করার জন্য সেফটি ভেরিয়েবল তৈরি করা হলো
                        const currentStatusClean = (req.status || '').replace(/\s+/g, '').toLowerCase();

                        // 🛠️ রিকোয়েস্ট 'inprogress' অথবা 'done'/'completed' যেকোনো একটি হলে ডোনারের ইনফো দেখাবে
                        const isAssignedOrDone = currentStatusClean === 'inprogress' || 
                                                 currentStatusClean === 'done' || 
                                                 currentStatusClean === 'completed';

                        return (
                            <div
                                key={req._id}
                                className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 hover:border-red-900/70 transition-all"
                            >
                                <div className="grid grid-cols-12 gap-x-4 gap-y-5 items-start lg:items-center">
                                    
                                    {/* Participants (Recipient & Donor Name/Email) */}
                                    <div className="col-span-12 md:col-span-4 lg:col-span-3">
                                        <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">PARTICIPANTS</p>
                                        <p className="text-white font-medium text-base mt-0.5">{req.recipientName}</p>
                                        
                                        {/* 🛠️ [আপডেটেড লজیک]: In Progress অথবা Done উভয় ক্ষেত্রেই ডোনারের নাম ও ইমেল শো করবে */}
                                        {isAssignedOrDone ? (
                                            <div className="text-xs text-amber-400 mt-1 font-medium bg-amber-500/5 border border-amber-500/10 rounded-md py-1 px-2 inline-block">
                                                Donor: {req.name || req.donorName || 'Assigned'} ({req.email || req.donorEmail || 'No Email'})
                                            </div>
                                        ) : (
                                            <p className="text-xs text-gray-500 mt-0.5">Posted by you</p>
                                        )}
                                    </div>

                                    {/* Location */}
                                    <div className="col-span-12 md:col-span-4 lg:col-span-2">
                                        <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">LOCATION</p>
                                        <p className="text-zinc-300 mt-0.5">
                                            {req.district}{req.upazila ? `, ${req.upazila}` : ''}
                                        </p>
                                    </div>

                                    {/* Schedule */}
                                    <div className="col-span-12 md:col-span-4 lg:col-span-3">
                                        <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">SCHEDULE</p>
                                        <p className="text-zinc-300 mt-0.5">
                                            {req.requiredDate || "24-06-2026"}
                                            <span className="text-gray-500"> at {req.requiredTime || "10:00 AM"}</span>
                                        </p>
                                    </div>

                                    {/* Need */}
                                    <div className="col-span-12 md:col-span-4 lg:col-span-2">
                                        <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">NEED</p>
                                        <span className="inline-block bg-red-500/10 text-red-400 px-4 py-1 rounded-md font-bold text-sm mt-1">
                                            {req.bloodGroup}
                                        </span>
                                    </div>

                                    {/* Status */}
                                    <div className="col-span-12 md:col-span-4 lg:col-span-1">
                                        <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">STATUS</p>
                                        <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-medium border ${
                                            currentStatusClean === 'pending' 
                                                ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' 
                                                : currentStatusClean === 'canceled' || currentStatusClean === 'cancelled'
                                                ? 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                                                : currentStatusClean === 'inprogress'
                                                ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                                : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                        }`}>
                                            • {req.status || 'Pending'}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="col-span-12 md:col-span-8 lg:col-span-1 flex flex-col items-end gap-3 pt-4 lg:pt-0"> 
                                        <Link
                                            href={`/donation-requests/${req._id}`}
                                            className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                                        >
                                            <FaEye /> View
                                        </Link>
                                        <button
                                            onClick={() => alert('Delete feature coming soon')}
                                            className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 text-sm font-medium transition-colors mt-1"
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default RecentDonationRequests;