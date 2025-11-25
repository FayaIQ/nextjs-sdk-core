import { Client } from "./client-models";

export async function getClients(): Promise<Client[]> {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return getWithAuth<Client[]>(Api.getClients);
  }

  const res = await fetch(`/api/crm/clients`);
  if (!res.ok) throw new Error(`Failed to fetch clients: ${res.statusText}`);
  return res.json();
}
