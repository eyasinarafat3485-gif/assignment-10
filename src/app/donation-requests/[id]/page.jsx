import { getBReqestById } from '@/lib/api/allBloodRequest';
import RequestDetailsClient from './RequestDetailsClient';

const RequestDetailsPage = async ({ params }) => {
    const { id } = await params;
    const req = await getBReqestById(id);

    if (!req) {
        return (
            <div className="min-h-screen bg-zinc-950/70 flex items-center justify-center text-red-500">
                Request Not Found
            </div>
        );
    }

    return <RequestDetailsClient req={req} />;
};

export default RequestDetailsPage;