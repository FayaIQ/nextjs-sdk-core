export { g as getMenus } from '../../getMenus-DneqpZEa.cjs';
import { C as Category } from '../../types-BlK7R_r9.cjs';
import { NextRequest, NextResponse } from 'next/server';
import '../../filter-models-B4kRw7Xr.cjs';

/**
 * Ready-to-use API route handler for orders
 * Users can simply re-export this in their app/api/getOrders/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/handlers/getOrders';
 */
declare function GET$2(request: NextRequest): Promise<NextResponse<Category[]> | NextResponse<{
    error: string;
}>>;

interface MenusDropdown {
    parentId: number | null;
    menuID: number;
    name: string;
    syncThirdPartyId: string | null;
    menuIdRoot: number | null;
    menuIdLevel1: number | null;
    menuIdLevel2: number | null;
    menuIdLevel3: number | null;
}

declare function getMenusDropdown(): Promise<Category>;

/**
 * Ready-to-use API route handler for products
 * Users can simply re-export this in their app/api/getProducts/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/handlers/getProducts';
 */
declare function GET$1(request: NextRequest): Promise<NextResponse<Category> | NextResponse<{
    error: string;
}>>;

/**
 * Fetch a single menu by ID (v1)
 */
declare function getMenuById(id: string | number): Promise<Category>;

declare function GET(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<Category> | NextResponse<{
    error: string;
}>>;

export { GET as GetMenuByIdGET, GET$1 as GetMenusDropdownGET, GET$2 as GetMenusGET, type MenusDropdown, getMenuById, getMenusDropdown };
