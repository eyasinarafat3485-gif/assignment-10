'use server';

import { serverFetch, serverMutationBReq } from "../core/server";
import { getUserToken } from "../core/session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const authHeadaer = async()=>{
  const token = await getUserToken();
  const header = token ? {
    authorization: `Bearer ${token}`
  } : {};
  return  header;
}

// ✅ ETA BOSHIYE DIN (New Code)
export const updateUserInfo = async (updateData) => {
    try {
        // dynamic absolute routing hit hocche directly
        const res = await serverMutationBReq("/api/user/update", updateData);

        // helper logic high level standard layout check
        if (!res || res.error) {
            return { 
                success: false, 
                message: res?.message || "Backend component mapping runtime block layout error!" 
            };
        }

        // Response safely parse korar jonno matrix control tracking block payload
        return {
            success: true,
            data: JSON.parse(JSON.stringify(res)) 
        };

    } catch (error) {
        console.error("Server Action Dynamic Error Handler:", error);
        return { 
            success: false, 
            message: error.message || "Internal Server Action tracking crash!" 
        };
    }
}