import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// userId এর সাথে page এবং limit যোগ করা হয়েছে (ডিফল্ট পেজ ১ এবং লিমিট ৫)
export const getMyBloodRequests = async (userId, page = 1, limit = 5) => {
    return serverFetch(`/api/my/bloodRequests?userId=${userId}&page=${page}&limit=${limit}`);
}