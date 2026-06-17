'use client';

import React from 'react';
import Link from 'next/link';
import { BiDrop, BiTimeFive, BiMap, BiUserVoice } from 'react-icons/bi';
import { FiChevronRight, FiAlertTriangle } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';
import { FaDropbox } from 'react-icons/fa';

export default function FeaturedSection() {
  // Mock Data: বাস্তব প্রজেক্টে এটি ডাটাবেজ বা API থেকে আসবে
  const urgentRequests = [
    {
      id: 1,
      bloodGroup: 'O-',
      status: 'Critical',
      bagsNeeded: 2,
      location: 'Dhaka Medical College, Dhaka',
      timeLeft: '45 mins left',
      reason: 'Accident Emergency'
    },
    {
      id: 2,
      bloodGroup: 'A+',
      status: 'Urgent',
      bagsNeeded: 1,
      location: 'Chittagong General Hospital',
      timeLeft: '2 hours left',
      reason: 'Thalassemia Patient'
    },
    {
      id: 3,
      bloodGroup: 'B-',
      status: 'Critical',
      bagsNeeded: 3,
      location: 'Sir Salimullah Medical, Dhaka',
      timeLeft: '1 hour left',
      reason: 'Open Heart Surgery'
    }
  ];

  return (
    <section className="w-full py-20 bg-zinc-50 text-zinc-800 font-sans">
      <div className="max-w-7xl mx-auto px-5 lg:px-14">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-200/60 text-xs font-bold text-red-600 uppercase tracking-wider">
              <FiAlertTriangle className="animate-bounce" size={12} />
              Live Priorities
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900">
              Critical Live <span className="text-red-600">Requirements</span>
            </h2>
            <p className="text-zinc-500 text-sm md:text-base">
              These patients need immediate assistance. If you match any of these blood groups or are nearby, please reach out instantly.
            </p>
          </div>
          
          <Link 
            href="/donation-requests" 
            className="inline-flex items-center gap-1 text-sm font-bold text-[#4A4A4A] hover:text-red-600 transition-colors group shrink-0"
          >
            View All Live Requests 
            <FiChevronRight className="transform group-hover:translate-x-1 transition-transform" size={16} />
          </Link>
        </div>

        {/* Featured Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {urgentRequests.map((request) => (
            <div 
              key={request.id}
              className="bg-white rounded-3xl p-6 border border-zinc-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className={`absolute top-0 inset-x-0 h-1.5 ${request.status === 'Critical' ? 'bg-red-600' : 'bg-amber-500'}`} />

              <div>
                {/* Card Header Status */}
                <div className="flex justify-between items-center mb-5">
                  <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                    request.status === 'Critical' 
                      ? 'bg-red-50 text-red-600' 
                      : 'bg-amber-50 text-amber-600'
                  }`}>
                    {request.status} Case
                  </span>
                  
                  <div className="flex items-center gap-1 text-zinc-400 text-xs font-medium">
                    <BiTimeFive size={16} className="text-zinc-400" />
                    {request.timeLeft}
                  </div>
                </div>

                {/* Main Blood Info Row */}
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-red-600 relative shrink-0">
                    <FaDropbox size={32} />
                    <span className="absolute text-xs font-black text-white top-[42%]">{request.bloodGroup}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-zinc-900 tracking-tight">{request.bloodGroup} Required</h3>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mt-0.5">{request.bagsNeeded} Bags Needed</p>
                  </div>
                </div>

                {/* Details Section */}
                <div className="space-y-3 border-t border-zinc-100 pt-4 mb-6 text-sm">
                  <div className="flex items-start gap-2.5">
                    <BiUserVoice className="text-zinc-400 mt-0.5 shrink-0" size={18} />
                    <p className="text-zinc-600 font-medium"><span className="text-zinc-400">Reason:</span> {request.reason}</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <BiMap className="text-zinc-400 mt-0.5 shrink-0" size={18} />
                    <p className="text-zinc-600 font-medium line-clamp-1"><span className="text-zinc-400">Hospital:</span> {request.location}</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={`/donation-requests`}
                className="w-full py-3 bg-zinc-50 border border-zinc-200/80 text-center font-bold text-sm rounded-xl text-zinc-700 transition-all duration-200 hover:bg-[#4A4A4A] hover:border-[#4A4A4A] hover:text-white cursor-pointer"
              >
                Donate Instantly
              </Link>
            </div>
          ))}
        </div>

        {/* Call to Action Feature Footer Banner */}
        <div className="mt-12 bg-[#4A4A4A] rounded-3xl p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-xl relative overflow-hidden">
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
          
          <div className="flex items-center gap-4 relative z-10">
            <div className="p-3 bg-white/10 rounded-2xl text-amber-400 shrink-0 hidden sm:block">
              <HiOutlineSparkles size={24} />
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-xl font-bold tracking-tight">Don't see your blood group listed above?</h4>
              <p className="text-zinc-300 text-sm mt-1">You can still create a donor profile so patients can find you during an emergency.</p>
            </div>
          </div>
          
          <Link 
            href="/register" 
            className="px-6 py-3 bg-white text-zinc-950 font-bold rounded-xl hover:bg-zinc-200 transition-all text-sm shadow-md shrink-0 relative z-10 cursor-pointer"
          >
            Join Donor Registry
          </Link>
        </div>

      </div>
    </section>
  );
}