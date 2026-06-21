// /lib/api/allUsers.js
import { serverFetch, serverMutationPatch } from "@/lib/core/server"; // ⚠️ tomar actual import path bosao

export const getAllUsers = async () => {
    return serverFetch('/api/users');
};

// ✅ Backend er single PATCH /api/users route onujai — body te userId + status pathay
export const updateUserStatus = async (userId, status) => {
    return serverMutationPatch('/api/users', { userId, status });
};

// ✅ Backend er single PATCH /api/users route onujai — body te userId + role pathay
export const updateUserRole = async (userId, role) => {
    return serverMutationPatch('/api/users', { userId, role });
};