'use client';

import { updateRequestStatus } from '@/lib/api/allBloodRequest';
import { useSession } from '@/lib/auth-client';
import React, { useState } from 'react';
import { FaHospital, FaMapMarkerAlt, FaCalendarAlt, FaClock, FaUser } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequestDetailsClient = ({ req }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [status, setStatus] = useState(req.status || "Pending");
    // import { useSession } from "next-auth/react";
// component-er bhetor:
const { data: session } = useSession();
const donorName = session?.user?.name;
const donorEmail = session?.user?.email;

    // এখানে তোমার লগইন করা Donor এর তথ্য আসবে (Context / Auth থেকে)
    // const donorName = ;        // ← পরে Auth Context থেকে dynamic করবে
    // const donorEmail = "donor@gmail.com";  // ← পরে Auth Context থেকে dynamic করবে

    // 🟢 UPDATED FUNCTION HERE
    const handleDonate = async () => {
        setIsConfirming(true);
        try {
            // API call to update status and donor details
            await updateRequestStatus(req._id, { 
                status: "Inprogress", 
                donorName: donorName, 
                donorEmail: donorEmail 
            });

            toast.success("Donation Confirmed! Status changed to In Progress.", {
                autoClose: 4000,
                position: 'top-center',
            });

            setIsModalOpen(false);

            // কিছুক্ষণ পর পেজ রিডাইরেক্ট
            setTimeout(() => {
                window.location.href = '/donation-requests'; 
            }, 1500);

        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            console.error(error);
        } finally {
            setIsConfirming(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950/70 text-zinc-100 py-8 px-4 md:px-8">
            <ToastContainer />

            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-5xl font-bold text-white">
                        Request <span className="text-red-500">Details</span>
                    </h1>
                    <p className="text-white mt-3 text-lg">
                        View urgency, location, and requirements.
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
                    {/* Top Section */}
                    <div className="bg-zinc-950 px-8 py-6 flex flex-col md:flex-row items-start md:items-center justify-between border-b border-zinc-800">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-red-600/10 rounded-2xl flex items-center justify-center text-3xl border border-red-500/30">
                                <FaUser className="text-red-500" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">{req.recipientName}</h2>
                                <p className="text-zinc-500">RECIPIENT - PATIENT</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 mt-4 md:mt-0">
                            <span className="px-4 py-1.5 bg-yellow-500/10 text-yellow-400 text-sm font-medium rounded-full border border-yellow-500/30">
                                PENDING
                            </span>
                            <div className="px-5 py-2 bg-red-600/10 text-red-500 font-bold text-xl rounded-2xl border border-red-500/30">
                                {req.bloodGroup}
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 p-8">
                        {/* Location Details */}
                        <div className="space-y-6">
                            <h3 className="uppercase text-xs tracking-widest text-zinc-500 font-semibold">Location Details</h3>
                            <div className="space-y-5">
                                <div className="flex gap-4">
                                    <FaHospital className="text-red-500 mt-1" size={22} />
                                    <div>
                                        <p className="font-medium text-zinc-300">Hospital</p>
                                        <p className="text-zinc-400">{req.hospitalName || 'Not Provided'}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <FaMapMarkerAlt className="text-red-500 mt-1" size={22} />
                                    <div>
                                        <p className="font-medium text-zinc-300">Full Address</p>
                                        <p className="text-zinc-400">
                                            {req.district}{req.upazila && `, ${req.upazila}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timing & Urgency */}
                        <div className="space-y-6">
                            <h3 className="uppercase text-xs tracking-widest text-zinc-500 font-semibold">Timing & Urgency</h3>
                            <div className="space-y-5">
                                <div className="flex gap-4">
                                    <FaCalendarAlt className="text-red-500 mt-1" size={22} />
                                    <div>
                                        <p className="font-medium text-zinc-300">Required Date</p>
                                        <p className="text-zinc-400">{req.requiredDate}</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <FaClock className="text-red-500 mt-1" size={22} />
                                    <div>
                                        <p className="font-medium text-zinc-300">Required Time</p>
                                        <p className="text-zinc-400">{req.requiredTime}</p>
                                    </div>
                                </div>

                                {req.message && (
                                    <div>
                                        <p className="font-medium text-zinc-300 mb-2">Request Message</p>
                                        <div className="bg-zinc-950/70 border border-zinc-700 rounded-2xl p-5 text-zinc-300 italic">
                                            "{req.message}"
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Donate Button */}
                    <div className="px-8 pb-8 pt-2">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full bg-red-600 hover:bg-red-700 transition-all active:scale-[0.98] text-white font-semibold text-lg py-4 rounded-2xl shadow-lg shadow-red-600/30"
                        >
                            Donate Now
                        </button>
                    </div>
                </div>
            </div>

            {/* ==================== Confirm Donation Modal ==================== */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-zinc-900 rounded-3xl w-full max-w-md border border-zinc-700 overflow-hidden">
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 mx-auto bg-red-600/10 rounded-2xl flex items-center justify-center mb-6">
                                🛡️
                            </div>
                            <h2 className="text-2xl font-bold text-white mb-2">Confirm Donation</h2>
                            <p className="text-zinc-400 text-sm mb-8">
                                Please confirm that you are available and willing to donate for this patient.
                            </p>

                            {/* Donor Name */}
                            <div className="mb-5">
                                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-1.5 text-left">Donor Name</label>
                                <input
                                    type="text"
                                    value={donorName}
                                    readOnly
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-300 cursor-not-allowed"
                                />
                            </div>

                            {/* Donor Email */}
                            <div className="mb-8">
                                <label className="block text-xs uppercase tracking-widest text-zinc-500 mb-1.5 text-left">Donor Email</label>
                                <input
                                    type="email"
                                    value={donorEmail}
                                    readOnly
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-300 cursor-not-allowed"
                                />
                            </div>

                            <button
                                onClick={handleDonate}
                                disabled={isConfirming}
                                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 transition-all text-white font-semibold py-4 rounded-2xl text-lg active:scale-95"
                            >
                                {isConfirming ? "Confirming..." : "Confirm & Start"}
                            </button>

                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="mt-4 text-zinc-400 hover:text-white text-sm transition-colors"
                            >
                                I changed my mind
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestDetailsClient;