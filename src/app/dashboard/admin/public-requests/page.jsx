'use client'
import ProfilePage from '@/components/dashboard/ProfilePage';
import { useSession } from '@/lib/auth-client';
import React from 'react';

const PublicRequestPage = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;
    console.log(user, isPending);
    return (
        <div className='ml-5'>
            <h2 className='text-xl text-red-500 font-bold text-right uppercase'>
                {user?.role}
            </h2>
            <h1 className='text-2xl md:text-5xl font-bold text-white'>
                 All <span className='text-red-500'>Requests
                    Page
                </span>!
            </h1>
            <p className='text-lg mt-2'>The Requests Page allows users to submit, track, and manage their service or support requests easily.</p>
        </div>
    );
};

export default PublicRequestPage;