"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiFetch = apiFetch;
async function apiFetch(url, options = {}) {
    const { method = "GET", headers = {}, data, query, token } = options;
    let endpoint = url;
    if (query) {
        const params = new URLSearchParams();
        Object.entries(query).forEach(([k, v]) => {
            if (v !== undefined && v !== null)
                params.append(k, String(v));
        });
        endpoint += `?${params.toString()}`;
    }
    const allHeaders = { ...headers };
    allHeaders["Authorization"] = `Bearer ${token}`;
    if (data && !(data instanceof FormData))
        allHeaders["Content-Type"] = "application/json";
    const res = await fetch(endpoint, {
        method,
        headers: allHeaders,
        body: data && !(data instanceof FormData) ? JSON.stringify(data) : data,
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || `Request failed with status ${res.status}`);
    }
    return res.json();
}
