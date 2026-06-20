'use client'
import ProfilePage from '@/components/dashboard/ProfilePage';
import { useSession } from '@/lib/auth-client';
import React from 'react';

const AllUsersPage = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;
    console.log(user, isPending);
    return (
        <div className='ml-5'>
            <h2 className='text-xl text-red-500 font-bold text-right uppercase'>
                {user?.role}
            </h2>
            <h1 className='text-2xl md:text-5xl font-bold text-white'>
                All Users  <span className='text-red-500'>Management
                    Page
                </span>!
            </h1>
            <p className='text-lg mt-2'>This page provides a comprehensive overview and management options for all registered users.</p>
        </div>
    );
};

export default AllUsersPage;