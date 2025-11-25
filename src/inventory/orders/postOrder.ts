import { postWithAuth } from "../../core/fetcher";
import { Api } from "../../api/api";

/**
 * Order item interface for creating orders
 */
export interface OrderItemInput {
  itemId: number;
  quantity: number;
  colorId?: number | null;
  sizeId?: number | null;
  unitLevel?: number;
  freeQuantity?: number;
  discount?: number;
  note?: string;
  costPrice?: number;
  price?: number;
  pricePack1?: number;
  pricePack2?: number;
}

/**
 * Address information for order delivery
 */
export interface CreateOrderAddress {
  districtId: number;
  note?: string;
  gps?: string;
  appartmentId?: number;
}

/**
 * Request payload for creating a new order
 */
export interface PostOrderRequest {
  address: CreateOrderAddress;
  storeId?: number;
  orderType?: number;
  deleveryType?: number;
  payType?: number;
  gatewayType?: number;
  orderDeleveryDate?: string;
  note?: string;
  currencyId?: number;
  couponCode?: string;
  laserNote?: string;
  giftNote?: string;
  clientId?: string;
  paymentTokenId?: string;
  points?: number;
  applyDarkOffer?: boolean;
  orderItems: OrderItemInput[];
}

/**
 * Response from order creation
 */
export interface PostOrderResponse {
  [key: string]: any;
}

/**
 * Options for postOrder function
 */
export interface PostOrderOptions {
  headers?: Record<string, string>;
}

/**
 * Create a new order (server-side with authentication)
 *
 * @param orderData - The order data to create
 * @param options - Optional configuration (e.g., custom headers)
 * @returns Promise with the created order response
 *
 * @example Server Component:
 * ```typescript
 * import { postOrder } from 'erp-core/inventory/orders';
 *
 * const orderData = {
 *   address: {
 *     districtId: 21,
 *     gps: "",
 *     note: "Delivery instructions"
 *   },
 *   orderType: 1,
 *   deleveryType: 1,
 *   payType: 1,
 *   gatewayType: 1,
 *   orderItems: [
 *     {
 *       itemId: 389003,
 *       quantity: 1,
 *       colorId: 105901,
 *       unitLevel: 1
 *     }
 *   ]
 * };
 *
 * // With custom headers if needed
 * const result = await postOrder(orderData, {
 *   headers: { 'X-Store-Id': '123' }
 * });
 * ```
 *
 * @example Client Component (using API route):
 * ```typescript
 * const response = await fetch('/api/orders', {
 *   method: 'POST',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify(orderData)
 * });
 * const result = await response.json();
 * ```
 */
export async function postOrder(
  orderData: PostOrderRequest,
  options?: PostOrderOptions
): Promise<PostOrderResponse> {
  // Server-side execution using core fetcher with auth
  if (typeof window === "undefined") {
    try {
      return await postWithAuth<PostOrderResponse>(
        Api.postOrders,
        orderData,
        options?.headers
      );
    } catch (error: any) {
      // Add more context to authentication errors
      if (error.status === 403) {
        console.error("🔒 Authentication failed. Please check:");
        console.error("1. Token is valid and not expired");
        console.error("2. User has permission to create orders");
        console.error("3. Required headers are included (e.g., StoreId)");
      }
      throw error;
    }
  }

  // Client-side execution - route through Next.js API
  const res = await fetch(`/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    body: JSON.stringify(orderData),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(
      error.message || `Failed to create order: ${res.statusText}`
    );
  }

  return res.json();
}
