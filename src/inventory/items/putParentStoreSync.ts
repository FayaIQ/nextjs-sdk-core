/**
 * Trigger a sync from the parent store to child store(s) for a specific item
 */
export async function putParentStoreSync(itemId: string | number, body?: any): Promise<any> {
  // Server-side: call upstream inventory API with auth
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    if (body !== undefined) return putWithAuth(Api.putItemParentStoreSync(itemId), body);
    return putWithAuth(Api.putItemParentStoreSync(itemId));
  }

  // Client-side: proxy to Next.js API route
  const res = await fetch(`/api/items/${itemId}/parent/store/sync`, {
    method: "PUT",
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    let errorMessage = `failed: ${res.status} ${res.statusText}`;
    try {
      const body = await res.json();
      errorMessage = body.error || body.message || errorMessage;
    } catch (e) {
      // ignore
    }
    throw new Error(errorMessage);
  }

  return res.json();
}


export default putParentStoreSync;
