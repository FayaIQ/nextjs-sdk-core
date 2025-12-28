export interface CancelOrderResponse {
  success: boolean;
  message?: string;
}

export async function putOrderCancel(
  id: string | number,
  note?: string
): Promise<CancelOrderResponse> {
  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");

    return putWithAuth<CancelOrderResponse>(Api.putOrderCancel(id), {
      note: note || "",
    });
  }

  // Client-side: Use Next.js API route
  const response = await fetch(`/api/orders/${id}/Cancel`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ note: note || "" }),
  });

  if (!response.ok) {
    throw new Error(`Failed to cancel order: ${response.statusText}`);
  }

  return response.json();
}
