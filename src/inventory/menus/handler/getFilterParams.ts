import { NextRequest, NextResponse } from "next/server";
import { getFilterParams } from "../getFilterParams";
import { ItemsFilterParameters } from "../../items/filter-models";

/**
 * Ready-to-use API route handler for filter parameters
 * Users can simply re-export this in their app/api/filterParams/route.ts:
 *
 * @example
 * export { GET } from 'erp-core/inventory/menus/handler/getFilterParams';
 */
export async function GET(request: NextRequest) {
  try {
    // Parse query parameters from URL
    const { searchParams } = new URL(request.url);

    // Create ItemsFilterParameters from query string
    const filterParams =
      ItemsFilterParameters.fromURLSearchParams(searchParams);

    const filterParamsResult = await getFilterParams({ filterParams });
    return NextResponse.json(filterParamsResult);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Failed to fetch filter parameters";
    console.error("Filter parameters error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
