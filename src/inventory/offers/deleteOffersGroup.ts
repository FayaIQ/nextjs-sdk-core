export async function deleteOffersGroup(offerId: string | number, id: string | number): Promise<any> {
  if (typeof window === "undefined") {
    const { deleteWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return deleteWithAuth<any>(Api.deleteOffersGroup(offerId, id));
  }

  const res = await fetch(`/api/offers/${offerId}/offer-groups/${id}`, { method: "DELETE" });
   if (!res.ok) {
    // Extract error message from response body before throwing
    let errorMessage = `failed: ${res.status} ${res.statusText}`;
    try {
      const errorBody = await res.json();
      // Use the error message from the API response
      errorMessage = errorBody.error || errorBody.message || errorMessage;
    } catch (parseErr) {
      // If parsing fails, use the default message
      console.error("Failed to parse error response:", parseErr);
    }
    throw new Error(errorMessage);
  }
  
  return res.json();
}
