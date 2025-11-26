import { Client } from "./client-models";

type FilterLike = { toURLSearchParams(): URLSearchParams } | Record<string, any> | URLSearchParams | string;

function toQueryString(filter?: FilterLike): string {
  if (!filter) return "";
  if (typeof filter === "string") return filter.startsWith("?") ? filter : `?${filter}`;
  if (filter instanceof URLSearchParams) return `?${filter.toString()}`;
  if (typeof (filter as any).toURLSearchParams === "function") {
    return `?${(filter as any).toURLSearchParams().toString()}`;
  }
  const usp = new URLSearchParams();
  Object.entries(filter as Record<string, any>).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (Array.isArray(v)) v.forEach(item => usp.append(k, String(item)));
    else usp.append(k, String(v));
  });
  const qs = usp.toString();
  return qs ? `?${qs}` : "";
}

export async function getClients({ filterParams } : { filterParams?: FilterLike } = {}): Promise<Client[]> {
  const qs = toQueryString(filterParams);
console.log("getClients query string:", qs);
  // Server-side: call the backend directly with auth
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return getWithAuth<Client[]>(`${Api.getClients}${qs}`);
  }

  // Client-side: proxy to local API route
  const res = await fetch(`/api/crm/clients${qs}`);
  if (!res.ok) {
    let msg = `Failed to fetch clients: ${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      msg = body?.error || body?.message || msg;
    } catch (_) {
      // ignore parse errors
    }
    throw new Error(msg);
  }

  return res.json();
}