import { Product } from "../../types";

export async function getProductInfo(id: number): Promise<Product> {
  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    const { postWithAuth } = await import("../../core/fetcher");
    const { Api } = await import("../../api/api");

    return postWithAuth<Product>(Api.getProductInfo(String(id)));
  }

  // Client-side: Use Next.js API route
  const response = await fetch(`/api/items/productInfo/` + `${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch order full info: ${response.statusText}`);
  }

  return response.json();
}
