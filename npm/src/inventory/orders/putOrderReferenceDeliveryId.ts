"use server";

import { Api } from "../../api/api";
import { putWithAuth } from "../../core/fetcher";

export interface OrderReferenceDeliveryIdRequest {
  referenceDeliveryId: string;
  [key: string]: any;
}

/**
 * Update order reference delivery ID
 */
export async function putOrderReferenceDeliveryId(
  orderId: string | number,
  data: OrderReferenceDeliveryIdRequest
): Promise<any> {
      if (typeof window === "undefined") {
      return await putWithAuth(Api.putOrderReferenceDeliveryId(orderId), data);
     }
  
    const res = await fetch(`/api/orders/${orderId}/referenceDeliveryId`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
      if (!res.ok) {
          throw new Error(`Failed to apply order reference delivery ID: ${res.statusText}`);
      }
      return res.json();
  
}
