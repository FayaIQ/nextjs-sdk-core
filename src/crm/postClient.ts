import { PostClientRequest } from "./client-models";
import { Client } from "./client-models";

export async function postClient(data: PostClientRequest): Promise<Client> {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../core/fetcher");
    const { Api } = await import("../api/api");
    return postWithAuth<Client>(Api.postClients, data);
  }

  const res = await fetch(`/api/crm/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
if (!res.ok) {
    // Extract error message from response body before throwing
    let errorMessage = ` failed: ${res.status} ${res.statusText}`;
    try {
      const errorBody = await res.json();
      errorMessage = errorBody.error || errorBody.message || errorMessage;
    } catch (parseErr) {
      // If parsing fails, use the default message
      console.error("Failed to parse error response:", parseErr);
    }
    throw new Error(errorMessage);
  }
  
  return res.json();
}