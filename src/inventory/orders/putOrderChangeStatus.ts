
export interface ChangeOrderStatusRequest {
  status: number;
  note: string ;
  [key: string]: any;
}

/**
 * Change the delivery status of an order
 */
export async function putOrderChangeStatus(
  orderId: string | number,
  data: ChangeOrderStatusRequest
): Promise<any> {
   if (typeof window === "undefined") {
    const { putWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");
    return await putWithAuth(Api.putChangeStatusOrder(orderId), data);
   }

  const res = await fetch(`/api/orders/${orderId}/change-status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
    if (!res.ok) {
        throw new Error(`Failed to change order status: ${res.statusText}`);
    }
    return res.json();

}
