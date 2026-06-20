import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// donorId এর পরিবর্তে userId ব্যবহার করা হয়েছে, যা donor এবং volunteer উভয়ের জন্যই কাজ করবে
export const getMyBloodRequests = async (userId) => {
    return serverFetch(`/api/my/bloodRequests?userId=${userId}`);
}