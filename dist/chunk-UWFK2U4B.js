// src/crm/clients/getClientsPaging.ts
async function getClientsPaging(query) {
  const qs = query ? `?${new URLSearchParams(query).toString()}` : "";
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return getWithAuth(`${Api.getClientsPaging}${qs}`);
  }
  const res = await fetch(`/api/crm/clients/paging${qs}`);
  if (!res.ok) throw new Error(`Failed to fetch clients paging: ${res.statusText}`);
  return res.json();
}

export {
  getClientsPaging
};
