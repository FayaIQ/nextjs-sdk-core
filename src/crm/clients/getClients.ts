import { Client } from "./client-models";

type Params = Record<string, unknown> | URLSearchParams | string | undefined;

function buildQuery(params?: Params): string {
  if (!params) return "";
  if (typeof params === "string") return params.startsWith("?") ? params : `?${params}`;
  if (params instanceof URLSearchParams) return `?${params.toString()}`;
  // Record
  const usp = new URLSearchParams();
  Object.entries(params as Record<string, unknown>).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (Array.isArray(v)) {
      v.forEach(item => usp.append(k, String(item)));
    } else {
      usp.append(k, String(v));
    }
  });
  const qs = usp.toString();
  return qs ? `?${qs}` : "";
}

export async function getClients(params?: Params): Promise<Client[]> {
  const qs = buildQuery(params);

  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    // server: call the backend directly, append query string if present
    const url = Api.getClients + (qs || "");
    return getWithAuth<Client[]>(url);
  }

  // client: call local API proxy and forward query string
  const res = await fetch(`/api/crm/clients${qs}`);
  if (!res.ok) throw new Error(`Failed to fetch clients: ${res.statusText}`);
  return res.json();
}
