import { PostClientRequest, Client } from "../client-models";

/**
 * Update an existing client
 */
export async function putClient(id: string, data: PostClientRequest): Promise<Client> {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return putWithAuth<Client>(Api.putClient(id), data);
  }

  const res = await fetch(`/api/crm/clients/${encodeURIComponent(String(id))}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    let errorMessage = `Failed to update client: ${res.status} ${res.statusText}`;
    try {
      const errorBody = await res.json();
      console.log("Error body from API:", errorBody);
      errorMessage =  errorBody || errorMessage;
      console.error("Error response from API:", errorBody);
    } catch (parseErr) {
      console.error("Failed to parse error response:", parseErr);
    }
    throw new Error(errorMessage);
  }

  return res.json();
}
