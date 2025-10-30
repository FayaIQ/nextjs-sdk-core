import { NextRequest, NextResponse } from "next/server";
import { getWithAuth } from "../../../core/fetcher";
import { Api } from "../../../api/api";

/**
 * GET handler for items paging (v2 API)
 * Fetches items with pagination and filters, with GetMultipleMenu set to true
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Build query string from search params
    const params = new URLSearchParams();
    searchParams.forEach((value, key) => {
      params.set(key, value);
    });

    // Always set GetMultipleMenu to true
    params.set("GetMultipleMenu", "true");

    const queryString = params.toString();
    const url = queryString
      ? `${Api.getItemsPaging}?${queryString}`
      : `${Api.getItemsPaging}?GetMultipleMenu=true`;

    const data = await getWithAuth(url);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error fetching items paging:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch items paging",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
