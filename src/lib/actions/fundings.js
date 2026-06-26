'use server'

import { protectedFatch, serverFetch } from "../core/server"

export const giveFunding = async ()=>{
    return serverFetch('/api/funding')
}