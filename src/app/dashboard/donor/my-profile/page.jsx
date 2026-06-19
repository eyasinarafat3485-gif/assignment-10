'use client'
import ProfilePage from '@/components/dashboard/ProfilePage';
import { useSession } from '@/lib/auth-client';
import React from 'react';

const DonorProfilePage = () => {
    const {data: session, isPending} = useSession();
            const user = session?.user;
            console.log(user, isPending);
    return (
         <div className="h-full flex flex-col overflow-hidden">
        
            <h2 className='text-xl text-red-500 font-bold text-right uppercase'>
              {user?.role}
            </h2>
        
            <div className="flex-1 overflow-hidden">
              <ProfilePage />
            </div>
        
          </div>
    );
};

export default DonorProfilePage;