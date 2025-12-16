// src/crm/getClients.ts
function toQueryString(filter) {
  if (!filter) return "";
  if (typeof filter === "string") return filter.startsWith("?") ? filter : `?${filter}`;
  if (filter instanceof URLSearchParams) return `?${filter.toString()}`;
  if (typeof filter.toURLSearchParams === "function") {
    return `?${filter.toURLSearchParams().toString()}`;
  }
  const usp = new URLSearchParams();
  Object.entries(filter).forEach(([k, v]) => {
    if (v === void 0 || v === null) return;
    if (Array.isArray(v)) v.forEach((item) => usp.append(k, String(item)));
    else usp.append(k, String(v));
  });
  const qs = usp.toString();
  return qs ? `?${qs}` : "";
}
async function getClients({ filterParams } = {}) {
  const qs = toQueryString(filterParams);
  console.log("getClients query string:", qs);
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return getWithAuth(`${Api.getClients}${qs}`);
  }
  const res = await fetch(`/api/crm/clients${qs}`);
  if (!res.ok) {
    let msg = `Failed to fetch clients: ${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      msg = body?.error || body?.message || msg;
    } catch (_) {
    }
    throw new Error(msg);
  }
  return res.json();
}

export {
  getClients
};
