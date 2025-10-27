
/**
 * Get single order details by ID
 */
export async function getOrder( id : string ) {

  // Server-side: Use direct API call with authentication
  if (typeof window === "undefined") {
    // Import these from your existing setup
    const { getWithAuth  } = await import("../../core/fetcher");
    const { Api} = await import("../../api/api");

    return getWithAuth(
      `${Api.getOrder(id)}`,
    );
  }

  // Client-side: Use Next.js API route
  const response = await fetch(`/api/orders/${id}`);


  if (!response.ok) {
    throw new Error(`Failed to fetch orders: ${response.statusText}`);
  }
  
  return response.json();
}