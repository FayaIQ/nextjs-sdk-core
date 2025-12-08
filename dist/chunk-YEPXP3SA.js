// src/stores/getStoreUsersPaging.ts
async function getStoreUsersPaging(params) {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    const qs2 = params ? new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString() : "";
    const url = qs2 ? `${Api.getStoreUsersPaging}?${qs2}` : Api.getStoreUsersPaging;
    return getWithAuth(url);
  }
  const qs = params ? new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString() : "";
  const res = await fetch(`/api/store-users/paging${qs ? `?${qs}` : ""}`);
  if (!res.ok) throw new Error(`Failed to fetch store users: ${res.statusText}`);
  return res.json();
}

export {
  getStoreUsersPaging
};
