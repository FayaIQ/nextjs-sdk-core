export async function postOffersShippingDiscount(payload: any): Promise<any> {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return postWithAuth<any>(Api.postOffersShippingDiscount, payload);
  }

  const res = await fetch(`/api/offers/shipping-discount`, {
    method: "POST",
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
