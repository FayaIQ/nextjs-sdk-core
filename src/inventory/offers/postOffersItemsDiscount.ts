import {type  OfferPostRequest}  from "./types";

export async function postOffersItemsDiscount(payload: OfferPostRequest): Promise<any> {
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
  // payload may have a stricter type than RequestData; cast to any to satisfy the fetcher signature
  return postWithAuth<any>(Api.postOffersItemsDiscount, payload as any);
  }

  const res = await fetch(`/api/offers/items-discount`, {
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
