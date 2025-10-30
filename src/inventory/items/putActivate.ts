/**
 * Activate an item by id
 */
export async function putActivateItem(id: string | number): Promise<any> {
  // Server-side: call inventory API with auth
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return putWithAuth(Api.putItemActivate(id));
  }

  // Client-side: call Next.js API route
  const res = await fetch(`/api/items/${id}/activate`, { method: "PUT" });
  if (!res.ok) throw new Error(`Activate item failed: ${res.statusText}`);
  return res.json();
}
