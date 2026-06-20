'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const EditRequestModal = ({ isOpen, onClose, requestData, onUpdateSuccess }) => {
  const [formData, setFormData] = useState({
    recipientName: '',
    district: '',
    upazila: '',
    hospitalName: '',
    fullAddress: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // মোডাল ওপেন হলে কারেন্ট ডাটা ইনপুট ফিল্ডে সেট হবে
  useEffect(() => {
    if (requestData) {
      setFormData({
        recipientName: requestData.recipientName || '',
        district: requestData.district || '',
        upazila: requestData.upazila || '',
        hospitalName: requestData.hospitalName || '',
        fullAddress: requestData.fullAddress || ''
      });
    }
  }, [requestData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       // আপনার ব্যাকএন্ড আপডেট এপিআই কল করুন এখানে
//       const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bloodRequests/${requestData._id}`, {
//         method: 'PATCH', // বা PUT আপনার ব্যাকএন্ড লজিক অনুযায়ী
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const updatedRequest = await response.json();
//         // প্যারেন্ট পেজের স্টেটকে অটোমেটিক্যালি আপডেট করার জন্য কলব্যাক
//         onUpdateSuccess(updatedRequest); 
//         onClose();
//       } else {
//         console.error("Failed to update request");
//       }
//     } catch (err) {
//       console.error("Error updating request:", err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };


const handleSubmit = (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  // ব্যাকএন্ড আপডেট এপিআই কল
  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bloodRequests/${requestData._id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Failed to update');
    })
    .then((updatedRequest) => {
      // সাকসেস টোস্ট এবং স্টেট আপডেট
      toast.success('Request updated successfully!');
      onUpdateSuccess(updatedRequest);
      onClose();
      setIsSubmitting(false);
    })
    .catch((err) => {
      console.error("Error updating request:", err);
      toast.error('Something went wrong!');
      setIsSubmitting(false);
    });
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-950 p-6 md:p-8 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button onClick={onClose} className="p-2 rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-zinc-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12l7.5-7.5M21 12H3" />
              </svg>
            </button>
            <div>
              <h2 className="text-2xl font-black text-zinc-100">
                Edit <span className="text-red-500">Request</span>
              </h2>
              <p className="text-xs text-zinc-400">Update the details for this blood requirement.</p>
            </div>
          </div>
          <span className="px-3 py-1 text-xs font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-full uppercase tracking-wider">
            Current Status: {requestData?.status}
          </span>
        </div>

        {/* Form Formatted as Image 3 */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Recipient Name */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 block">👤 Recipient Name</label>
              <input
                type="text"
                name="recipientName"
                value={formData.recipientName}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-zinc-200 focus:border-red-500 focus:outline-none transition-all"
                required
              />
            </div>

            {/* District */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 block">📍 District</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-zinc-200 focus:border-red-500 focus:outline-none transition-all"
                required
              />
            </div>

            {/* Upazila */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 block">🩸 Upazila</label>
              <input
                type="text"
                name="upazila"
                value={formData.upazila}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-zinc-200 focus:border-red-500 focus:outline-none transition-all"
                required
              />
            </div>

            {/* Hospital Name */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 block">🏥 Hospital Name</label>
              <input
                type="text"
                name="hospitalName"
                value={formData.hospitalName}
                onChange={handleChange}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-3 text-zinc-200 focus:border-red-500 focus:outline-none transition-all"
                required
              />
            </div>
          </div>

          {/* Full Detailed Address */}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2 block">📋 Full Detailed Address</label>
            <textarea
              name="fullAddress"
              value={formData.fullAddress}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-xl border border-red-500/50 bg-zinc-900/30 p-3 text-zinc-200 focus:border-red-500 focus:outline-none transition-all resize-none"
              required
            />
          </div>

          {/* Actions Bottom Bar */}
          <div className="flex items-center justify-end gap-3 mt-6 border-t border-zinc-900 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl font-bold bg-zinc-800 text-zinc-300 hover:bg-zinc-700 transition-all text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20 transition-all text-sm disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
                </svg>
              )}
              Update Request
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default EditRequestModal;