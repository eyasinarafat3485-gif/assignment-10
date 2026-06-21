// 'use client';

// import React, { useEffect, useState } from 'react';
// import { getMyBloodRequests } from '@/lib/api/allBloodRequest';
// import { FaEye, FaTrash } from 'react-icons/fa';
// import Link from 'next/link';

// const RecentDonationRequests = ({ userId, role }) => {
//     const [requests, setRequests] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (!userId) return;

//         const fetchRecent = async () => {
//             try {
//                 setLoading(true);
//                 const data = await getMyBloodRequests(userId, 1, 3);
//                 setRequests(Array.isArray(data?.requests) ? data.requests : []);
//             } catch (error) {
//                 console.error("Failed to fetch recent requests:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchRecent();
//     }, [userId]);

//     return (
//         <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mt-8">
//             <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-semibold text-white">Recent Requests</h3>
//             </div>

//             {loading ? (
//                 <div className="py-12 text-center text-zinc-400">
//                     <span className="loading loading-spinner loading-md mb-2 block mx-auto text-red-500"></span>
//                     Loading recent requests...
//                 </div>
//             ) : requests.length === 0 ? (
//                 <div className="py-12 text-center text-zinc-400">
//                     No recent donation requests yet.
//                 </div>
//             ) : (
//                 <div className="space-y-4">
//                     {requests.map((req) => {
//                         // 🟢 [FIXED - CRASH PROTECTION]: status অবজেক্ট নাকি স্ট্রিং তা নিখুঁতভাবে চেক করা হলো
//                         const rawStatus = req.status;
//                         const statusString = typeof rawStatus === 'object' ? (rawStatus?.status || "") : (rawStatus || "");
                        
//                         // স্ট্যাটাস টেক্সট ক্লিন করা
//                         const currentStatusClean = statusString.replace(/\s+/g, '').toLowerCase();

//                         // রিকোয়েস্ট 'inprogress' অথবা 'done'/'completed' যেকোনো একটি হলে ডোনারের ইনফো দেখাবে
//                         const isAssignedOrDone = currentStatusClean === 'inprogress' || 
//                                                  currentStatusClean === 'done' || 
//                                                  currentStatusClean === 'completed';

//                         return (
//                             <div
//                                 key={req._id}
//                                 className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 hover:border-red-900/70 transition-all"
//                             >
//                                 <div className="grid grid-cols-12 gap-x-4 gap-y-5 items-start lg:items-center">
                                    
//                                     {/* Participants (Recipient & Donor Name/Email) */}
//                                     <div className="col-span-12 md:col-span-4 lg:col-span-3">
//                                         <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">PARTICIPANTS</p>
//                                         <p className="text-white font-medium text-base mt-0.5">{req.recipientName}</p>
                                        
//                                         {/* 🟢 [FIXED - CORRECT DONOR SHOWING]: এখন ক্রিয়েটরের নাম নয়, সরাসরি আসল ডোনারের নাম-ইমেইল দেখাবে */}
//                                         {isAssignedOrDone ? (
//                                             <div className="text-xs text-amber-400 mt-1 font-medium bg-amber-500/5 border border-amber-500/10 rounded-md py-1 px-2 inline-block">
//                                                 Donor: {req.donorName || 'Assigned'} ({req.donorEmail || 'No Email'})
//                                             </div>
//                                         ) : (
//                                             <p className="text-xs text-gray-500 mt-0.5">Posted by you</p>
//                                         )}
//                                     </div>

//                                     {/* Location */}
//                                     <div className="col-span-12 md:col-span-4 lg:col-span-2">
//                                         <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">LOCATION</p>
//                                         <p className="text-zinc-300 mt-0.5">
//                                             {req.district}{req.upazila ? `, ${req.upazila}` : ''}
//                                         </p>
//                                     </div>

//                                     {/* Schedule */}
//                                     <div className="col-span-12 md:col-span-4 lg:col-span-3">
//                                         <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">SCHEDULE</p>
//                                         <p className="text-zinc-300 mt-0.5">
//                                             {req.requiredDate || "24-06-2026"}
//                                             <span className="text-gray-500"> at {req.requiredTime || "10:00 AM"}</span>
//                                         </p>
//                                     </div>

//                                     {/* Need */}
//                                     <div className="col-span-12 md:col-span-4 lg:col-span-2">
//                                         <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">NEED</p>
//                                         <span className="inline-block bg-red-500/10 text-red-400 px-4 py-1 rounded-md font-bold text-sm mt-1">
//                                             {req.bloodGroup}
//                                         </span>
//                                     </div>

//                                     {/* Status */}
//                                     <div className="col-span-12 md:col-span-4 lg:col-span-1">
//                                         <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">STATUS</p>
//                                         <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-medium border ${
//                                             currentStatusClean === 'pending' 
//                                                 ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' 
//                                                 : currentStatusClean === 'canceled' || currentStatusClean === 'cancelled'
//                                                 ? 'bg-rose-500/10 text-rose-500 border-rose-500/20'
//                                                 : currentStatusClean === 'inprogress'
//                                                 ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
//                                                 : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
//                                         }`}>
//                                             • {statusString || 'Pending'}
//                                         </span>
//                                     </div>

//                                     {/* Actions */}
//                                     <div className="col-span-12 md:col-span-8 lg:col-span-1 flex flex-col items-end gap-3 pt-4 lg:pt-0"> 
//                                         <Link
//                                             href={`/donation-requests/${req._id}`}
//                                             className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
//                                         >
//                                             <FaEye /> View
//                                         </Link>
//                                         <button
//                                             onClick={() => alert('Delete feature coming soon')}
//                                             className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 text-sm font-medium transition-colors mt-1"
//                                         >
//                                             <FaTrash /> Delete
//                                         </button>
//                                     </div>

//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default RecentDonationRequests;



// 'use client';

// import React, { useEffect, useState } from 'react';
// import { getMyBloodRequests } from '@/lib/api/allBloodRequest';
// import { FaEye, FaTrash, FaEdit, FaCheckCircle, FaTimes } from 'react-icons/fa';
// import Link from 'next/link';

// const RecentDonationRequests = ({ userId, role }) => {
//     const [requests, setRequests] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [updatingId, setUpdatingId] = useState(null);

//     useEffect(() => {
//         if (!userId) return;

//         const fetchRecent = async () => {
//             try {
//                 setLoading(true);
//                 const data = await getMyBloodRequests(userId, 1, 3);
//                 setRequests(Array.isArray(data?.requests) ? data.requests : []);
//             } catch (error) {
//                 console.error("Failed to fetch recent requests:", error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchRecent();
//     }, [userId]);

//     const getCleanStatus = (rawStatus) => {
//         const statusString = typeof rawStatus === 'object' 
//             ? (rawStatus?.status || "") 
//             : (rawStatus || "");
//         return statusString.replace(/\s+/g, '').toLowerCase();
//     };

//     const handleStatusUpdate = async (requestId, newStatus) => {
//         if (updatingId) return;
//         setUpdatingId(requestId);

//         try {
//             // TODO: আপনার আসল API কল করুন
//             // await updateBloodRequestStatus(requestId, newStatus);
            
//             alert(`Request marked as: ${newStatus}`);
            
//             // Refresh list
//             const data = await getMyBloodRequests(userId, 1, 3);
//             setRequests(Array.isArray(data?.requests) ? data.requests : []);
//         } catch (error) {
//             console.error("Failed to update:", error);
//             alert("Update failed!");
//         } finally {
//             setUpdatingId(null);
//         }
//     };

//     return (
//         <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mt-8">
//             <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-semibold text-white">Recent Requests</h3>
//             </div>

//             {loading ? (
//                 <div className="py-12 text-center text-zinc-400">
//                     <span className="loading loading-spinner loading-md mb-2 block mx-auto text-red-500"></span>
//                     Loading recent requests...
//                 </div>
//             ) : requests.length === 0 ? (
//                 <div className="py-12 text-center text-zinc-400">
//                     No recent donation requests yet.
//                 </div>
//             ) : (
//                 <div className="space-y-4">
//                     {requests.map((req) => {
//                         const cleanStatus = getCleanStatus(req.status);
//                         const isPending = cleanStatus === 'pending';
//                         const isInProgress = cleanStatus === 'inprogress';
//                         const isDone = cleanStatus === 'done' || cleanStatus === 'completed';

//                         return (
//                             <div
//                                 key={req._id}
//                                 className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 hover:border-red-900/70 transition-all"
//                             >
//                                 <div className="grid grid-cols-12 gap-x-4 gap-y-5 items-start lg:items-center">
                                    
//                                     {/* Participants, Location, Schedule, Need, Status - Same as before */}
//                                     <div className="col-span-12 md:col-span-4 lg:col-span-3">
//                                         <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">PARTICIPANTS</p>
//                                         <p className="text-white font-medium text-base mt-0.5">{req.recipientName}</p>
//                                         {(isInProgress || isDone) ? (
//                                             <div className="text-xs text-amber-400 mt-1 font-medium bg-amber-500/5 border border-amber-500/10 rounded-md py-1 px-2 inline-block">
//                                                 Donor: {req.donorName || 'Assigned'} ({req.donorEmail || 'No Email'})
//                                             </div>
//                                         ) : (
//                                             <p className="text-xs text-gray-500 mt-0.5">Posted by you</p>
//                                         )}
//                                     </div>

//                                     <div className="col-span-12 md:col-span-4 lg:col-span-2">
//                                         <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">LOCATION</p>
//                                         <p className="text-zinc-300 mt-0.5">
//                                             {req.district}{req.upazila ? `, ${req.upazila}` : ''}
//                                         </p>
//                                     </div>

//                                     <div className="col-span-12 md:col-span-4 lg:col-span-3">
//                                         <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">SCHEDULE</p>
//                                         <p className="text-zinc-300 mt-0.5">
//                                             {req.requiredDate || "24-06-2026"}
//                                             <span className="text-gray-500"> at {req.requiredTime || "10:00 AM"}</span>
//                                         </p>
//                                     </div>

//                                     <div className="col-span-12 md:col-span-4 lg:col-span-2">
//                                         <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">NEED</p>
//                                         <span className="inline-block bg-red-500/10 text-red-400 px-4 py-1 rounded-md font-bold text-sm mt-1">
//                                             {req.bloodGroup}
//                                         </span>
//                                     </div>

//                                     <div className="col-span-12 md:col-span-4 lg:col-span-1">
//                                         <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">STATUS</p>
//                                         <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-medium border ${
//                                             isPending ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
//                                             isInProgress ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
//                                             'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
//                                         }`}>
//                                             • {typeof req.status === 'object' ? req.status?.status : req.status || 'Pending'}
//                                         </span>
//                                     </div>

//                                     {/* ==================== Actions (Fixed) ==================== */}
//                                     <div className="col-span-12 md:col-span-8 lg:col-span-1 flex flex-col items-end gap-3 pt-4 lg:pt-0">
                                        
//                                         {/* Pending Status */}
//                                         {isPending && (
//                                             <>
//                                                 <Link
//                                                     href={`/donation-requests/${req._id}/edit`}
//                                                     className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-sm font-medium transition-colors"
//                                                 >
//                                                     <FaEdit /> Edit
//                                                 </Link>
//                                                 <Link
//                                                     href={`/donation-requests/${req._id}`}
//                                                     className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
//                                                 >
//                                                     <FaEye /> View
//                                                 </Link>
//                                             </>
//                                         )}

//                                         {/* In Progress Status */}
//                                         {isInProgress && (
//                                             <>
//                                                 <button
//                                                     onClick={() => handleStatusUpdate(req._id, 'Done')}
//                                                     disabled={updatingId === req._id}
//                                                     className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors disabled:opacity-50"
//                                                 >
//                                                     <FaCheckCircle /> Done
//                                                 </button>
//                                                 <button
//                                                     onClick={() => handleStatusUpdate(req._id, 'Canceled')}
//                                                     disabled={updatingId === req._id}
//                                                     className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 text-sm font-medium transition-colors disabled:opacity-50"
//                                                 >
//                                                     <FaTimes /> Cancel
//                                                 </button>
//                                             </>
//                                         )}

//                                         {/* Done Status */}
//                                         {isDone && (
//                                             <div className="text-emerald-400 text-sm font-medium flex items-center gap-1.5 py-1">
//                                                 <FaCheckCircle /> Already Done
//                                             </div>
//                                         )}

//                                         {/* Delete Button - Only for Pending (আপনি চাইলে পরে পরিবর্তন করতে পারবেন) */}
//                                         {isPending && (
//                                             <button
//                                                 onClick={() => alert('Delete feature coming soon')}
//                                                 className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 text-sm font-medium transition-colors mt-1"
//                                             >
//                                                 <FaTrash /> Delete
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default RecentDonationRequests;


// 'use client';

// import React, { useEffect, useState } from 'react';
// import { getMyBloodRequests } from '@/lib/api/allBloodRequest';
// import { FaEye, FaTrash, FaEdit, FaCheckCircle, FaTimes, FaSave } from 'react-icons/fa';
// import Link from 'next/link';

// // TODO: এই API গুলো আপনার প্রজেক্টে তৈরি করুন (যদি না থাকে)
// import { updateBloodRequest, deleteBloodRequest } from '@/lib/api/allBloodRequest'; // আপনার API path অনুযায়ী চেঞ্জ করবেন

// const RecentDonationRequests = ({ userId, role }) => {
//     const [requests, setRequests] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [updatingId, setUpdatingId] = useState(null);
//     const [editingId, setEditingId] = useState(null);
//     const [editForm, setEditForm] = useState({});

//     useEffect(() => {
//         if (!userId) return;
//         fetchRequests();
//     }, [userId]);

//     const fetchRequests = async () => {
//         try {
//             setLoading(true);
//             const data = await getMyBloodRequests(userId, 1, 3);
//             setRequests(Array.isArray(data?.requests) ? data.requests : []);
//         } catch (error) {
//             console.error("Failed to fetch requests:", error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const getCleanStatus = (rawStatus) => {
//         const statusString = typeof rawStatus === 'object' 
//             ? (rawStatus?.status || "") 
//             : (rawStatus || "");
//         return statusString.replace(/\s+/g, '').toLowerCase();
//     };

//     // ==================== EDIT HANDLERS ====================
//     const startEditing = (req) => {
//         setEditingId(req._id);
//         setEditForm({
//             requiredDate: req.requiredDate,
//             requiredTime: req.requiredTime,
//             district: req.district,
//             upazila: req.upazila || '',
//             bloodGroup: req.bloodGroup,
//         });
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setEditForm(prev => ({ ...prev, [name]: value }));
//     };

//     const saveEdit = async (id) => {
//         setUpdatingId(id);
//         try {
//             await updateBloodRequest(id, editForm);   // আপনার API কল
//             alert("Request updated successfully!");
//             setEditingId(null);
//             fetchRequests(); // Refresh
//         } catch (error) {
//             console.error(error);
//             alert("Failed to update request");
//         } finally {
//             setUpdatingId(null);
//         }
//     };

//     const cancelEdit = () => {
//         setEditingId(null);
//         setEditForm({});
//     };

//     // ==================== OTHER ACTIONS ====================
//     const handleStatusUpdate = async (id, newStatus) => {
//         setUpdatingId(id);
//         try {
//             await updateBloodRequest(id, { status: newStatus });
//             alert(`Request marked as ${newStatus}`);
//             fetchRequests();
//         } catch (error) {
//             console.error(error);
//             alert("Failed to update status");
//         } finally {
//             setUpdatingId(null);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (!confirm("Are you sure you want to delete this request?")) return;
        
//         setUpdatingId(id);
//         try {
//             await deleteBloodRequest(id);
//             alert("Request deleted successfully");
//             fetchRequests();
//         } catch (error) {
//             console.error(error);
//             alert("Failed to delete request");
//         } finally {
//             setUpdatingId(null);
//         }
//     };

//     return (
//         <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mt-8">
//             <div className="flex justify-between items-center mb-6">
//                 <h3 className="text-xl font-semibold text-white">Recent Requests</h3>
//             </div>

//             {loading ? (
//                 <div className="py-12 text-center text-zinc-400">Loading...</div>
//             ) : requests.length === 0 ? (
//                 <div className="py-12 text-center text-zinc-400">No recent requests yet.</div>
//             ) : (
//                 <div className="space-y-4">
//                     {requests.map((req) => {
//                         const cleanStatus = getCleanStatus(req.status);
//                         const isPending = cleanStatus === 'pending';
//                         const isInProgress = cleanStatus === 'inprogress';
//                         const isDone = cleanStatus === 'done' || cleanStatus === 'completed';
//                         const isEditing = editingId === req._id;

//                         return (
//                             <div key={req._id} className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 hover:border-red-900/70 transition-all">
//                                 <div className="grid grid-cols-12 gap-x-4 gap-y-5 items-start lg:items-center">

//                                     {/* Participants */}
//                                     <div className="col-span-12 md:col-span-4 lg:col-span-3">
//                                         <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">PARTICIPANTS</p>
//                                         <p className="text-white font-medium text-base mt-0.5">{req.recipientName}</p>
//                                         {(isInProgress || isDone) && (
//                                             <div className="text-xs text-amber-400 mt-1 font-medium bg-amber-500/5 border border-amber-500/10 rounded-md py-1 px-2 inline-block">
//                                                 Donor: {req.donorName || 'Assigned'}
//                                             </div>
//                                         )}
//                                     </div>

//                                     {/* Editable Fields */}
//                                     <div className="col-span-12 md:col-span-4 lg:col-span-2">
//                                         <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">LOCATION</p>
//                                         {isEditing ? (
//                                             <div className="space-y-2 mt-1">
//                                                 <input type="text" name="district" value={editForm.district} onChange={handleInputChange}
//                                                     className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-1 text-sm" />
//                                                 <input type="text" name="upazila" value={editForm.upazila} onChange={handleInputChange}
//                                                     className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-1 text-sm" placeholder="Upazila" />
//                                             </div>
//                                         ) : (
//                                             <p className="text-zinc-300 mt-0.5">
//                                                 {req.district}{req.upazila ? `, ${req.upazila}` : ''}
//                                             </p>
//                                         )}
//                                     </div>

//                                     <div className="col-span-12 md:col-span-4 lg:col-span-3">
//                                         <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">SCHEDULE</p>
//                                         {isEditing ? (
//                                             <div className="flex gap-2 mt-1">
//                                                 <input type="date" name="requiredDate" value={editForm.requiredDate} onChange={handleInputChange}
//                                                     className="bg-zinc-900 border border-zinc-700 rounded px-3 py-1 text-sm" />
//                                                 <input type="time" name="requiredTime" value={editForm.requiredTime} onChange={handleInputChange}
//                                                     className="bg-zinc-900 border border-zinc-700 rounded px-3 py-1 text-sm" />
//                                             </div>
//                                         ) : (
//                                             <p className="text-zinc-300 mt-0.5">
//                                                 {req.requiredDate} <span className="text-gray-500">at {req.requiredTime}</span>
//                                             </p>
//                                         )}
//                                     </div>

//                                     <div className="col-span-12 md:col-span-4 lg:col-span-2">
//                                         <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">NEED</p>
//                                         {isEditing ? (
//                                             <select name="bloodGroup" value={editForm.bloodGroup} onChange={handleInputChange}
//                                                 className="bg-zinc-900 border border-zinc-700 rounded px-3 py-1 text-sm mt-1">
//                                                 {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => (
//                                                     <option key={g} value={g}>{g}</option>
//                                                 ))}
//                                             </select>
//                                         ) : (
//                                             <span className="inline-block bg-red-500/10 text-red-400 px-4 py-1 rounded-md font-bold text-sm mt-1">
//                                                 {req.bloodGroup}
//                                             </span>
//                                         )}
//                                     </div>

//                                     {/* Status */}
//                                     <div className="col-span-12 md:col-span-4 lg:col-span-1">
//                                         <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">STATUS</p>
//                                         <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-medium border ${isPending ? 'bg-amber-500/10 text-amber-500' : isInProgress ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-500'}`}>
//                                             • {typeof req.status === 'object' ? req.status?.status : req.status || 'Pending'}
//                                         </span>
//                                     </div>

//                                     {/* Actions */}
//                                     <div className="col-span-12 md:col-span-8 lg:col-span-1 flex flex-col items-end gap-2 pt-4 lg:pt-0">
//                                         {isEditing ? (
//                                             <>
//                                                 <button onClick={() => saveEdit(req._id)} disabled={updatingId === req._id}
//                                                     className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 text-sm font-medium">
//                                                     <FaSave /> Save
//                                                 </button>
//                                                 <button onClick={cancelEdit} className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-300 text-sm font-medium">
//                                                     Cancel
//                                                 </button>
//                                             </>
//                                         ) : (
//                                             <>
//                                                 {isPending && (
//                                                     <>
//                                                         <button onClick={() => startEditing(req)}
//                                                             className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-sm font-medium">
//                                                             <FaEdit /> Edit
//                                                         </button>
//                                                         <Link href={`/donation-requests/${req._id}`}
//                                                             className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm font-medium">
//                                                             <FaEye /> View
//                                                         </Link>
//                                                     </>
//                                                 )}

//                                                 {isInProgress && (
//                                                     <>
//                                                         <button onClick={() => handleStatusUpdate(req._id, 'Done')}
//                                                             disabled={updatingId === req._id}
//                                                             className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 text-sm font-medium">
//                                                             <FaCheckCircle /> Done
//                                                         </button>
//                                                         <button onClick={() => handleStatusUpdate(req._id, 'Canceled')}
//                                                             disabled={updatingId === req._id}
//                                                             className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 text-sm font-medium">
//                                                             <FaTimes /> Cancel
//                                                         </button>
//                                                     </>
//                                                 )}

//                                                 {isDone && (
//                                                     <div className="text-emerald-400 text-sm font-medium flex items-center gap-1.5">
//                                                         <FaCheckCircle /> Already Done
//                                                     </div>
//                                                 )}

//                                                 {isPending && (
//                                                     <button onClick={() => handleDelete(req._id)}
//                                                         disabled={updatingId === req._id}
//                                                         className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 text-sm font-medium">
//                                                         <FaTrash /> Delete
//                                                     </button>
//                                                 )}
//                                             </>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default RecentDonationRequests;



'use client';

import React, { useEffect, useState } from 'react';
import { getMyBloodRequests, updateBloodRequest, deleteBloodRequest } from '@/lib/api/allBloodRequest';
import { FaEye, FaTrash, FaEdit, FaCheckCircle, FaTimes, FaSave } from 'react-icons/fa';
import Link from 'next/link';

const RecentDonationRequests = ({ userId, role }) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});

    useEffect(() => {
        if (!userId) return;
        fetchRequests();
    }, [userId]);

    const fetchRequests = async () => {
        try {
            setLoading(true);
            const data = await getMyBloodRequests(userId, 1, 3);
            setRequests(Array.isArray(data?.requests) ? data.requests : []);
        } catch (error) {
            console.error("Failed to fetch requests:", error);
        } finally {
            setLoading(false);
        }
    };

    const getCleanStatus = (rawStatus) => {
        const statusString = typeof rawStatus === 'object' 
            ? (rawStatus?.status || "") 
            : (rawStatus || "");
        return statusString.replace(/\s+/g, '').toLowerCase();
    };

    // ==================== EDIT HANDLERS ====================
    const startEditing = (req) => {
        setEditingId(req._id);
        setEditForm({
            requiredDate: req.requiredDate,
            requiredTime: req.requiredTime,
            district: req.district,
            upazila: req.upazila || '',
            bloodGroup: req.bloodGroup,
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({ ...prev, [name]: value }));
    };

    const saveEdit = async (id) => {
        setUpdatingId(id);
        try {
            await updateBloodRequest(id, editForm);
            alert("Request updated successfully!");
            setEditingId(null);
            fetchRequests();
        } catch (error) {
            console.error(error);
            alert("Failed to update request");
        } finally {
            setUpdatingId(null);
        }
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    // ==================== OTHER ACTIONS ====================
    const handleStatusUpdate = async (id, newStatus) => {
        setUpdatingId(id);
        try {
            await updateBloodRequest(id, { status: newStatus });
            alert(`Request marked as ${newStatus}`);
            fetchRequests();
        } catch (error) {
            console.error(error);
            alert("Failed to update status");
        } finally {
            setUpdatingId(null);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this request?")) return;
        
        setUpdatingId(id);
        try {
            await deleteBloodRequest(id);
            alert("Request deleted successfully");
            fetchRequests();
        } catch (error) {
            console.error(error);
            alert("Failed to delete request");
        } finally {
            setUpdatingId(null);
        }
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mt-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-white">Recent Requests</h3>
            </div>

            {loading ? (
                <div className="py-12 text-center text-zinc-400">Loading...</div>
            ) : requests.length === 0 ? (
                <div className="py-12 text-center text-zinc-400">No recent requests yet.</div>
            ) : (
                <div className="space-y-4">
                    {requests.map((req) => {
                        const cleanStatus = getCleanStatus(req.status);
                        const isPending = cleanStatus === 'pending';
                        const isInProgress = cleanStatus === 'inprogress';
                        const isDone = cleanStatus === 'done' || cleanStatus === 'completed';
                        const isCanceled = cleanStatus === 'canceled' || cleanStatus === 'cancelled';
                        const isEditing = editingId === req._id;

                        return (
                            <div key={req._id} className="bg-zinc-950 border border-zinc-800 rounded-xl p-5 hover:border-red-900/70 transition-all">
                                <div className="grid grid-cols-12 gap-x-4 gap-y-5 items-start lg:items-center">

                                    {/* Participants */}
                                    <div className="col-span-12 md:col-span-4 lg:col-span-3">
                                        <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">PARTICIPANTS</p>
                                        <p className="text-white font-medium text-base mt-0.5">{req.recipientName}</p>
                                        {(isInProgress || isDone) && (
                                            <div className="text-xs text-amber-400 mt-1 font-medium bg-amber-500/5 border border-amber-500/10 rounded-md py-1 px-2 inline-block">
                                                Donor: {req.donorName || 'Assigned'}
                                            </div>
                                        )}
                                    </div>

                                    {/* Location */}
                                    <div className="col-span-12 md:col-span-4 lg:col-span-2">
                                        <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">LOCATION</p>
                                        {isEditing ? (
                                            <div className="space-y-2 mt-1">
                                                <input type="text" name="district" value={editForm.district} onChange={handleInputChange}
                                                    className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-1 text-sm" />
                                                <input type="text" name="upazila" value={editForm.upazila} onChange={handleInputChange}
                                                    className="w-full bg-zinc-900 border border-zinc-700 rounded px-3 py-1 text-sm" placeholder="Upazila" />
                                            </div>
                                        ) : (
                                            <p className="text-zinc-300 mt-0.5">
                                                {req.district}{req.upazila ? `, ${req.upazila}` : ''}
                                            </p>
                                        )}
                                    </div>

                                    {/* Schedule */}
                                    <div className="col-span-12 md:col-span-4 lg:col-span-3">
                                        <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">SCHEDULE</p>
                                        {isEditing ? (
                                            <div className="flex gap-2 mt-1">
                                                <input type="date" name="requiredDate" value={editForm.requiredDate} onChange={handleInputChange}
                                                    className="bg-zinc-900 border border-zinc-700 rounded px-3 py-1 text-sm" />
                                                <input type="time" name="requiredTime" value={editForm.requiredTime} onChange={handleInputChange}
                                                    className="bg-zinc-900 border border-zinc-700 rounded px-3 py-1 text-sm" />
                                            </div>
                                        ) : (
                                            <p className="text-zinc-300 mt-0.5">
                                                {req.requiredDate} <span className="text-gray-500">at {req.requiredTime}</span>
                                            </p>
                                        )}
                                    </div>

                                    {/* Blood Group */}
                                    <div className="col-span-12 md:col-span-4 lg:col-span-2">
                                        <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">NEED</p>
                                        {isEditing ? (
                                            <select name="bloodGroup" value={editForm.bloodGroup} onChange={handleInputChange}
                                                className="bg-zinc-900 border border-zinc-700 rounded px-3 py-1 text-sm mt-1">
                                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => (
                                                    <option key={g} value={g}>{g}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <span className="inline-block bg-red-500/10 text-red-400 px-4 py-1 rounded-md font-bold text-sm mt-1">
                                                {req.bloodGroup}
                                            </span>
                                        )}
                                    </div>

                                    {/* Status - Updated with Canceled color */}
                                    <div className="col-span-12 md:col-span-4 lg:col-span-1">
                                        <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider mb-1">STATUS</p>
                                        <span className={`inline-block px-3 py-0.5 rounded-full text-xs font-medium border 
                                            ${isPending 
                                                ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' 
                                                : isInProgress 
                                                ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' 
                                                : isCanceled 
                                                ? 'bg-rose-500/10 text-rose-500 border-rose-500/20' 
                                                : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                                            }`}>
                                            • {typeof req.status === 'object' ? req.status?.status : req.status || 'Pending'}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="col-span-12 md:col-span-8 lg:col-span-1 flex flex-col items-end gap-2 pt-4 lg:pt-0">
                                        {isEditing ? (
                                            <>
                                                <button 
                                                    onClick={() => saveEdit(req._id)} 
                                                    disabled={updatingId === req._id}
                                                    className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 text-sm font-medium"
                                                >
                                                    <FaSave /> Save
                                                </button>
                                                <button 
                                                    onClick={cancelEdit} 
                                                    className="flex items-center gap-1.5 text-zinc-400 hover:text-zinc-300 text-sm font-medium"
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                {isPending && (
                                                    <>
                                                        <button onClick={() => startEditing(req)}
                                                            className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 text-sm font-medium">
                                                            <FaEdit /> Edit
                                                        </button>
                                                        <Link href={`/donation-requests/${req._id}`}
                                                            className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-sm font-medium">
                                                            <FaEye /> View
                                                        </Link>
                                                    </>
                                                )}

                                                {isInProgress && (
                                                    <>
                                                        <button onClick={() => handleStatusUpdate(req._id, 'Done')}
                                                            disabled={updatingId === req._id}
                                                            className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 text-sm font-medium">
                                                            <FaCheckCircle /> Done
                                                        </button>
                                                        <button onClick={() => handleStatusUpdate(req._id, 'Canceled')}
                                                            disabled={updatingId === req._id}
                                                            className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 text-sm font-medium">
                                                            <FaTimes /> Cancel
                                                        </button>
                                                    </>
                                                )}

                                                {isDone && (
                                                    <div className="text-emerald-400 text-sm font-medium flex items-center gap-1.5">
                                                        <FaCheckCircle /> Already Done
                                                    </div>
                                                )}

                                                {isCanceled && (
                                                    <div className="text-rose-400 text-sm font-medium flex items-center gap-1.5">
                                                        <FaTimes /> Canceled
                                                    </div>
                                                )}

                                                {isPending && (
                                                    <button onClick={() => handleDelete(req._id)}
                                                        disabled={updatingId === req._id}
                                                        className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 text-sm font-medium">
                                                        <FaTrash /> Delete
                                                    </button>
                                                )}
                                            </>
                                        )}
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