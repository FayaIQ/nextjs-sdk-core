import { NextRequest, NextResponse } from 'next/server';
import { S as StoreInfo } from '../../storeInfo-q3EctBMs.js';
export { a as Store, g as getStoreInfo } from '../../storeInfo-q3EctBMs.js';
import '../../types-D0Xbpetb.js';

/**
 * Ready-to-use API route handler for stores
 * Users can simply re-export this in their app/api/applications/stores/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/applications/handler/stores';
 */
declare function GET$2(request: NextRequest): Promise<NextResponse<any>>;

declare function GET$1(): Promise<NextResponse<StoreInfo> | NextResponse<{
    error: string;
}>>;

interface ApplicationStoreDropdownItem {
    id: string;
    name: string;
    clientType: string;
}
declare function getApplicationsStoreDropdown(): Promise<ApplicationStoreDropdownItem[]>;

/**
 * Handler for application stores dropdown
 */
declare function GET(request: NextRequest): Promise<NextResponse<ApplicationStoreDropdownItem[]> | NextResponse<{
    error: string;
}>>;

declare function getStores(): Promise<any>;

export { type ApplicationStoreDropdownItem, GET as GETApplicationsStoreDropDown, GET$1 as GETStoreInfo, GET$2 as GETStores, StoreInfo, getApplicationsStoreDropdown, getStores };
