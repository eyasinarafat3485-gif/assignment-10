// /lib/api/allUsers.js
// import { serverFetch, serverMutationPatch } from "@/lib/core/server"; 

import {serverFetch, serverMutationPatch } from "../core/server";

export const getAllUsers = async () => {
    return serverFetch('/api/users');
};


export const updateUserStatus = async (userId, status) => {
    return serverMutationPatch('/api/users', { userId, status });
};


export const updateUserRole = async (userId, role) => {
    return serverMutationPatch('/api/users', { userId, role });
};