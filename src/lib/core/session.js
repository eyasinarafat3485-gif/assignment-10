import { headers } from "next/headers"
import { auth } from "../auth"

export const getUserSession = async ()=>{
    const session = await auth.api.getSession({
        headers: await headers()
    })
    console.log(session);
    return session?.user || null ;
}

export const getUserToken = async()=>{
    console.log('function call');
    const session = await auth.api.getSession({
        headers: await headers()
    })
    
    console.log(session?.session?.token);
    return session?.session?.token || null;
}