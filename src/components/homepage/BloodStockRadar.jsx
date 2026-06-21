'use client';

import React from 'react';
import { BiBroadcast, BiDrop, BiTrendingUp } from 'react-icons/bi';
import { FaDropbox, FaShieldAlt } from 'react-icons/fa';
import { FiActivity, FiShieldAlert } from 'react-icons/fi';

export default function BloodStockRadar() {
  const stockData = [
    { group: 'O+', percentage: 85, status: 'Good', bags: 142 },
    { group: 'O-', percentage: 18, status: 'Critical', bags: 12 },
    { group: 'A+', percentage: 60, status: 'Normal', bags: 89 },
    { group: 'A-', percentage: 25, status: 'Critical', bags: 19 },
    { group: 'B+', percentage: 75, status: 'Good', bags: 110 },
    { group: 'B-', percentage: 40, status: 'Low', bags: 34 },
    { group: 'AB+', percentage: 90, status: 'Full', bags: 165 },
    { group: 'AB-', percentage: 12, status: 'Critical', bags: 8 },
  ];

  return (
    <section className="w-full py-10 bg-zinc-950/70 text-white font-sans  relative overflow-hidden">
      {/* Background Pulse Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className=" mx-auto px-5 lg:px-8 pt-16 pb-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/50 border border-red-900/40 text-xs font-bold text-red-400 uppercase tracking-wider">
              <BiBroadcast className="animate-pulse" size={14} />
              Live Inventory Radar
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-100">
              Central Blood <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]">Stock Status</span>
            </h2>
            <p className="text-white text-sm md:text-base">
              Real-time availability matrix across affiliated blood banks. Critical status levels indicate an urgent need for voluntary donors.
            </p>
          </div>

          {/* Quick Stats Badge */}
          <div className="flex items-center gap-3 bg-[#4A4A4A]/40 backdrop-blur-md border border-zinc-800 p-4 rounded-2xl shrink-0">
            <div className="p-2.5 bg-red-600/20 text-red-400 rounded-xl">
              <FiActivity className="animate-spin" style={{ animationDuration: '4s' }} size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Total Active Units</p>
              <p className="text-lg font-black text-white">589 Bags Available</p>
            </div>
          </div>
        </div>

        {/* Inventory Progress Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stockData.map((item, index) => {
            // ডিভাইন স্ট্যাটাস কালার
            const isCritical = item.status === 'Critical';
            const isLow = item.status === 'Low';
            
            let statusColor = 'text-emerald-400 bg-emerald-950/40 border-emerald-900/30';
            let barColor = 'bg-gradient-to-r from-emerald-600 to-teal-500';
            
            if (isCritical) {
              statusColor = 'text-red-400 bg-red-950/60 border-red-900/40 animate-pulse';
              barColor = 'bg-gradient-to-r from-red-600 to-rose-600';
            } else if (isLow) {
              statusColor = 'text-amber-400 bg-amber-950/40 border-amber-900/30';
              barColor = 'bg-gradient-to-r from-amber-600 to-orange-500';
            }

            return (
              <div 
                key={index}
                className="bg-[#4A4A4A]/20 backdrop-blur-md border border-zinc-800/80 p-5 rounded-2xl flex flex-col justify-between shadow-lg group hover:border-zinc-700 transition-all duration-300"
              >
                {/* Info Row */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-red-500 font-black text-lg relative">
                      <FaDropbox size={24} className="opacity-20" />
                      <span className="absolute">{item.group}</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-200 text-sm">{item.group} Inventory</h4>
                      <p className="text-xs text-zinc-500 mt-0.5">{item.bags} Total Units Tracked</p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span className={`px-2.5 py-1 border rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${statusColor}`}>
                    {isCritical && <FaShieldAlt size={12} />}
                    {item.status}
                  </span>
                </div>

                {/* Custom Interactive Progress Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="w-full h-3 bg-zinc-900 border border-zinc-800/60 rounded-full overflow-hidden p-[1px]">
                    <div 
                      className={`h-full rounded-full transition-all duration-1000 ${barColor}`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[11px] font-bold text-zinc-500">
                    <span>Capacity Status</span>
                    <span className={isCritical ? 'text-red-400 font-extrabold' : 'text-zinc-300'}>
                      {item.percentage}% Available
                    </span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Info Notification Bottom Bar */}
        <div className="mt-10 flex items-center gap-3 p-4 bg-red-950/20 border border-red-900/30 rounded-2xl text-sm text-red-300 max-w-3xl mx-auto justify-center">
          <BiTrendingUp className="text-red-500 shrink-0" size={18} />
          <p className="text-center font-medium text-xs sm:text-sm">
            <span className="font-black underline">Notice for Donors:</span> O- and AB- blood groups have fallen below safe thresholds. Please consider scheduling a donation today.
          </p>
        </div>

      </div>
    </section>
  );
}