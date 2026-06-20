import { serverFetch } from "../core/server";

export const getAllBRequests = async (page = 1, limit = 10) => {
    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
    });

    return serverFetch(`/api/allbloodRequests?${queryParams}`);
};