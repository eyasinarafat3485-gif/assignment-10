'use client';

import React, { useEffect, useState } from 'react';
import { getMyBloodRequests, updateRequestStatus } from '@/lib/api/allBloodRequest';
import EditRequestModal from './EditRequestModal'; 
// ডাইনামিক লিংকের জন্য Next.js এর Link কম্পোনেন্ট ইম্পোর্ট করা হলো
import Link from 'next/link';
import { deleteBloodRequest } from '@/lib/actions/allBloods';

const MyDonationRequestsTable = ({ userId, role, statusFilter }) => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // ড্রপডাউন মেনু ট্রাক করার স্টেট (রো আইডি)
  const [activeDropdown, setActiveDropdown] = useState(null);

  // মোডাল স্টেট ম্যানেজমেন্ট (Edit Modal)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // 🛠️ [রিকোয়ারমেন্ট]: ডিলিট কনফার্মেশন মোডালের জন্য স্টেটসমূহ
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Pagination States (আপনার অরিজিনাল কোডের স্টেট)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  const fetchRequests = () => {
    if (userId) {
      setIsLoading(true);
      getMyBloodRequests(userId, 1, 1000) 
        .then((data) => {
          setRequests(Array.isArray(data?.requests) ? data.requests : []);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching requests:", err);
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [userId]);

  // 🛠️ [রিকোয়ারমেন্ট]: Status Update করার ফাংশন (Done / Cancelled এর জন্য)
 const handleStatusUpdate = async (requestId, newStatus) => {
  try {
    // 🛠️ আপনার তৈরি করা ডেডিকেটেড লিভ ফাংশনটি কল করা হলো
    const result = await updateRequestStatus(requestId, newStatus);

    // ব্যাকএন্ডে সাকসেসফুলি সেভ হলে তবেই কেবল ফ্রন্টএন্ড স্টেট আপডেট হবে
    if (result) {
      setRequests((prevRequests) =>
        prevRequests.map((req) => 
          req._id === requestId ? { ...req, status: newStatus } : req
        )
      );
      setActiveDropdown(null); // ড্রপডাউন বন্ধ করার জন্য
    }
  } catch (error) {
    console.error("Error updating status via lib function:", error);
    alert("Could not update status. Please try again.");
  }
};

  // 🛠️ [রিকোয়ারমেন্ট]: Request Delete করার কনফার্মেশন ফাংশন
  const handleConfirmDelete = async () => {
    if (!requestToDelete) return;
    setIsDeleting(true);
    try {
      // 🟢 আপনার নতুন রিফ্যাক্টর করা সার্ভার অ্যাকশন কল করা হলো
      const data = await deleteBloodRequest(requestToDelete);
      
      // ব্যাকএন্ডে সফলভাবে ডিলিট হলে (deletedCount > 0) স্টেট থেকে বাদ যাবে
      if (data && data.deletedCount > 0) {
        setRequests((prevRequests) => prevRequests.filter((req) => req._id !== requestToDelete));
        setIsDeleteModalOpen(false);
        setRequestToDelete(null);
      } else {
        alert("Failed to delete the request from server.");
      }
    } catch (error) {
      console.error("Error deleting request:", error);
      alert("Something went wrong while deleting.");
    } finally {
      setIsDeleting(false);
    }
  };

  // 🛠️ আপনার অরিজিনাল ফিক্সড ফিল্টারিং লজিক (হুবহু অপরিবর্তিত)
 // ✅ Updated Filtering Logic (Canceled/Cancelled সাপোর্ট সহ)
const filteredRequests = requests.filter((request) => {
  if (!statusFilter || statusFilter === 'All Status') return true;
  
  const cleanFilter = statusFilter.replace(/\s+/g, '').toLowerCase();
  const cleanStatus = (request.status || '').replace(/\s+/g, '').toLowerCase();

  // Canceled / Cancelled এর জন্য বিশেষ হ্যান্ডলিং
  if (cleanFilter === 'canceled' || cleanFilter === 'cancelled') {
    return cleanStatus === 'canceled' || cleanStatus === 'cancelled';
  }

  // অন্য সব স্ট্যাটাসের জন্য সাধারণ ম্যাচিং
  return cleanStatus === cleanFilter;
});

  // ফিল্টার করা ডাটার ওপর ভিত্তি করে পেজিনেশন ক্যালকুলেশন (আপনার কোডের লজিক)
  const totalFilteredRequests = filteredRequests.length;
  const totalPages = Math.ceil(totalFilteredRequests / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDisplayedRequests = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);

  // ফিল্টার চেঞ্চ হলে পেজ ১ নম্বরে রিসেট হবে (আপনার কোডের লজিক)
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  const handleUpdateSuccess = (updatedData) => {
    setRequests((prevRequests) =>
      prevRequests.map((req) => (req._id === updatedData._id ? { ...req, ...updatedData } : req))
    );
  };

  const startResult = totalFilteredRequests === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endResult = Math.min(currentPage * itemsPerPage, totalFilteredRequests);

  return (
    <div className="relative ml-8 mr-8">
      <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
        {isLoading ? (
          <div className="p-10 text-center text-zinc-400">
            <span className="loading loading-spinner loading-md mb-2 block mx-auto text-red-500"></span>
            Loading your blood requests...
          </div>
        ) : currentDisplayedRequests.length === 0 ? (
          <div className="p-10 text-center text-zinc-400">
            No {statusFilter !== 'All Status' ? statusFilter : ''} blood donation requests found.
          </div>
        ) : (
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900 text-zinc-400 uppercase font-semibold">
                <th className="p-4">Recipient</th>
                <th className="p-4">Blood Group</th>
                <th className="p-4">Location</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {currentDisplayedRequests.map((request) => {
                // স্ট্যাটাস ম্যাচিং সহজ করার জন্য সেফটি ভেরিয়েবল তৈরি করা হলো
                const currentStatusClean = (request.status || '').replace(/\s+/g, '').toLowerCase();

                return (
                  <tr key={request._id} className="hover:bg-zinc-800/30 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-zinc-200">{request.recipientName}</div>
                      
                      {/* 🛠️ [রিকোয়ারমেন্ট]: স্ট্যাটাস 'In Progress' হলে ডোনার ইনফো (নাম ও ইমেইল) দেখাবে, অন্যথায় Posted by you */}
                      {currentStatusClean === 'inprogress' && request.donorName ? (
                        <div className="text-xs text-amber-400 mt-0.5 font-medium">
                          Donor: {request.donorName} ({request.donorEmail || 'N/A'})
                        </div>
                      ) : (
                        <div className="text-xs text-zinc-500">Posted by you</div>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 font-bold">
                        {request.bloodGroup}
                      </span>
                    </td>
                    <td className="p-4 text-zinc-300">
                      <div>{request.district}</div>
                      <div className="text-xs text-zinc-500">{request.upazila}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-zinc-300">{request.requiredDate || "24-06-2026"}</div>
                      <div className="text-xs text-zinc-500">{request.requiredTime || "10:00 AM"}</div>
                    </td>
                    <td className="p-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${
                        currentStatusClean === 'pending' 
                          ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' 
                          : currentStatusClean === 'canceled' || currentStatusClean === 'cancelled'
                          ? 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                          : currentStatusClean === 'inprogress'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                      }`}>
                        • {request.status}
                      </span>
                    </td>
                    
                    {/* --- Actions Dropdown Column --- */}
                    <td className="p-4 text-center relative">
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === request._id ? null : request._id)}
                        className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-all"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                      </button>

                      {/* Dropdown Menu Overlay */}
                      {activeDropdown === request._id && (
                        <>
                          <div className="fixed inset-0 z-10" onClick={() => setActiveDropdown(null)}></div>
                          <div className="absolute right-4 mt-1 w-44 rounded-xl border border-zinc-800 bg-zinc-950 p-1.5 shadow-xl z-20 text-left">
                            
                            {/* View Details Link (হুবহু অপরিবর্তিত) */}
                            <Link 
                              href={`/donation-requests/${request._id}`}
                              onClick={() => setActiveDropdown(null)}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-900 font-medium transition-all"
                            >
                              <svg xmlns="http://www.w3.org/2000/xl" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-blue-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              View Details
                            </Link>

                            {/* 🛠️ [রিকোয়ারমেন্ট]: স্ট্যাটাস 'In Progress' হলেই কেবল Done এবং Cancel বাটন দুটি মেনুতে আসবে */}
                            {currentStatusClean === 'inprogress' && (
                              <>
                                <button 
                                  onClick={() => handleStatusUpdate(request._id, 'Done')}
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-900 font-medium transition-all"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-emerald-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  Done
                                </button>
                                <button 
                                  onClick={() => handleStatusUpdate(request._id, 'Canceled')}
                                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-900 font-medium transition-all"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-rose-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  Cancel
                                </button>
                              </>
                            )}

                            {/* Edit Request Button (হুবহু অপরিবর্তিত) */}
                            <button 
                              onClick={() => {
                                setSelectedRequest(request);
                                setIsModalOpen(true);
                                setActiveDropdown(null);
                              }}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-zinc-300 hover:bg-zinc-900 font-medium transition-all"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-amber-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                              </svg>
                              Edit Request
                            </button>

                            {/* 🛠️ [রিকোয়ারমেন্ট]: Delete Request বাটন */}
                            <button 
                              onClick={() => {
                                setRequestToDelete(request._id);
                                setIsDeleteModalOpen(true);
                                setActiveDropdown(null);
                              }}
                              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-xs text-rose-400 hover:bg-rose-950/30 font-medium transition-all"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                              </svg>
                              Delete Request
                            </button>

                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination UI (হুবহু আপনার অরিজিনাল কোডের স্ট্রাকচার ও লজিক) */}
      {!isLoading && totalFilteredRequests > 0 && (
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
          <div className="text-sm text-zinc-400">
            Showing <span className="font-semibold text-zinc-200">{startResult}</span> to{' '}
            <span className="font-semibold text-zinc-200">{endResult}</span> of{' '}
            <span className="font-semibold text-zinc-200">{totalFilteredRequests}</span> results
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-zinc-200 disabled:opacity-40"
            >
              &lt;
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`w-9 h-9 rounded-lg text-sm font-semibold ${
                  currentPage === index + 1 ? 'bg-red-500 text-white' : 'border border-zinc-800 text-zinc-400'
                }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:text-zinc-200 disabled:opacity-40"
            >
              &gt;
            </button>
          </div>
        </div>
      )}

      {/* Reusable Edit Modal (হুবহু অপরিবর্তিত) */}
      <EditRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        requestData={selectedRequest}
        onUpdateSuccess={handleUpdateSuccess}
      />

      {/* 🛠 *[নতুন যুক্ত করা হয়েছে]* [রিকোয়ারমেন্ট]: ডিলিট কনফার্মেশন মোডাল UI */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl border border-zinc-800 bg-zinc-950 p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-zinc-200">Delete Donation Request?</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Are you sure you want to delete this blood donation request? This action cannot be undone.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setRequestToDelete(null);
                }}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg border border-zinc-800 text-xs font-semibold text-zinc-400 hover:bg-zinc-900 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg bg-rose-600 text-xs font-semibold text-white hover:bg-rose-700 transition-all disabled:opacity-50"
              >
                {isDeleting ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyDonationRequestsTable;