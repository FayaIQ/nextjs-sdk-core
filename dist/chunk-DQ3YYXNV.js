// src/crm/postClient.ts
async function postClient(data) {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("./core/fetcher.js");
    const { Api } = await import("./api/api.js");
    return postWithAuth(Api.postClients, data);
  }
  const res = await fetch(`/api/crm/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!res.ok) {
    let errorMessage = `Copy parent store failed: ${res.status} ${res.statusText}`;
    try {
      const errorBody = await res.json();
      errorMessage = errorBody.error || errorBody.message || errorMessage;
    } catch (parseErr) {
      console.error("Failed to parse error response:", parseErr);
    }
    throw new Error(errorMessage);
  }
  return res.json();
}

export {
  postClient
};
