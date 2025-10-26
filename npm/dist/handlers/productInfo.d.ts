import { P as Product } from '../types-DPi3zGBH.js';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Ready-to-use API route handler for product info
 * Users can simply re-export this in their app/api/productInfo/[id]/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/handlers/productInfo';
 */
declare function GET(request: NextRequest, { params }: {
    params: {
        id: string;
    };
}): Promise<NextResponse<Product> | NextResponse<{
    error: string;
}>>;

export { GET };
