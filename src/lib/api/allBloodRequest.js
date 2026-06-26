'use server';

import { headers } from "next/headers";
import { auth } from "../auth";
import { 
    serverFetch, 
    serverMutationPatch,
    serverMutationDelete, 
    protectedFatch
} from "../core/server";


const getToken = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    });

    console.log(session);
    return session?.session?.token || null;
};


export const getMyBloodRequests = async (userId, page = 1, limit = 10) => {
    return serverFetch(
        `/api/my/bloodRequests?userId=${userId}&page=${page}&limit=${limit}`
    );
};


export const getBReqestById = async (reqId) => {

    const token = await getToken();
    console.log(token);

    return protectedFatch(`/api/bloodRequests/${reqId}`, {
        headers: {
            authorization: `Bearer ${token}`
        }
    });
};


export const updateRequestStatus = async (reqId, data) => {
    const body = typeof data === 'string'
        ? { status: data }
        : data;

    return serverMutationPatch(
        `/api/bloodRequests/${reqId}`,
        body
    );
};


export const updateBloodRequest = async (reqId, data) => {
    return serverMutationPatch(
        `/api/bloodRequests/${reqId}`,
        data
    );
};


export const deleteBloodRequest = async (reqId) => {
    return serverMutationDelete(
        `/api/bloodRequests/${reqId}`
    );
};


export const getAllBloodRequests = async ({ 
    page = 1, 
    limit = 10, 
    status = '', 
    search = '' 
}) => {

    let url = `/api/blood-requests?page=${page}&limit=${limit}`;

    if (status) {
        url += `&status=${status}`;
    }

    if (search) {
        url += `&search=${encodeURIComponent(search)}`;
    }

    return serverFetch(url);
};