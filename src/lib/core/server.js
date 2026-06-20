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

 // aga amon selo simple single api call
// 'use server'

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const createBloodRequests = async (newBloodRequests) => {
//     const res = await fetch(`${baseUrl}/api/bloodRequests`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newBloodRequests)
//     });

//     return res.json();

// };
