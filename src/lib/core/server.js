// refactor api for POST Api call------------------------------------
'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const serverFetch = async(path)=>{
    const res = await fetch(`${baseUrl}${path}`);
    return res.json();
}

export const serverMutationBReq = async (path, data) => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return res.json();
};

// ✅ নতুন ফাংশন: status update (PATCH) এর জন্য
export const serverMutationPatch = async (path, data) => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return res.json();
};


// ... আপনার আগের বাকি কোড (serverFetch, serverMutationBReq, serverMutationPatch) এখানে থাকবে

// ✅ নতুন ফাংশন: Delete রিকোয়েস্ট (DELETE) এর জন্য
export const serverMutationDelete = async (path) => {
    const res = await fetch(`${baseUrl}${path}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return res.json();
};