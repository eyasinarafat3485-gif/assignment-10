// import { serverFetch } from "../core/server";

// export const getMyBloodRequests = async (userId, page = 1, limit = 5) => {
//     return serverFetch(`/api/my/bloodRequests?userId=${userId}&page=${page}&limit=${limit}`);
// }

// export const getBReqestById = async(reqId)=>{
//     return serverFetch(`/api/bloodRequests/${reqId}`);
// }



import { serverFetch, serverMutationPatch } from "../core/server";

export const getMyBloodRequests = async (userId, page = 1, limit = 5) => {
    return serverFetch(`/api/my/bloodRequests?userId=${userId}&page=${page}&limit=${limit}`);
}

export const getBReqestById = async(reqId)=>{
    return serverFetch(`/api/bloodRequests/${reqId}`);
}

export const updateRequestStatus = async (reqId, status) => {
    return serverMutationPatch(`/api/bloodRequests/${reqId}`, { status });
}