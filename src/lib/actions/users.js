'use server';

import { getUserToken } from "../core/session";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const authHeadaer = async()=>{
  const token = await getUserToken();
  const header = token ? {
    authorization: `Bearer ${token}`
  } : {};
  return  header;
}

export const updateUserInfo = async (data) => {
  const res = await fetch(`${baseUrl}/api/user/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ... await authHeadaer()
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};

