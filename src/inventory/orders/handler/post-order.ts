import { NextRequest, NextResponse } from "next/server";
import { postOrder } from "../postOrder";

/**
 * Ready-to-use API route handler for creating orders
 * Users can simply re-export this in their app/api/orders/route.ts:
 *
 * @example
 * export { POST } from 'erp-core/inventory/orders';
 */
export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();

    console.log("📦 Received order data:", JSON.stringify(orderData, null, 2));

    if (
      !orderData.address ||
      !orderData.orderItems ||
      !Array.isArray(orderData.orderItems)
    ) {
      return NextResponse.json(
        { error: "Invalid order data. address and orderItems are required." },
        { status: 400 }
      );
    }

    if (orderData.orderItems.length === 0) {
      return NextResponse.json(
        { error: "orderItems array cannot be empty" },
        { status: 400 }
      );
    }

    // Extract headers from the incoming request
    const headers: Record<string, string> = {};

    // Pass through authorization header if present
    const authHeader = request.headers.get("authorization");
    if (authHeader) {
      headers["Authorization"] = authHeader;
    }

    // Pass through any custom headers that might be needed
    const storeId = request.headers.get("x-store-id");
    if (storeId) {
      headers["X-Store-Id"] = storeId;
    }

    console.log("🔑 Using headers:", Object.keys(headers));

    const result = await postOrder(orderData, { headers });
    console.log("✅ Order created successfully:", result);
    return NextResponse.json(result);
  } catch (error) {
    console.error("❌ Order creation error (full):", error);

    // Extract detailed error information
    let errorMessage = "Failed to create order";
    let errorDetails: any = null;
    let statusCode = 500;

    if (error && typeof error === "object") {
      // Check if it's an ApiError from our fetcher
      const apiError = error as any;
      if (apiError.status) {
        statusCode = apiError.status;

        // Provide helpful messages for common errors
        if (apiError.status === 403) {
          errorMessage =
            "Authentication failed. Please ensure you're logged in and have permission to create orders.";
          console.error(
            "🔒 403 Forbidden - Token might be invalid, expired, or missing required permissions"
          );
        } else if (apiError.status === 401) {
          errorMessage = "Unauthorized. Please log in first.";
        }
      }
      if (apiError.body) {
        errorDetails = apiError.body;
        console.error(
          "📄 API Error Body:",
          JSON.stringify(apiError.body, null, 2)
        );
      }
      if (
        apiError.message &&
        apiError.status !== 403 &&
        apiError.status !== 401
      ) {
        errorMessage = apiError.message;
      }
    } else if (error instanceof Error) {
      errorMessage = error.message;
      console.error("Error stack:", error.stack);
    }

    console.error("💥 Final error message:", errorMessage);

    return NextResponse.json(
      {
        error: errorMessage,
        details: errorDetails,
        rawError: error instanceof Error ? error.toString() : String(error),
      },
      { status: statusCode }
    );
  }
}
