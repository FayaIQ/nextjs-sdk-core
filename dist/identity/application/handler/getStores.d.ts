import { NextRequest, NextResponse } from 'next/server';

/**
 * Ready-to-use API route handler for stores
 * Users can simply re-export this in their app/api/applications/stores/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/applications/handler/stores';
 */
declare function GET(request: NextRequest): Promise<NextResponse<any>>;

export { GET };
