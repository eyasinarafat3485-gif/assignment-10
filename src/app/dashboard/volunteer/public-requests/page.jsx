'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';
import { getVolunteerAllBRequests } from '@/lib/api/bloodsAllGets';
import { updateBloodRequest } from '@/lib/api/allBloodRequest';
import { toast } from 'react-toastify';

const PublicRequestsPage = () => {
    const { data: session } = useSession();
    const user = session?.user;

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Filters
    const [statusFilter, setStatusFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const limit = 10;

    useEffect(() => {
        if (!user) return;
        fetchRequests();
    }, [currentPage, statusFilter, searchTerm]);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const res = await getVolunteerAllBRequests({
                page: currentPage,
                limit: limit,
                status: statusFilter === 'All' ? '' : statusFilter,
                search: searchTerm.trim()
            });

            setRequests(Array.isArray(res?.requests) ? res.requests : []);
            setTotalPages(res?.totalPages || 1);
        } catch (error) {
            console.error("Failed to fetch requests:", error);
            setRequests([]);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (reqId, newStatus) => {
        if (updatingId) return;
        setUpdatingId(reqId);

        try {
            await updateBloodRequest(reqId, { status: newStatus });
            toast.success(`Request marked as ${newStatus}`);
            fetchRequests(); // Refresh
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status");
        } finally {
            setUpdatingId(null);
        }
    };

    const getCleanStatus = (rawStatus) => {
        const statusString = typeof rawStatus === 'object'
            ? (rawStatus?.status || "")
            : (rawStatus || "");
        return statusString.replace(/\s+/g, '').toLowerCase();
    };

    return (
        <div className="md:ml-8 min-h-screen text-zinc-100">
            <h2 className='text-xl text-red-500 font-bold mt-0 mr-0 text-right uppercase'>
        {user?.role}
      </h2>
            <div className="flex md:p-8 justify-between items-center mb-2">
                <div className='md:-ml-8'>
                    <h1 className="text-3xl font-bold tracking-tight text-zinc-100 md:text-4xl">
                        All Public<span className="text-red-500"> Request</span>
                    </h1>

                    <p className="text-white mt-2">Volunteer Dashboard - View & Update Status</p>
                </div>
                
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by recipient name, blood group or location..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1); // Reset to first page on search
                    }}
                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500"
                />

                <select
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1); // Reset to first page on filter change
                    }}
                    className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500"
                >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Done">Done</option>
                    <option value="Canceled">Canceled</option>
                </select>
            </div>

            {/* Table */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                {loading ? (
                    <div className="py-20 text-center text-zinc-400">Loading requests...</div>
                ) : requests.length === 0 ? (
                    <div className="py-20 text-center text-zinc-400">No requests found.</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-zinc-950 border-b border-zinc-800">
                                <tr>
                                    <th className="text-left p-4 text-xs uppercase tracking-wider text-zinc-500">Recipient</th>
                                    <th className="text-left p-4 text-xs uppercase tracking-wider text-zinc-500">Location</th>
                                    <th className="text-left p-4 text-xs uppercase tracking-wider text-zinc-500">Blood Group</th>
                                    <th className="text-left p-4 text-xs uppercase tracking-wider text-zinc-500">Date & Time</th>
                                    <th className="text-left p-4 text-xs uppercase tracking-wider text-zinc-500">Status</th>
                                    <th className="text-center p-4 text-xs uppercase tracking-wider text-zinc-500">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {requests.map((req) => {
                                    const cleanStatus = getCleanStatus(req.status);
                                    const isInProgress = cleanStatus === 'inprogress';

                                    return (
                                        <tr key={req._id} className="hover:bg-zinc-950/50 transition-colors">
                                            <td className="p-4">
                                                <div className="font-medium">{req.recipientName}</div>
                                            </td>
                                            <td className="p-4 text-zinc-300">
                                                {req.district}{req.upazila ? `, ${req.upazila}` : ''}
                                            </td>
                                            <td className="p-4">
                                                <span className="inline-block bg-red-500/10 text-red-400 px-3 py-1 rounded-md font-bold">
                                                    {req.bloodGroup}
                                                </span>
                                            </td>
                                            <td className="p-4 text-zinc-300">
                                                {req.requiredDate} at {req.requiredTime}
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${cleanStatus === 'pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                        cleanStatus === 'inprogress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                            cleanStatus === 'canceled' || cleanStatus === 'cancelled' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                                                                'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                                    }`}>
                                                    {typeof req.status === 'object' ? req.status?.status : req.status || 'Pending'}
                                                </span>
                                            </td>
                                            <td className="p-4 text-center">
                                                {cleanStatus === 'pending' ? (
                                                    <select
                                                        defaultValue=""
                                                        disabled={updatingId === req._id}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            if (value) handleStatusUpdate(req._id, value);
                                                            e.target.value = ""; // reset dropdown after action
                                                        }}
                                                        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-red-500 disabled:opacity-50"
                                                    >
                                                        <option value="" disabled>Select Action</option>
                                                        <option value="InProgress">Mark In Progress</option>
                                                        <option value="Done">Mark Done</option>
                                                        <option value="Canceled">Cancel</option>
                                                    </select>
                                                ) : isInProgress ? (
                                                    <div className="flex gap-2 justify-center">
                                                        <button
                                                            onClick={() => handleStatusUpdate(req._id, 'Done')}
                                                            disabled={updatingId === req._id}
                                                            className="flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-lg text-sm transition-all disabled:opacity-50"
                                                        >
                                                            <FaCheckCircle /> Done
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(req._id, 'Canceled')}
                                                            disabled={updatingId === req._id}
                                                            className="flex items-center gap-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 px-4 py-1.5 rounded-lg text-sm transition-all disabled:opacity-50"
                                                        >
                                                            <FaTimes /> Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-zinc-500 text-sm">No action</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-3 mt-8">
                    <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-5 py-2 bg-zinc-900 border border-zinc-700 rounded-xl disabled:opacity-50 hover:bg-zinc-800"
                    >
                        Previous
                    </button>
                    <span className="px-5 py-2 text-sm flex items-center">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="px-5 py-2 bg-zinc-900 border border-zinc-700 rounded-xl disabled:opacity-50 hover:bg-zinc-800"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default PublicRequestsPage;