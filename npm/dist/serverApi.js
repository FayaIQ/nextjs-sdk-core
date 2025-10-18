import { apiFetch } from "./fetcher";
import getToken from "./token";
async function request(endpoint, method, options = {}) {
    const { data, query, headers: customHeaders = {} } = options;
    const token = await getToken();
    const fetchOptions = { method, headers: customHeaders, data, query, token };
    return apiFetch(endpoint, fetchOptions);
}
// Exported methods
export const serverApi = {
    get: (endpoint, options) => request(endpoint, "GET", options),
    post: (endpoint, data, options) => request(endpoint, "POST", { ...options, data }),
    put: (endpoint, data, options) => request(endpoint, "PUT", { ...options, data }),
    delete: (endpoint, options) => request(endpoint, "DELETE", options),
};
