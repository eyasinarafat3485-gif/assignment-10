import React from 'react';
import CreateDonationRequestPage from './CreateDonationRequestPage';
import { getUserSession } from '@/lib/core/session';
// import { getDonorBloodRequest } from '@/lib/api/singleRequestsGet';

const DonorCreateBRequestPage = async () => {
    const user = await getUserSession();
    console.log(user);

    // const bloodRequests = await getDonorBloodRequest(user?.id)

    return (
        <div>
            <CreateDonationRequestPage />
        </div>
    );
};

export default DonorCreateBRequestPage;