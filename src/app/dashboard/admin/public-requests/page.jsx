'use client';

import React, { useEffect, useRef, useState } from 'react';
import { FaTimes, FaEdit, FaTrash, FaEye, FaEllipsisV, FaRegCheckCircle } from 'react-icons/fa';
import { useSession } from '@/lib/auth-client';
import { getAdminAllBRequests } from '@/lib/api/bloodsAllGets';
import { updateBloodRequest, deleteBloodRequest } from '@/lib/api/allBloodRequest';
import { toast } from 'react-toastify';
import Link from 'next/link';

const AdminAllRequestsPage = () => {
    const { data: session } = useSession();
    const user = session?.user;

    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [openMenu, setOpenMenu] = useState(null);
    const menuRef = useRef(null);
    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Filters
    const [statusFilter, setStatusFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    // Edit Modal state
    const [editingRequest, setEditingRequest] = useState(null); // jei request edit hocche
    const [editForm, setEditForm] = useState({});
    const [saving, setSaving] = useState(false);


    const limit = 10;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target)
            ) {
                setOpenMenu(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (!user) return;
        fetchRequests();
    }, [currentPage, statusFilter, searchTerm]);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const res = await getAdminAllBRequests({
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
            const updateData = {
                status: newStatus,
                donorName: user?.name || "",
                donorEmail: user?.email || "",
            };

            await updateBloodRequest(reqId, updateData);

            toast.success(`Request marked as ${newStatus}`);

            fetchRequests();

        } catch (error) {
            console.error(error);
            toast.error("Failed to update status");

        } finally {
            setUpdatingId(null);
        }
    };

    const handleDelete = async (reqId) => {
        if (updatingId) return;
        const confirmDelete = window.confirm("Are you sure you want to delete this request? This cannot be undone.");
        if (!confirmDelete) return;

        setUpdatingId(reqId);
        try {
            await deleteBloodRequest(reqId);
            toast.warning("Request deleted successfully");
            fetchRequests();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete request");
        } finally {
            setUpdatingId(null);
        }
    };

    const handleEditOpen = (req) => {
        setEditingRequest(req);
        setEditForm({
            recipientName: req.recipientName || '',
            district: req.district || '',
            upazila: req.upazila || '',
            bloodGroup: req.bloodGroup || '',
            requiredDate: req.requiredDate || '',
            requiredTime: req.requiredTime || '',
        });
    };

    const handleEditClose = () => {
        setEditingRequest(null);
        setEditForm({});
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditSave = async () => {
        if (!editingRequest) return;
        setSaving(true);

        try {
            await updateBloodRequest(editingRequest._id, editForm);
            toast.success("Request updated successfully");
            handleEditClose();
            fetchRequests();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update request");
        } finally {
            setSaving(false);
        }
    };

    const getCleanStatus = (rawStatus) => {
        const statusString = typeof rawStatus === 'object'
            ? (rawStatus?.status || "")
            : (rawStatus || "");
        return statusString.replace(/\s+/g, '').toLowerCase();
    };

    return (


        <div className='min-h-screen bg-zinc-600/40 text-zinc-100 md:ml-8'>

            <h2 className="text-xl text-red-500 font-bold text-right uppercase mb-2">
                {user?.role}
            </h2>


            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-100">
                        All Public <span className="text-red-500">Requests</span>
                    </h1>
                    <p className="text-zinc-300 mt-1 text-sm">
                        Admin Dashboard - Manage All Users' Requests
                    </p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <input
                    type="text"
                    placeholder="Search by recipient name, blood group or location..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500"
                />

                <select
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-500 w-full md:w-auto shrink-0"
                >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="InProgress">In Progress</option>
                    <option value="Done">Done</option>
                    <option value="Canceled">Canceled</option>
                </select>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
                {loading ? (
                    <div className="py-20 text-center text-zinc-400">Loading requests...</div>
                ) : requests.length === 0 ? (
                    <div className="py-20 text-center text-zinc-400">No requests found.</div>
                ) : (
                    <>
                        <div className="block lg:hidden divide-y divide-zinc-800/60">
                            {requests.map((req) => {
                                const cleanStatus = getCleanStatus(req.status);
                                const isInProgress = cleanStatus === 'inprogress';

                                return (
                                    <div key={req._id} className="p-4 space-y-4 hover:bg-zinc-800/20 transition-colors relative group">

                                        <div className="flex justify-between items-start gap-2">
                                            <div className="min-w-0">
                                                <div className="font-semibold text-zinc-200 group-hover:text-white text-base truncate">
                                                    {req.recipientName}
                                                </div>
                                                <div className="text-xs text-zinc-500 mt-0.5">
                                                    Requested by: {req.requesterName || 'N/A'}
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 shrink-0">

                                                <span className="inline-block bg-red-500/10 text-red-400 px-2.5 py-1 rounded-md font-bold text-xs uppercase border border-red-500/20">
                                                    {req.bloodGroup}
                                                </span>


                                                <div className="relative" onClick={(e) => e.stopPropagation()}>
                                                    <button
                                                        onClick={() => setOpenMenu(openMenu === req._id ? null : req._id)}
                                                        className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                                                    >
                                                        <FaEllipsisV size={14} />
                                                    </button>

                                                    {openMenu === req._id && (
                                                        <div ref={menuRef} className="absolute right-0 mt-1 w-40 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl z-50 overflow-hidden py-1 text-left">
                                                            <Link
                                                                href={`/donation-requests/${req._id}`}
                                                                onClick={() => setOpenMenu(null)}
                                                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-zinc-800 text-zinc-200 transition-colors"
                                                            >
                                                                <FaEye size={14} /> View
                                                            </Link>
                                                            <button
                                                                onClick={() => {
                                                                    handleEditOpen(req);
                                                                    setOpenMenu(null);
                                                                }}
                                                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-zinc-800 text-blue-400 border-t border-zinc-900 transition-colors"
                                                            >
                                                                <FaEdit size={14} /> Edit
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    handleDelete(req._id);
                                                                    setOpenMenu(null);
                                                                }}
                                                                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-zinc-800 text-red-500 border-t border-zinc-900 transition-colors"
                                                            >
                                                                <FaTrash size={14} /> Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>


                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-zinc-950/40 p-3 rounded-xl border border-zinc-800/60 text-zinc-300">
                                            <div className="truncate flex items-center gap-1">
                                                📍 <span>{req.district}{req.upazila ? `, ${req.upazila}` : ''}</span>
                                            </div>
                                            <div className="sm:text-right flex items-center gap-1 sm:justify-end">
                                                📅 <span>{req.requiredDate} at {req.requiredTime}</span>
                                            </div>
                                        </div>


                                        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">

                                            <span className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-medium border ${cleanStatus === 'pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                                                    cleanStatus === 'inprogress' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                        cleanStatus === 'canceled' || cleanStatus === 'cancelled' ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' :
                                                            'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                                }`}>
                                                {typeof req.status === 'object' ? req.status?.status : req.status || 'Pending'}
                                            </span>


                                            <div className="shrink-0">
                                                {cleanStatus === 'pending' ? (
                                                    <select
                                                        defaultValue=""
                                                        disabled={updatingId === req._id}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            if (value) handleStatusUpdate(req._id, value);
                                                            e.target.value = "";
                                                        }}
                                                        className="bg-zinc-800 border border-zinc-700 rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-red-500 disabled:opacity-50 text-zinc-200"
                                                    >
                                                        <option value="" disabled>Select Action</option>
                                                        <option value="InProgress">Mark In Progress</option>
                                                        <option value="Done">Mark Done</option>
                                                        <option value="Canceled">Cancel</option>
                                                    </select>
                                                ) : isInProgress ? (
                                                    <div className="flex gap-1.5">
                                                        <button
                                                            onClick={() => handleStatusUpdate(req._id, 'Done')}
                                                            disabled={updatingId === req._id}
                                                            className="flex items-center gap-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 px-2.5 py-1.5 rounded-lg text-xs transition-all disabled:opacity-50 font-medium"
                                                        >
                                                            <FaRegCheckCircle /> Done
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(req._id, 'Canceled')}
                                                            disabled={updatingId === req._id}
                                                            className="flex items-center gap-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 px-2.5 py-1.5 rounded-lg text-xs transition-all disabled:opacity-50 font-medium"
                                                        >
                                                            <FaTimes /> Cancel
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <span className="text-zinc-500 text-xs">No action</span>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                );
                            })}
                        </div>


                        <div className="hidden lg:block overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead className="bg-zinc-950 border-b border-zinc-800">
                                    <tr>
                                        <th className="text-left p-4 text-xs uppercase tracking-wider text-zinc-500 font-semibold">Recipient</th>
                                        <th className="text-left p-4 text-xs uppercase tracking-wider text-zinc-500 font-semibold">Location</th>
                                        <th className="text-left p-4 text-xs uppercase tracking-wider text-zinc-500 font-semibold">Blood Group</th>
                                        <th className="text-left p-4 text-xs uppercase tracking-wider text-zinc-500 font-semibold">Date & Time</th>
                                        <th className="text-left p-4 text-xs uppercase tracking-wider text-zinc-500 font-semibold">Status</th>
                                        <th className="text-center p-4 text-xs uppercase tracking-wider text-zinc-500 font-semibold">Status Action</th>
                                        <th className="text-center p-4 text-xs uppercase tracking-wider text-zinc-500 font-semibold">Manage</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-800">
                                    {requests.map((req) => {
                                        const cleanStatus = getCleanStatus(req.status);
                                        const isInProgress = cleanStatus === 'inprogress';

                                        return (
                                            <tr key={req._id} className="hover:bg-zinc-950/50 transition-colors">
                                                <td className="p-4">
                                                    <div className="font-medium text-zinc-200">{req.recipientName}</div>
                                                    <div className="text-xs text-zinc-500 mt-0.5">Requested by: {req.requesterName || 'N/A'}</div>
                                                </td>
                                                <td className="p-4 text-zinc-300 text-sm">
                                                    {req.district}{req.upazila ? `, ${req.upazila}` : ''}
                                                </td>
                                                <td className="p-4">
                                                    <span className="inline-block bg-red-500/10 text-red-400 px-3 py-1 rounded-md font-bold text-sm border border-red-500/20">
                                                        {req.bloodGroup}
                                                    </span>
                                                </td>
                                                <td className="p-4 text-zinc-300 text-sm">
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
                                                                e.target.value = "";
                                                            }}
                                                            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-red-500 disabled:opacity-50 text-zinc-200"
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
                                                                className="flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-lg text-sm transition-all disabled:opacity-50 font-medium"
                                                            >
                                                                <FaRegCheckCircle /> Done
                                                            </button>
                                                            <button
                                                                onClick={() => handleStatusUpdate(req._id, 'Canceled')}
                                                                disabled={updatingId === req._id}
                                                                className="flex items-center gap-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 px-4 py-1.5 rounded-lg text-sm transition-all disabled:opacity-50 font-medium"
                                                            >
                                                                <FaTimes /> Cancel
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <span className="text-zinc-500 text-sm">No action</span>
                                                    )}
                                                </td>
                                                <td className="p-4 text-center relative">
                                                    <button
                                                        onClick={() => setOpenMenu(openMenu === req._id ? null : req._id)}
                                                        className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                                                    >
                                                        <FaEllipsisV />
                                                    </button>

                                                    {openMenu === req._id && (
                                                        <div ref={menuRef} className="absolute right-5 top-12 z-20 w-40 bg-zinc-900 border border-zinc-700 rounded-xl shadow-xl overflow-hidden py-1 text-left">
                                                            <Link
                                                                href={`/donation-requests/${req._id}`}
                                                                onClick={() => setOpenMenu(null)}
                                                                className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-zinc-800 text-zinc-200 transition-colors"
                                                            >
                                                                <FaEye /> View
                                                            </Link>
                                                            <button
                                                                onClick={() => {
                                                                    handleEditOpen(req);
                                                                    setOpenMenu(null);
                                                                }}
                                                                className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-zinc-800 text-blue-400 transition-colors"
                                                            >
                                                                <FaEdit /> Edit
                                                            </button>
                                                            <button
                                                                onClick={() => {
                                                                    handleDelete(req._id);
                                                                    setOpenMenu(null);
                                                                }}
                                                                className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-zinc-800 text-red-500 transition-colors"
                                                            >
                                                                <FaTrash /> Delete
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>


            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8 flex-wrap">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-xs sm:text-sm bg-zinc-900 border border-zinc-700 rounded-xl disabled:opacity-50 hover:bg-zinc-800 transition-colors text-zinc-200"
                    >
                        Previous
                    </button>
                    <span className="px-3 py-2 text-xs sm:text-sm text-zinc-400">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-xs sm:text-sm bg-zinc-900 border border-zinc-700 rounded-xl disabled:opacity-50 hover:bg-zinc-800 transition-colors text-zinc-200"
                    >
                        Next
                    </button>
                </div>
            )}


            {editingRequest && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-md p-5 sm:p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="text-lg sm:text-xl font-bold text-white">Edit Request</h3>
                            <button onClick={handleEditClose} className="text-zinc-400 hover:text-white transition-colors">
                                <FaTimes size={18} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs text-zinc-400 mb-1 font-medium">Recipient Name</label>
                                <input
                                    type="text"
                                    name="recipientName"
                                    value={editForm.recipientName}
                                    onChange={handleEditChange}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-red-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-zinc-400 mb-1 font-medium">District</label>
                                <input
                                    type="text"
                                    name="district"
                                    value={editForm.district}
                                    onChange={handleEditChange}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-red-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-zinc-400 mb-1 font-medium">Upazila</label>
                                <input
                                    type="text"
                                    name="upazila"
                                    value={editForm.upazila}
                                    onChange={handleEditChange}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-red-500"
                                />
                            </div>

                            <div>
                                <label className="block text-xs text-zinc-400 mb-1 font-medium">Blood Group</label>
                                <input
                                    type="text"
                                    name="bloodGroup"
                                    value={editForm.bloodGroup}
                                    onChange={handleEditChange}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-red-500"
                                />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-zinc-400 mb-1 font-medium">Required Date</label>
                                    <input
                                        type="date"
                                        name="requiredDate"
                                        value={editForm.requiredDate}
                                        onChange={handleEditChange}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-red-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-zinc-400 mb-1 font-medium">Required Time</label>
                                    <input
                                        type="time"
                                        name="requiredTime"
                                        value={editForm.requiredTime}
                                        onChange={handleEditChange}
                                        className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-red-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={handleEditClose}
                                disabled={saving}
                                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleEditSave}
                                disabled={saving}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2.5 rounded-xl text-sm font-medium transition-all disabled:opacity-50"
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAllRequestsPage;