import { NextRequest, NextResponse } from 'next/server';

declare function getSlides(): Promise<any>;

/**
 * Ready-to-use API route handler for orders
 * Users can simply re-export this in their app/api/getSlides/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/handlers/getSlides';
 */
declare function GET(request: NextRequest): Promise<NextResponse<any>>;

export { getSlides, GET as getSlidesGET };
