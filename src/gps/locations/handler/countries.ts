// file: nextjs-sdk-core/npm/src/locations/handler/countries.ts

import { NextRequest, NextResponse } from "next/server";
import { getCountries } from "../getCountries";

/**
 * Ready-to-use API route handler for countries
 * Users can simply re-export this in their app/api/locations/countries/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/locations/handler/countries';
 */
export async function GET(request: NextRequest) {
  try {
    const countries = await getCountries();
    return NextResponse.json(countries);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch countries";
    console.error("countries error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}