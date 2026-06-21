'use client';

import React, { useEffect, useState } from 'react';
import { getMyBloodRequests } from '@/lib/api/allBloodRequest';
import EditRequestModal from './EditRequestModal'; 
// ডাইনামিক লিংকের জন্য Next.js এর Link কম্পোনেন্ট ইম্পোর্ট করা হলো
import Link from 'next/link';

const MyDonationRequestsTable = ({ userId, role, statusFilter }) => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // ডপডাউন মেনু ট্রাক করার স্টেট (রো আইডি)
  const [activeDropdown, setActiveDropdown] = useState(null);

  // মোডাল স্টেট ম্যানেজমেন্ট
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRequests, setTotalRequests] = useState(0);
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

  // 🛠️ ফিক্সড ফিল্টারিং লজিক: স্পেস এবং ছোট-বড় হাতের অক্ষরের ঝামেলা দূর করা হয়েছে
  const filteredRequests = requests.filter((request) => {
    if (!statusFilter || statusFilter === 'All Status') return true;
    
    // ড্রপডাউন এবং ডাটার স্ট্যাটাস থেকে সব স্পেস বাদ দিয়ে এবং ছোট হাতের অক্ষরে রূপান্তর করে চেক করা হচ্ছে
    const cleanFilter = statusFilter.replace(/\s+/g, '').toLowerCase();
    const cleanStatus = (request.status || '').replace(/\s+/g, '').toLowerCase();
    
    return cleanStatus === cleanFilter;
  });

  // ফিল্টার করা ডাটার ওপর ভিত্তি করে পেজিনেশন ক্যালকুলেশন
  const totalFilteredRequests = filteredRequests.length;
  const totalPages = Math.ceil(totalFilteredRequests / itemsPerPage);

  // বর্তমান পেজের জন্য ডাটা স্লাইস (Slice) করা
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDisplayedRequests = filteredRequests.slice(indexOfFirstItem, indexOfLastItem);

  // ফিল্টার চেঞ্জ হলে পেজ ১ নম্বরে রিসেট হবে
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
              {currentDisplayedRequests.map((request) => (
                <tr key={request._id} className="hover:bg-zinc-800/30 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-zinc-200">{request.recipientName}</div>
                    <div className="text-xs text-zinc-500">Posted by you</div>
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
                      request.status === 'Pending' 
                        ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' 
                        : request.status === 'Cancelled'
                        ? 'bg-rose-500/10 text-rose-500 border-rose-500/20'
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
                          
                          {/* 🔗 View Details বাটনটিকে dynamic Link কম্পোনেন্টে রূপান্তর করা হয়েছে */}
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
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination UI */}
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

      {/* Reusable Modal Component Connection */}
      <EditRequestModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        requestData={selectedRequest}
        onUpdateSuccess={handleUpdateSuccess}
      />
    </div>
  );
};

export default MyDonationRequestsTable;