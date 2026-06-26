'use server'

import { getUserToken } from "./session";

// import { authHeadaer } from "../actions/users"; 

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;

// const safeFetch = async (path, options = {}) => {
//     if (!baseUrl) {
//         console.error("❌ Error: NEXT_PUBLIC_BASE_URL is undefined! Check your .env.local file.");
//         throw new Error("Base URL config missing.");
//     }

//     const fullUrl = `${baseUrl.replace(/\/$/, '')}${path}`; 

//     try {
//         const res = await fetch(fullUrl, options);
//         if (!res.ok) {
//             const errorText = await res.text(); 
//             console.error(`❌ HTTP Error! Status: ${res.status} on path: ${path}. Response: ${errorText}`);
//             return { error: true, status: res.status, message: errorText || "Something went wrong" };
//         }

//         return await res.json();
//     } catch (error) {
//         console.error(`🔥 Fetch failed totally for path ${path}:`, error.message);
//         return { error: true, message: "Network connection failed or Server is Down" };
//     }
// };

// export const serverFetch = async (path) => {
//     return safeFetch(path);
// };

export const authHeadaer = async()=>{
  const token = await getUserToken();
  const header = token ? {
    authorization: `Bearer ${token}`
  } : {};
  return  header;
}

export const serverFetch = async (path, options = {}) => {
    if (!baseUrl) {
        // console.error("❌ Error: NEXT_PUBLIC_BASE_URL is undefined! Check your .env.local file.");
        throw new Error("Base URL config missing.");
    }

    const fullUrl = `${baseUrl.replace(/\/$/, '')}${path}`; 

    const res = await fetch(fullUrl, options);
    
    if (!res.ok) {
        const errorText = await res.text(); 
        // console.error(`❌ HTTP Error! Status: ${res.status} on path: ${path}. Response: ${errorText}`);
        return { error: true, status: res.status, message: errorText || "Something went wrong" };
    }

    return await res.json();
};

export const protectedFatch = async (path) => {
    return serverFetch(path, {
        headers: await authHeadaer()
    });

    // handle error 401
};

export const serverMutationBReq = async (path, data) => {
    return serverFetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            
        },
        body: JSON.stringify(data)
    });
};

export const serverMutationPatch = async (path, data) => {
    return serverFetch(path, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            ... await authHeadaer()
        },
        body: JSON.stringify(data)
    });
};

export const serverMutationDelete = async (path) => {
    return serverFetch(path, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
};






