import { P as ProductResponse, b as Product } from '../../getProductInfo-DfEXgRja.js';
export { C as CollectionItem, I as ItemColor, M as MultipleMenu, d as Packs, c as SizeSet, S as SizeValue, U as UnitInfo, a as getProductInfo, g as getProducts } from '../../getProductInfo-DfEXgRja.js';
import { I as ItemsFilterParameters } from '../../filter-models-BrX8v95o.js';
export { A as AgeGroup, G as Gender, N as NewArrivalPeriod, P as PagingParameters, S as SortType } from '../../filter-models-BrX8v95o.js';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Fetches a list of products with optional filtering and pagination

  * Works in both server and client components
  *
  * @returns Promise with product data
  * @example
  * // Server component
  * const filterParams = new ItemsFilterParameters();
  * filterParams.page = 1;
  * const products = await getParentProducts({ filterParams });
  * @example
  * // Client component
  * const filterParams = new ItemsFilterParameters();
  * filterParams.page = 1;
  * const products = await getParentProducts({ filterParams });
  * /
  * */
declare function getParentProducts({ filterParams, }: {
    filterParams: ItemsFilterParameters;
}): Promise<ProductResponse>;

type GetItemsPagingParams = ItemsFilterParameters;
/**
 * Get items with pagination (v2 API)
 * @param filters - Filter parameters for items
 * @returns Promise with ProductResponse
 */
declare function getItemsPaging(filters?: GetItemsPagingParams): Promise<ProductResponse>;

/**
 * Ready-to-use API route handler for products
 * Users can simply re-export this in their app/api/getProducts/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/handlers/getProducts';
 */
declare function GET$3(request: NextRequest): Promise<NextResponse<ProductResponse> | NextResponse<{
    error: string;
}>>;

declare function GET$2(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<Product> | NextResponse<{
    error: string;
}>>;

/**
 * Ready-to-use API route handler for products
 * Users can simply re-export this in their app/api/getProducts/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/handlers/getProducts';
 */
declare function GET$1(request: NextRequest): Promise<NextResponse<ProductResponse> | NextResponse<{
    error: string;
}>>;

/**
 * GET handler for items paging (v2 API)
 * Fetches items with pagination and filters, with GetMultipleMenu set to true
 */
declare function GET(request: NextRequest): Promise<NextResponse<unknown>>;

interface CopyParentResponse {
    success: boolean;
    message?: string;
}
/**
 * Copy parent store items to current store.
 * @param itemIds array of item ids to copy
 */
declare function postCopyParentStore(itemIds: (number | string)[]): Promise<CopyParentResponse>;

declare function POST(request: NextRequest): Promise<NextResponse<{
    error: string;
}> | NextResponse<CopyParentResponse>>;

/**
 * Activate an item by id
 */
declare function putActivateItem(id: string | number): Promise<any>;

/**
 * Deactivate an item by id
 */
declare function putDeactivateItem(id: string | number): Promise<any>;

declare function PUT$1(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

declare function PUT(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

export { type CopyParentResponse, POST as CopyParentStorePOST, GET as GetItemsPagingGET, type GetItemsPagingParams, GET$1 as GetParentProductsGET, GET$3 as GetProductsGET, ItemsFilterParameters, Product, GET$2 as ProductInfoGET, ProductResponse, PUT$1 as PutItemActivatePUT, PUT as PutItemDeactivatePUT, getItemsPaging, getParentProducts, postCopyParentStore, putActivateItem, putDeactivateItem };
