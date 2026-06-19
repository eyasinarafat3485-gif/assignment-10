'use server'

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const updateUserInfo = async (data) => {

    const res = await fetch(`${baseUrl}/api/user/update`, {
        method: "POST",

        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(data),

    });


    return await res.json();

};