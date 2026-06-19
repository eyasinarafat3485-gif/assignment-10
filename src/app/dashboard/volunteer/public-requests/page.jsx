'use client'
import { useSession } from '@/lib/auth-client';
import React from 'react';

const PublicRequestsPage = () => {
    const { data: session, isPending } = useSession();
    const user = session?.user;
    console.log(user, isPending);
    return (
        <div>
            <h2 className='text-xl text-red-500 font-bold mt-0 mr-0 text-right uppercase'>
                {user?.role}
            </h2>
        </div>
    );
};

export default PublicRequestsPage;