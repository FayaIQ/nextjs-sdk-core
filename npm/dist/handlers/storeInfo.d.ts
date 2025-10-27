import { S as StoreInfo } from '../types-BKRI70Wb.js';
import { NextResponse } from 'next/server';

/**
 * Ready-to-use API route handler for store info
 * Users can simply re-export this in their app/api/storeInfo/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/handlers/storeInfo';
 */
declare function GET(): Promise<NextResponse<StoreInfo> | NextResponse<{
    error: string;
}>>;

export { GET };
