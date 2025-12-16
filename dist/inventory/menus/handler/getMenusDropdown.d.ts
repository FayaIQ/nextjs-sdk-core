import { Category } from '../../../types.js';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Ready-to-use API route handler for products
 * Users can simply re-export this in their app/api/getProducts/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/handlers/getProducts';
 */
declare function GET(request: NextRequest): Promise<NextResponse<Category> | NextResponse<{
    error: string;
}>>;

export { GET };
