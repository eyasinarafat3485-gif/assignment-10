import { serverFetch } from "../core/server";

export const searchDonors = async ({ bloodGroup, district, upazila }) => {
    const query = new URLSearchParams({
        bloodGroup: bloodGroup || "",
        district: district || "",
        upazila: upazila || ""
    }).toString();

    // serverFetch ব্যবহার করে ক্লিন কোড, ম্যানুয়াল fetch ও method বাদ দেওয়া হয়েছে
    return serverFetch(`/api/donors/search?${query}`);
};