import { PostClientRequest } from "./client-models";
import { Client } from "./client-models";

export async function postClient(data: PostClientRequest): Promise<Client> {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return postWithAuth<Client>(Api.postClients, data);
  }

  const res = await fetch(`/api/crm/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(`Create client failed: ${err.error || res.statusText}`);
  }

  return res.json();
}
