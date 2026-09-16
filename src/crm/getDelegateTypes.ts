import { DelegateType } from "./client-models";

export async function getDelegateTypes(): Promise<DelegateType[]> {
  // Server-side: call the backend directly with auth
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../core/fetcher");
    const { Api } = await import("../api/api");
    return getWithAuth<DelegateType[]>(Api.getDelegateTypes);
  }

  // Client-side: proxy to local API route
  const res = await fetch(`/api/crm/delegate-types`);
  if (!res.ok) {
    let msg = `Failed to fetch delegate types: ${res.status} ${res.statusText}`;
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