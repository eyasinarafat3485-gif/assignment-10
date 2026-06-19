'use client'
import { useSession } from '@/lib/auth-client';
import React from 'react';

const AdminHomePage = () => {
    const {data: session, isPending} = useSession();
    if(isPending){
        return <div>Loading...</div>
    }
    const user = session?.user;
    console.log(user, isPending);
    return (
        <div className='ml-5'>
            
             <h1 className='text-2xl md:text-5xl font-bold text-white'>
                Welcome, <span className='text-red-500'>
                    {user?.name ? user.name.charAt(0).toUpperCase() + user.name.slice(1) : ''}
                </span>!
            </h1>
            <p className='text-lg mt-2'>A single blood donation can save up to three lives.</p>
        </div>
    );
};

export default AdminHomePage;