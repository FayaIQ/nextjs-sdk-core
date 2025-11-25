export async function putOffersGroup(offerId: string | number, id: string | number, payload: any): Promise<any> {
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return putWithAuth<any>(Api.putOffersGroup(offerId, id), payload);
  }

  const res = await fetch(`/api/offers/${offerId}/offer-groups/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    // Extract error message from response body before throwing
    let errorMessage = `failed: ${res.status} ${res.statusText}`;
      const errorBody = await res.json();
      // Use the error message from the API response
      errorMessage = errorBody.error || errorBody.message || errorMessage;
  
    throw new Error(errorMessage);
  }
  return res.json();
}
