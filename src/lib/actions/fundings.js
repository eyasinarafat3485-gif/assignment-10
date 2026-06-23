'use server'

import { serverFetch } from "../core/server"

export const giveFunding = async ()=>{
    return serverFetch('/api/funding')
}