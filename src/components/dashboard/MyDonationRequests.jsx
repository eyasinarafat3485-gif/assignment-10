'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from '@/lib/auth-client';
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaSpinner
} from 'react-icons/fa';
import { getUserBloodRequests } from '@/lib/actions/allBloods';

const MyDonationRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { data: session } = useSession();
  const user = session?.user;

  // Fetch user's donation requests
  useEffect(() => {
    const fetchRequests = async () => {
      if (!user?._id && !user?.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getUserBloodRequests(user._id || user.id);
        setRequests(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load your requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  const getStatusBadge = (status) => {
    const statusLower = status?.toLowerCase();
    if (statusLower === 'pending') {
      return (
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
          Pending
        </span>
      );
    }
    if (statusLower === 'approved' || statusLower === 'fulfilled') {
      return (
        <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
          {status}
        </span>
      );
    }
    return (
      <span className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-500/20 text-zinc-400">
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <FaSpinner className="animate-spin text-4xl text-red-500" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-10">{error}</div>;
  }

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-zinc-950 border-b border-zinc-800 text-sm font-medium text-zinc-400">
        <div className="col-span-1">#</div>
        <div className="col-span-4">RECIPIENT INFO</div>
        <div className="col-span-2">LOCATION</div>
        <div className="col-span-2">BLOOD GROUP</div>
        <div className="col-span-2">STATUS</div>
        <div className="col-span-1 text-right">ACTIONS</div>
      </div>

      {/* Table Body */}
      {requests.length === 0 ? (
        <div className="text-center py-16 text-zinc-500">
          You haven't created any donation requests yet.
        </div>
      ) : (
        requests.map((req, index) => (
          <div
            key={req._id}
            className="grid grid-cols-12 gap-4 px-6 py-5 border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors items-center text-sm"
          >
            <div className="col-span-1 text-zinc-500 font-medium">
              {String(index + 1).padStart(2, '0')}
            </div>

            {/* Recipient Info */}
            <div className="col-span-4">
              <p className="font-semibold text-white">{req.recipientName}</p>
              <p className="text-xs text-zinc-500">Posted by you</p>
            </div>

            {/* Location */}
            <div className="col-span-2 text-zinc-300">
              {req.district}
              {req.upazila && `, ${req.upazila}`}
            </div>

            {/* Blood Group */}
            <div className="col-span-2">
              <span className="inline-block px-4 py-1.5 bg-red-500/10 text-red-400 font-bold rounded-lg border border-red-500/30">
                {req.bloodGroup}
              </span>
            </div>

            {/* Status */}
            <div className="col-span-2">
              {getStatusBadge(req.status)}
            </div>

            {/* Actions */}
            <div className="col-span-1 flex justify-end gap-3 text-zinc-400">
              <button
                className="hover:text-white transition-colors"
                title="View Details"
              >
                <FaEye />
              </button>
              <button
                className="hover:text-yellow-400 transition-colors"
                title="Edit"
              >
                <FaEdit />
              </button>
              <button
                className="hover:text-red-500 transition-colors"
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyDonationRequests;