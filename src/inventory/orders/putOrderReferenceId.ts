

export interface OrderReferenceIdRequest {
  referenceId: string;
  [key: string]: any;
}

/**
 * Update order reference ID
 */
export async function putOrderReferenceId(
  orderId: string | number,
  data: OrderReferenceIdRequest
): Promise<any> {

  if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return await putWithAuth(Api.putOrderReferenceId(orderId), data);
  }

  const res = await fetch(`/api/orders/${orderId}/referenceId`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`Failed to apply order reference ID: ${res.statusText}`);
  }
  return res.json();

}
