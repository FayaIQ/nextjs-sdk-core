export interface ApproveOrderResponse {
  success: boolean;
  message?: string;
}

export async function putOrderApprove(id: string | number , note ?: string): Promise<ApproveOrderResponse> {
  // Server-side: Use direct API call with authentication
    if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../core/fetcher");
    const { default: getToken } = await import("../../token");
    const { Api } = await import("../../api/api");

    const token = await getToken();
    return putWithAuth<ApproveOrderResponse>(
      Api.putOrderApprove(id),
      token,
      { note: note || "" } 
    );
  }

  // Client-side: Use Next.js API route
  const response = await fetch(`/api/orders/${id}/approve`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ note: note || "" }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to approve order: ${response.statusText}`);
  }
  
  return response.json();
}

export async function putOrderApproveList(ids: (string | number)[], note?: string): Promise<ApproveOrderResponse> {
  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../core/fetcher");
    const { default: getToken } = await import("../../token");
    const { Api } = await import("../../api/api");
    
    const token = await getToken();
    return putWithAuth<ApproveOrderResponse>(
      Api.putOrderApproveList(),

      token,
      { ordersIds : ids, note: note || "" } 
    );
  }

  // Client-side: Use Next.js API route
  const response = await fetch("/api/orders/approve-list", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ orderIds: ids  , note: note || "" }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to approve orders: ${response.statusText}`);
  }
  
  return response.json();
}