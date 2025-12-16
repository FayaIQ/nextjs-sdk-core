// src/stores/getStoreUsersPaging.ts
async function getStoreUsersPaging(params = {}) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== void 0 && v !== null) {
      if (Array.isArray(v)) {
        v.forEach((x) => qs.append(k, String(x)));
      } else {
        qs.append(k, String(v));
      }
    }
  });
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    const url = Api.getStoreUsersPaging();
    return getWithAuth(`${url}?${qs.toString()}`);
  }
  const res = await fetch(`/api/stores/users/paging?${qs.toString()}`);
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Failed to fetch store users: ${res.status} ${res.statusText} ${txt}`);
  }
  return res.json();
}

export {
  getStoreUsersPaging
};
