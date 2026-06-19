'use server'

import { serverMutationBReq } from "../core/server"


export const createBloodRequests = async(newBloodRequests)=>{
    return serverMutationBReq('/api/bloodRequests', newBloodRequests);
}

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const createBloodRequests = async (newBloodRequests) => {
//     const res = await fetch(`${baseUrl}/api/bloodRequests`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newBloodRequests)
//     });

//     return res.json();

// };
