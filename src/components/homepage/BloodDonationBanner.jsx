'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BiSearchAlt, BiDonateBlood } from 'react-icons/bi';
import { FiActivity, FiUsers, FiHeart } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';
import banner from '../../../public/blood-banner.jpg';
import Image from 'next/image';
import { getAllUsers } from '@/lib/api/allUsers';
import { getAllBRequests } from '@/lib/api/bloodsAllGets';
import { giveFunding } from '@/lib/actions/fundings';

export default function BloodDonationBanner() {
    const [stats, setStats] = useState({
        users: 0,
        requests: 0,
        funds: 0,
    });
    const [animatedFunds, setAnimatedFunds] = useState(0);

    useEffect(() => {
        const loadStats = async () => {
            try {
                const [
                    users,
                    fundings,
                    requests
                ] = await Promise.all([
                    getAllUsers(),
                    giveFunding(),
                    getAllBRequests()
                ]);

                setStats({

                    users: users?.length || 0,

                    funds: fundings?.reduce(
                        (total, item) =>
                            total + Number(item.amount || 0),
                        0
                    ) || 0,

                    requests:
                        requests?.total ||
                        requests?.requests?.length ||
                        requests?.data?.length ||
                        requests?.length ||
                        0

                });

            } catch (error) {
                console.log(error);
            }
        };
        loadStats();

    }, []);

    useEffect(() => {
        let start = 0;
        const end = stats.funds;

        if (!end) {
            setAnimatedFunds(0);
            return;
        }

        const duration = 1000;
        const stepTime = 20;
        const increment = end / (duration / stepTime);

        const timer = setInterval(() => {

            start += increment;

            if (start >= end) {
                setAnimatedFunds(end);
                clearInterval(timer);
            } else {
                setAnimatedFunds(Math.floor(start));
            }

        }, stepTime);


        return () => clearInterval(timer);

    }, [stats.funds]);


    return (
        <section className="relative w-full min-h-[95vh] flex flex-col justify-between bg-zinc-950 text-white font-sans overflow-hidden">

            <Image
                src={banner}
                alt="banner background"
                fill
                priority
                className="object-cover object-center opacity-30 z-0 scale-105 animate-[subtle-zoom_20s_ease_infinite]"
                sizes="100vw"
            />

            {/* Hero Core Content */}
            <div className="relative z-10 mx-auto px-4 pt-28 md:pt-36 text-center space-y-8 flex-grow flex flex-col justify-center items-center">

                {/* Unique Floating Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/90 backdrop-blur-xl border border-zinc-800/80 text-xs font-semibold tracking-wide text-zinc-200 shadow-xl">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
                    </span>
                    <HiOutlineSparkles className="text-amber-400" size={14} />
                    Emergency Network: 12 Active Regions
                </div>

                {/* Unique & Dynamic Heading */}
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl leading-[1.1] text-zinc-100">
                    Be The Reason <br className="hidden sm:inline" />
                    A Heart Keeps <span className="bg-gradient-to-r from-red-500 via-rose-500 to-red-600 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(220,38,38,0.25)]">Beating Today</span>
                </h1>

                {/* Unique Subtitle */}
                <p className="text-white text-base md:text-xl max-w-2xl leading-relaxed font-medium">
                    Bridge the gap between critical blood shortages and life-saving heroes. Join a decentralized network built for instant donor matchmaking.
                </p>

                {/* Action Callouts */}
                <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto">
                    <Link
                        href="/register"
                        className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white font-bold rounded-xl hover:from-red-700 hover:to-rose-700 transition-all duration-300 shadow-lg shadow-red-950/40 hover:shadow-red-900/50 hover:scale-[1.02] cursor-pointer"
                    >
                        <BiDonateBlood className="mr-2" size={22} />
                        Register as Donor
                    </Link>

                    <Link
                        href="/search-donor"
                        className="relative inline-flex items-center justify-center px-8 py-4 bg-white/80 backdrop-blur-md border border-zinc-200 text-zinc-800 font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] hover:text-red-600 hover:border-red-500/40 hover:bg-white shadow-[0_4px_12px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_rgba(220,38,38,0.08)] group overflow-hidden cursor-pointer"
                    >
                        {/* Clean Sliding Shimmer */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-100 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                        <BiSearchAlt className="mr-2 text-zinc-500 group-hover:text-red-500 transition-colors duration-300" size={20} />
                        <span className="relative z-10">Find Blood Instantly</span>
                    </Link>
                </div>
            </div>

            {/* Unique Glassmorphic Counter Dashboard (Bottom Layer) */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 pb-14 mt-16 lg:mt-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/60 p-5 rounded-3xl shadow-2xl">

                    {/* Card 1: Verified Base */}
                    <div className="p-6 rounded-2xl bg-white/50 border border-zinc-800/40 hover:bg-white/30 transition-all duration-300 flex items-center gap-4 group">
                        <div className="p-3 bg-red-500 text-white rounded-xl  transition-colors">
                            <FiUsers size={24} />
                        </div>
                        <div className="text-left">
                            <h3 className="text-2xl font-black tracking-tight text-white">{stats.users}</h3>
                            <p className="text-xs font-semibold text-black uppercase tracking-wider mt-0.5">Total Donors</p>
                        </div>
                    </div>

                    {/* Card 2: Safe Transfusions */}
                    <div className="p-6 rounded-2xl bg-white/50 border border-zinc-800/40 hover:bg-white/30 transition-all duration-300 flex items-center gap-4 group">
                        <div className="p-3 bg-red-500 text-white rounded-xl  transition-colors">
                            <FiActivity size={24} />
                        </div>
                        <div className="text-left">
                            <h3 className="text-2xl font-black tracking-tight text-white">
                                {animatedFunds}
                                <span className='text-3xl font-medium text-red-500'>$</span>
                            </h3>
                            <p className="text-xs font-semibold text-black uppercase tracking-wider mt-0.5">Total Funds</p>
                        </div>
                    </div>

                    {/* Card 3: Lives Restored */}
                    <div className="p-6 rounded-2xl bg-white/50 border border-zinc-800/40 hover:bg-white/30 transition-all duration-300 flex items-center gap-4 group">
                        <div className="p-3 bg-red-500 text-white rounded-xl  transition-colors">
                            <FiHeart size={24} />
                        </div>
                        <div className="text-left">
                            <h3 className="text-2xl font-black tracking-tight text-white">{stats.requests}</h3>
                            <p className="text-xs font-semibold text-black uppercase tracking-wider mt-0.5">Total Pending Requests</p>
                        </div>
                    </div>

                </div>
            </div>

        </section>
    );
}