import { serverFetch } from "../core/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const getDonorBloodRequest = async (donorId)=>{
    return serverFetch(`/api/my/bloodRequests?donorId=${donorId}`)
}