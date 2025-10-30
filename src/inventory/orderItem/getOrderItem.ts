import { getWithAuth } from "../../core/fetcher";
import { Api } from "../../api/api";
import { OrderItem } from "../orders/order-models";

export async function getOrderItem(id: string | number , itemId: string | number): Promise<OrderItem> {
  if (typeof window === "undefined") {
    return getWithAuth<OrderItem>(Api.getOrderItem(id, itemId));
  }

  const res = await fetch(`/api/orders/${id}/orderItems/${itemId}`);
  if (!res.ok) throw new Error(`Failed to fetch order item: ${res.statusText}`);
  return res.json();
}
