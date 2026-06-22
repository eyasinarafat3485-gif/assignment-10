import { serverFetch } from "../core/server";

export const searchDonors = async ({ bloodGroup, district, upazila }) => {
    const query = new URLSearchParams({
        bloodGroup: bloodGroup || "",
        district: district || "",
        upazila: upazila || ""
    }).toString();

    return serverFetch(`/api/donors/search?${query}`);
};