'use client'
import { useSession } from '@/lib/auth-client';
import { getAllUsers } from '@/lib/api/allUsers';
import { getAllBRequests } from '@/lib/api/bloodsAllGets';
import { giveFunding } from '@/lib/actions/fundings';
import React, { useEffect, useState } from 'react';
import { FiActivity, FiHeart, FiUsers } from 'react-icons/fi';

const AdminHomePage = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;
    console.log( session, user, isPending);

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

                    funds: (() => {
                        // 1. Check kora hocche fundings nije array kina, naki er bhetor wrapper data array ase
                        const actualFundsArray = Array.isArray(fundings)
                            ? fundings
                            : (fundings?.data && Array.isArray(fundings.data) ? fundings.data : []);

                        // 2. Safely reduce execute kora jate array na asle crash na kore 0 ashe
                        return actualFundsArray.reduce(
                            (total, item) => total + Number(item.amount || 0),
                            0
                        );
                    })(),

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
        <div className='md:ml-8 min-h-[70vh]'>
            <h2 className='text-xl text-red-500 font-bold text-right uppercase'>
                {user?.role}
            </h2>
            <h1 className='text-2xl md:text-4xl font-bold text-white'>
                Welcome, <span className='text-red-500'>
                    {user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : ''}
                </span>!
            </h1>
            <p className='text-lg mt-2'>A single blood donation can save up to three lives.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 my-5 gap-5 bg-zinc-900/40 backdrop-blur-md border border-zinc-800/60 p-5 rounded-3xl shadow-2xl">

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
    );
};

export default AdminHomePage;