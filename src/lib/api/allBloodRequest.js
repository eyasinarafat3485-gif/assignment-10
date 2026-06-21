
// import { serverFetch, serverMutationPatch } from "../core/server";

// export const getMyBloodRequests = async (userId, page = 1, limit = 5) => {
//     return serverFetch(`/api/my/bloodRequests?userId=${userId}&page=${page}&limit=${limit}`);
// }

// export const getBReqestById = async (reqId) => {
//     return serverFetch(`/api/bloodRequests/${reqId}`);
// }

// export const updateRequestStatus = async (reqId, data) => {
//     const body = typeof data === 'string' ? { status: data } : data;
    
//     return serverMutationPatch(`/api/bloodRequests/${reqId}`, body);
// }


// import { 
//     serverFetch, 
//     serverMutationBReq, 
//     serverMutationPatch,
//     serverMutationDelete 
// } from "../core/server";

// export const getMyBloodRequests = async (userId, page = 1, limit = 5) => {
//     return serverFetch(`/api/my/bloodRequests?userId=${userId}&page=${page}&limit=${limit}`);
// }

// export const getBReqestById = async (reqId) => {
//     return serverFetch(`/api/bloodRequests/${reqId}`);
// }

// export const updateRequestStatus = async (reqId, data) => {
//     const body = typeof data === 'string' ? { status: data } : data;
//     return serverMutationPatch(`/api/bloodRequests/${reqId}`, body);
// }

// // ==================== নতুন ফাংশন (আপনার আগের কোডে কোনো পরিবর্তন করা হয়নি) ====================

// /** General Update - Edit (Date, Time, Location, Blood Group ইত্যাদি) এর জন্য */
// export const updateBloodRequest = async (reqId, data) => {
//     return serverMutationPatch(`/api/bloodRequests/${reqId}`, data);
// };

// /** Delete Blood Request - সঠিক DELETE মেথড ব্যবহার করা হচ্ছে */
// export const deleteBloodRequest = async (reqId) => {
//     return serverMutationDelete(`/api/bloodRequests/${reqId}`);
// };



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

// ==================== নতুন ফাংশন (আপনার আগের কোডে কোনো পরিবর্তন করা হয়নি) ====================

/** General Update - Edit (Date, Time, Location, Blood Group ইত্যাদি) এর জন্য */
export const updateBloodRequest = async (reqId, data) => {
    return serverMutationPatch(`/api/bloodRequests/${reqId}`, data);
};

/** Delete Blood Request */
export const deleteBloodRequest = async (reqId) => {
    return serverMutationDelete(`/api/bloodRequests/${reqId}`);
};

// ==================== Volunteer এর জন্য নতুন API ====================
/** 
 * সব রিকোয়েস্ট দেখার জন্য (Volunteer Public Requests Page এ ব্যবহার হবে)
 * সব স্ট্যাটাসের রিকোয়েস্ট দেখাবে 
 */
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