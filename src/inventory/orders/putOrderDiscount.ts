
import { Api } from "../../api/api";
import { putWithAuth } from "../../core/fetcher";

export interface OrderDiscountRequest {
  discountType: number
  discountValue: number;
  [key: string]: any;
}

/**
 * Apply discount to an order
 */
export async function putOrderDiscount(
  orderId: string | number,
  data: OrderDiscountRequest
): Promise<any> {
      if (typeof window === "undefined") {
      return await putWithAuth(Api.putOrderDiscount(orderId), data);
     }
  
    const res = await fetch(`/api/orders/${orderId}/discount`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
      if (!res.ok) {
          throw new Error(`Failed to apply order discount: ${res.statusText}`);
      }
      return res.json();
  
}
