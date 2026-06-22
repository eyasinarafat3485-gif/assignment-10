
'use server'

import { authHeadaer } from "../actions/users";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async(path)=>{
    const res = await fetch(`${baseUrl}${path}`);
    return res.json();
}

export const protectedFatch = async (path)=>{
    const res = await fetch(`${baseUrl}${path}`, 
        {
            headers: await authHeadaer()
        }
    );

    // handle 401, 403, 404

    return res.json();
}

export const serverMutationBReq = async (path, data) => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // ... await authHeadaer()
        },
        body: JSON.stringify(data)
    });

    return res.json();
};

export const serverMutationPatch = async (path, data) => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            ... await authHeadaer()
        },
        body: JSON.stringify(data)
    });

    return res.json();
};

export const serverMutationDelete = async (path) => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            ... await authHeadaer()
        }
    });

    return res.json();
};