/**
 * Get a store by id
 */
export async function getStoreById(id: string | number): Promise<any> {
  if (typeof window === "undefined") {
    const { getWithAuth } = await import("../core/fetcher");
    const { Api } = await import("../api/api");
    return getWithAuth<any>(Api.getStoreById(id));
  }

  const res = await fetch(`/api/stores/${id}`);
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


export default getStoreById;
