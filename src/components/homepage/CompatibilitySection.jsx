'use client';

import React, { useState } from 'react';
import { BiDna, BiCheckCircle, BiTrendingUp } from 'react-icons/bi';
import { FiInfo, FiHeart } from 'react-icons/fi';

export default function CompatibilitySection() {
  const [selectedGroup, setSelectedGroup] = useState('O+');

  // Blood compatibility data map
  const bloodData = {
    'O+': { give: ['O+', 'A+', 'B+', 'AB+'], receive: ['O+', 'O-'], note: 'Most common blood type. Highly needed for emergency red blood cell transfusions.' },
    'O-': { give: ['All Blood Types'], receive: ['O-'], note: 'Universal Donor! Crucial for trauma patients and newborn babies when blood type is unknown.' },
    'A+': { give: ['A+', 'AB+'], receive: ['A+', 'A-', 'O+', 'O-'], note: 'One of the most common types. Plasma from A+ donors is highly versatile.' },
    'A-': { give: ['A+', 'A-', 'AB+', 'AB-'], receive: ['A-', 'O-'], note: 'A rare and important group. Often needed for targeted surgical procedures.' },
    'B+': { give: ['B+', 'AB+'], receive: ['B+', 'B-', 'O+', 'O-'], note: 'In high demand globally. Directly supports cancer patients and bone marrow therapies.' },
    'B-': { give: ['B+', 'B-', 'AB+', 'AB-'], receive: ['B-', 'O-'], note: 'Extremely rare blood group. Less than 2% of the population has this.' },
    'AB+': { give: ['AB+'], receive: ['All Blood Types'], note: 'Universal Recipient! However, AB+ donors are the Universal Plasma Donors.' },
    'AB-': { give: ['AB+', 'AB-'], receive: ['AB-', 'A-', 'B-', 'O-'], note: 'The rarest blood type in the world. Plasma and platelets are highly valuable.' }
  };

  const bloodGroups = Object.keys(bloodData);

  return (
    <section className="relative w-full py-10 bg-zinc-950/70 text-white font-sans overflow-hidden">
      <div className=" mx-auto px-5 lg:px-8 pt-16 pb-8">
        
        {/* Section Header */}
        <div className=" mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-800 text-xs font-bold text-zinc-300 uppercase tracking-wider">
            <BiDna size={14} className="text-red-500 animate-spin" style={{ animationDuration: '6s' }} />
            Compatibility Guide
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-100">
            Can You Save <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]">A Life?</span>
          </h2>
          <p className="text-white text-base md:text-lg">
            Select your blood group below to instantly discover who you can accept blood from and who you can safely donate to.
          </p>
        </div>

        {/* Interactive Matrix Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: Blood Group Grid Selector */}
          <div className="lg:col-span-5 space-y-4">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block text-center lg:text-left">
              Click Your Blood Group
            </label>
            <div className="grid grid-cols-4 gap-3">
              {bloodGroups.map((group) => (
                <button
                  key={group}
                  onClick={() => setSelectedGroup(group)}
                  className={`h-16 rounded-2xl font-black text-lg transition-all duration-300 flex items-center justify-center cursor-pointer shadow-md ${
                    selectedGroup === group
                      ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-lg shadow-red-900/40 scale-[1.04]'
                      : 'bg-zinc-900/50 backdrop-blur-sm border border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-800/60 text-zinc-300'
                  }`}
                >
                  {group}
                </button>
              ))}
            </div>

            {/* Signature Charcoal Gray Info Box */}
            <div className="p-5 bg-[#4A4A4A]/90 backdrop-blur-md border border-zinc-700/60 rounded-2xl text-white space-y-2 shadow-xl relative overflow-hidden mt-6">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-white">
                <FiHeart size={80} />
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-red-400 uppercase tracking-wider">
                <FiInfo size={14} />
                Medical Insight ({selectedGroup})
              </div>
              <p className="text-sm text-zinc-200 leading-relaxed relative z-10 font-medium">
                {bloodData[selectedGroup].note}
              </p>
            </div>
          </div>

          {/* Right Side: Glassmorphic Match Results */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
            
            {/* Box 1: You Can Give To */}
            <div className="p-6 md:p-8 bg-zinc-900/30 backdrop-blur-md rounded-3xl border border-zinc-800/80 flex flex-col justify-between shadow-xl group hover:border-red-500/30 transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-red-950/50 text-red-400 border border-red-900/30 flex items-center justify-center mb-5 font-bold">
                  <BiTrendingUp size={22} />
                </div>
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  Your Blood Can Save
                </h4>
                <h3 className="text-xl font-black text-zinc-200 tracking-tight">
                  Can Donate To
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-6">
                {bloodData[selectedGroup].give.map((g, i) => (
                  <span 
                    key={i} 
                    className="px-4 py-2 bg-zinc-950/60 border border-zinc-800 rounded-xl text-sm font-black text-zinc-300 flex items-center gap-1.5 shadow-sm group-hover:bg-red-950/20 group-hover:border-red-900/40 transition-all duration-300"
                  >
                    <BiCheckCircle className="text-red-500" size={16} />
                    {g}
                  </span>
                ))}
              </div>
            </div>

            {/* Box 2: You Can Receive From */}
            <div className="p-6 md:p-8 bg-zinc-900/30 backdrop-blur-md rounded-3xl border border-zinc-800/80 flex flex-col justify-between shadow-xl group hover:border-zinc-700 transition-all duration-300">
              <div>
                <div className="w-10 h-10 rounded-xl bg-zinc-950/80 text-zinc-400 border border-zinc-800 flex items-center justify-center mb-5 font-bold">
                  <BiCheckCircle size={20} />
                </div>
                <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">
                  In Case of Emergency
                </h4>
                <h3 className="text-xl font-black text-zinc-200 tracking-tight">
                  Can Receive From
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-6">
                {bloodData[selectedGroup].receive.map((g, i) => (
                  <span 
                    key={i} 
                    className="px-4 py-2 bg-zinc-950/60 border border-zinc-800 rounded-xl text-sm font-black text-zinc-300 flex items-center gap-1.5 shadow-sm group-hover:bg-zinc-800/50 group-hover:border-zinc-700 transition-all duration-300"
                  >
                    <BiCheckCircle className="text-zinc-500" size={16} />
                    {g}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}