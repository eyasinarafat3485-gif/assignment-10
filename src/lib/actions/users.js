// 'use server'

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// export const updateUserInfo = async (data) => {

//     const res = await fetch(`${baseUrl}/api/user/update`, {
//         method: "POST",

//         headers: {
//             "Content-Type": "application/json",
//         },

//         body: JSON.stringify(data),

//     });


//     return await res.json();

// };

'use server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const updateUserInfo = async (data) => {
  try {
    const res = await fetch(`${baseUrl}/api/user/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    return result;
  } catch (error) {
    return { success: false, message: "Network error" };
  }
};