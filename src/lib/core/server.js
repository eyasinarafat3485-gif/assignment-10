'use server'

import { authHeadaer } from "../actions/users"; // Header spell check kore niben proyojone

// Jodi client variable kaj na kore, backend raw env use kora bhalo server function e
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL;

// Reusable handler to avoid repetitive code and handle errors safely
const safeFetch = async (path, options = {}) => {
    if (!baseUrl) {
        console.error("❌ Error: NEXT_PUBLIC_BASE_URL is undefined! Check your .env.local file.");
        throw new Error("Base URL config missing.");
    }

    const fullUrl = `${baseUrl.replace(/\/$/, '')}${path}`; // double slash (//) prevent korbe path er age string thakle

    try {
        const res = await fetch(fullUrl, options);

        // Server crash ba 400/500 errors handle korar jonno
        if (!res.ok) {
            const errorText = await res.text(); // JSON crash thakate direct text read kora safe
            console.error(`❌ HTTP Error! Status: ${res.status} on path: ${path}. Response: ${errorText}`);
            return { error: true, status: res.status, message: errorText || "Something went wrong" };
        }

        return await res.json();
    } catch (error) {
        console.error(`🔥 Fetch failed totally for path ${path}:`, error.message);
        return { error: true, message: "Network connection failed or Server is Down" };
    }
};

export const serverFetch = async (path) => {
    return safeFetch(path);
};

export const protectedFatch = async (path) => {
    return safeFetch(path, {
        headers: await authHeadaer()
    });
};

export const serverMutationBReq = async (path, data) => {
    return safeFetch(path, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...(await authHeadaer().catch(() => ({}))) // jodi auth thake, safe backup fallback shorthand
        },
        body: JSON.stringify(data)
    });
};

export const serverMutationPatch = async (path, data) => {
    return safeFetch(path, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
};

export const serverMutationDelete = async (path) => {
    return safeFetch(path, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    });
};