import { NextRequest, NextResponse } from 'next/server';

/**
 * GET handler for items paging (v2 API)
 * Fetches items with pagination and filters, with GetMultipleMenu set to true
 */
declare function GET(request: NextRequest): Promise<NextResponse<any>>;

export { GET };
