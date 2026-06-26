
// 'use server'

// import { serverMutationBReq, serverMutationDelete } from "../core/server"

// export const createBloodRequests = async(newBloodRequests)=>{
//     return serverMutationBReq('/api/bloodRequests', newBloodRequests);
// }

// export const deleteBloodRequest = async (id) => {
//     return serverMutationDelete(`/api/bloodRequests/${id}`);
// }




'use server'

import { serverMutationBReq, serverMutationDelete } from "../core/server"

export const createBloodRequests = async(newBloodRequests)=>{
    return serverMutationBReq('/api/bloodRequests', newBloodRequests);
}

export const deleteBloodRequest = async (id) => {
    return serverMutationDelete(`/api/bloodRequests/${id}`);
}