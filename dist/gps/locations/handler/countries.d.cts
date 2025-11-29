import { NextRequest, NextResponse } from 'next/server';

/**
 * Ready-to-use API route handler for countries
 * Users can simply re-export this in their app/api/locations/countries/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/locations/handler/countries';
 */
declare function GET(request: NextRequest): Promise<NextResponse<any>>;

export { GET };
