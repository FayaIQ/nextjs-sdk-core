export interface DisapproveOrderResponse {
  success: boolean;
  message?: string;
}

export async function putOrderDisapprove(id: string | number , note: string): Promise<DisapproveOrderResponse> {
  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    
    return putWithAuth<DisapproveOrderResponse>(
      Api.putOrderDisapprove(id),
      { note: note },

    );
  }

  // Client-side: Use Next.js API route
  const response = await fetch(`/api/orders/${id}/disapprove`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ note: note }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to disapprove order: ${response.statusText}`);
  }
  
  return response.json();
}

export async function putOrderDisapproveList(ids: (string | number)[] , note?: string): Promise<DisapproveOrderResponse> {
  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../core/fetcher");
    const { default: getToken } = await import("../../token");
    const { Api } = await import("../../api/api");
    
    const token = await getToken();
    return putWithAuth<DisapproveOrderResponse>(
      Api.putOrderDisapproveList(),
       { ordersIds : ids, note: note }
    );
  }

  // Client-side: Use Next.js API route
  const response = await fetch("/api/orders/disapprove-list", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderIds: ids, note: note || "" }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to disapprove orders: ${response.statusText}`);
  }
  
  return response.json();
}