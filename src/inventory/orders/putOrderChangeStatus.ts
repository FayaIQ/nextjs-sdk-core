import { postCopyToStore } from "../items";

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

export default putOrderChangeStatus;
