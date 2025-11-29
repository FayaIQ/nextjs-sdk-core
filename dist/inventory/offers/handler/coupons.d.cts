import { NextRequest, NextResponse } from 'next/server';

/**
 * Ready-to-use API route handler for coupons
 * Users can simply re-export this in their app/api/getCoupons/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/handlers/coupons';
 */
declare function GET(request: NextRequest): Promise<NextResponse<any>>;

export { GET };
