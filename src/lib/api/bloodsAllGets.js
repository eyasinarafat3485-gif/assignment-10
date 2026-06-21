import { serverFetch } from "../core/server";

export const getAllBRequests = async (page = 1, limit = 10) => {
    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
    });

    return serverFetch(`/api/allbloodRequests?${queryParams}`);
};

// ✅ Volunteer-er "PublicRequestsPage" er jonno — notun dedicated route, shob status + search support
export const getVolunteerAllBRequests = async ({
    page = 1,
    limit = 10,
    status = '',
    search = ''
}) => {
    let url = `/api/volunteer/allRequests?page=${page}&limit=${limit}`;

    if (status) {
        url += `&status=${status}`;
    }
    if (search) {
        url += `&search=${encodeURIComponent(search)}`;
    }

    return serverFetch(url);
};


// ✅ Admin-er "All Blood Donation Request Page" er jonno
export const getAdminAllBRequests = async ({
    page = 1,
    limit = 10,
    status = '',
    search = ''
}) => {
    let url = `/api/admin/allRequests?page=${page}&limit=${limit}`;

    if (status) {
        url += `&status=${status}`;
    }
    if (search) {
        url += `&search=${encodeURIComponent(search)}`;
    }

    return serverFetch(url);
};