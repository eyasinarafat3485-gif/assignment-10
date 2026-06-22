import React from 'react';
import CreateDonationRequestPage from './CreateDonationRequestPage';
import { getUserSession } from '@/lib/core/session';

const DonorCreateBRequestPage = async () => {
    const user = await getUserSession();
    console.log(user);

    return (
        <div>
            <CreateDonationRequestPage />
        </div>
    );
};

export default DonorCreateBRequestPage;