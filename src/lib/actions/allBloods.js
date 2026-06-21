// 'use server'

// import { serverMutationBReq } from "../core/server"


// export const createBloodRequests = async(newBloodRequests)=>{
//     return serverMutationBReq('/api/bloodRequests', newBloodRequests);
// }



'use server'

import { serverMutationBReq, serverMutationDelete } from "../core/server"

// ব্লাড রিকোয়েস্ট ক্রিয়েট করার এপিআই
export const createBloodRequests = async(newBloodRequests)=>{
    return serverMutationBReq('/api/bloodRequests', newBloodRequests);
}

// ✅ নতুন ফাংশন: ব্লাড রিকোয়েস্ট ডিলিট করার এপিআই অ্যাকশন
export const deleteBloodRequest = async (id) => {
    return serverMutationDelete(`/api/bloodRequests/${id}`);
}