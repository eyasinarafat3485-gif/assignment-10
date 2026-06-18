'use client'
import { useSession } from '@/lib/auth-client';
import React from 'react';

const VolunteerHomePage = () => {
    const {data: session, isPending} = useSession();
    if(isPending){
        return <div>Loading...</div>
    }
    const user = session?.user;
    console.log(user);
    return (
        <div>
            <h1 className='text-2xl md:text-5xl font-bold text-white'>Welcome, {user?.name}</h1>
            <h2>Volunteer Home Page</h2>
        </div>
    );
};

export default VolunteerHomePage;