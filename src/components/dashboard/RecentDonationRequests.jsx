'use client';

import React, { useEffect, useState } from 'react';
import { getMyBloodRequests } from '@/lib/api/allBloodRequest';
// import Link from 'next/link';

const RecentDonationRequests = ({ userId, role }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!userId) return;

        const fetchRecent = async () => {
            try {
                setLoading(true);
                // Fetch only latest 3 requests
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
                    Loading recent requests...
                </div>
            ) : requests.length === 0 ? (
                <div className="py-12 text-center text-zinc-400">
                    No recent donation requests yet.
                </div>
            ) : (
                <div className="space-y-4">
                    {requests.map((req) => (
                        <div 
                            key={req._id}
                            className="grid grid-cols-12 gap-4 bg-zinc-950 border border-zinc-800 rounded-xl p-5 items-center hover:border-red-900/70 transition-all"
                        >
                            {/* Participants */}
                            <div className="col-span-12 md:col-span-3">
                                <p className="text-xs text-gray-500">PARTICIPANTS</p>
                                <p className="text-white font-medium">{req.recipientName}</p>
                                <p className="text-xs text-gray-500">Requested by Donor</p>
                            </div>

                            {/* Location */}
                            <div className="col-span-12 md:col-span-3">
                                <p className="text-xs text-gray-500">LOCATION</p>
                                <p className="text-white">
                                    {req.district}{req.upazila ? `, ${req.upazila}` : ''}
                                </p>
                            </div>

                            {/* Schedule */}
                            <div className="col-span-12 md:col-span-2">
                                <p className="text-xs text-gray-500">SCHEDULE</p>
                                <p className="text-white">
                                    {req.requiredDate} 
                                    <span className="text-gray-400"> at {req.requiredTime}</span>
                                </p>
                            </div>

                            {/* Blood Group */}
                            <div className="col-span-12 md:col-span-2">
                                <p className="text-xs text-gray-500">NEED</p>
                                <span className="inline-block bg-red-600/10 text-red-400 px-5 py-1 rounded-full font-bold text-sm">
                                    {req.bloodGroup}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="col-span-12 md:col-span-2 flex justify-end gap-3 relative">
                                <a 
                                    href={`/donor/requests/${req._id}`}
                                    className="text-blue-400 hover:text-blue-300 flex items-center gap-1 text-sm"
                                >
                                    👁️ View Details
                                </a>
                                <button 
                                    onClick={() => alert('Delete feature coming soon')} // Replace with your delete logic
                                    className="text-red-400 hover:text-red-300 flex items-center gap-1 text-sm"
                                >
                                    🗑️ Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecentDonationRequests;