import { 
    serverFetch, 
    serverMutationBReq, 
    serverMutationPatch,
    serverMutationDelete 
} from "../core/server";

export const getMyBloodRequests = async (userId, page = 1, limit = 5) => {
    return serverFetch(`/api/my/bloodRequests?userId=${userId}&page=${page}&limit=${limit}`);
}

export const getBReqestById = async (reqId) => {
    return serverFetch(`/api/bloodRequests/${reqId}`);
}

export const updateRequestStatus = async (reqId, data) => {
    const body = typeof data === 'string' ? { status: data } : data;
    return serverMutationPatch(`/api/bloodRequests/${reqId}`, body);
}

export const updateBloodRequest = async (reqId, data) => {
    return serverMutationPatch(`/api/bloodRequests/${reqId}`, data);
};

/** Delete Blood Request */
export const deleteBloodRequest = async (reqId) => {
    return serverMutationDelete(`/api/bloodRequests/${reqId}`);
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