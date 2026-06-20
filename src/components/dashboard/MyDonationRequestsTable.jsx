'use client';

import React, { useEffect, useState } from 'react';
import { getMyBloodRequests } from '@/lib/api/allBloodRequest';

const MyDonationRequestsTable = ({ userId, role }) => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      getMyBloodRequests(userId)
        .then((data) => {
          setRequests(Array.isArray(data) ? data : []);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching requests:", err);
          setIsLoading(false);
        });
    }
  }, [userId]);

  return (
    <div className="mt-8 overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
      {isLoading ? (
        <div className="p-10 text-center text-zinc-400">
          <span className="loading loading-spinner loading-md mb-2 block mx-auto text-red-500"></span>
          Loading your blood requests...
        </div>
      ) : requests.length === 0 ? (
        <div className="p-10 text-center text-zinc-400">
          No blood donation requests found for this {role || 'user'}.
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
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {requests.map((request) => (
              <tr key={request._id} className="hover:bg-zinc-800/30 transition-colors">
                <td className="p-4">
                  <div className="font-bold text-zinc-200">{request.recipientName}</div>
                  <div className="text-xs text-zinc-500">{request.hospitalName}</div>
                </td>
                <td className="p-4">
                  <span className="inline-block px-2.5 py-1 rounded-md bg-red-500/10 text-red-400 font-bold">
                    {request.bloodGroup}
                  </span>
                </td>
                <td className="p-4">
                  <div className="text-zinc-300">{request.upazila}, {request.district}</div>
                  <div className="text-xs text-zinc-500">{request.division}</div>
                </td>
                <td className="p-4">
                  <div className="text-zinc-300">{request.requiredDate}</div>
                  <div className="text-xs text-zinc-500">{request.requiredTime}</div>
                </td>
                <td className="p-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    request.status === 'Pending' 
                      ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                      : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                  }`}>
                    {request.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyDonationRequestsTable;