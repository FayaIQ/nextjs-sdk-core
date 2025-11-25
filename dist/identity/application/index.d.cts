import { NextRequest, NextResponse } from 'next/server';
import { S as StoreInfo } from '../../storeInfo-P_uWqRYc.cjs';
export { a as Store, g as getStoreInfo } from '../../storeInfo-P_uWqRYc.cjs';
import '../../types-BlK7R_r9.cjs';

/**
 * Ready-to-use API route handler for stores
 * Users can simply re-export this in their app/api/applications/stores/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/applications/handler/stores';
 */
declare function GET$1(request: NextRequest): Promise<NextResponse<any>>;

declare function GET(): Promise<NextResponse<StoreInfo> | NextResponse<{
    error: string;
}>>;

declare function getStores(): Promise<any>;

export { GET as GETStoreInfo, GET$1 as GETStores, StoreInfo, getStores };
