import { P as Product, b as ProductResponse, U as UpdateItemRequest } from '../../getProductInfo-BNMwboCr.cjs';
export { B as Brand, C as CollectionItem, I as ItemColor, h as ItemsCollectionsFilterRequest, M as MultipleMenu, f as PackUnit, e as Packs, d as SizeSet, S as SizeValue, c as UnitInfo, a as getProductInfo, g as getProducts } from '../../getProductInfo-BNMwboCr.cjs';
import { I as ItemsFilterParameters } from '../../filter-models-hHJG3Qpk.cjs';
export { A as AgeGroup, G as Gender, N as NewArrivalPeriod, P as PagingParameters, S as SortType } from '../../filter-models-hHJG3Qpk.cjs';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Fetches detailed information for a specific product (v2) by ID
 * Works in both server and client components
 */
declare function getProductInfoV2(id: string): Promise<Product>;

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
 * Fetches item by ID using v3 API endpoint
 * Works in both server and client components
 *
 * @param id - The item ID to fetch
 * @returns Promise with item details
 *
 * @example
 * // Server component
 * const item = await getItemById(123);
 *
 * @example
 * // Client component
 * const item = await getItemById("123");
 */
declare function getItemById(id: string | number): Promise<Product>;

/**
 * Ready-to-use API route handler for products
 * Users can simply re-export this in their app/api/getProducts/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/handlers/getProducts';
 */
declare function GET$5(request: NextRequest): Promise<NextResponse<any>>;

declare function GET$4(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

declare function GET$3(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

/**
 * Ready-to-use API route handler for products
 * Users can simply re-export this in their app/api/getProducts/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/handlers/getProducts';
 */
declare function GET$2(request: NextRequest): Promise<NextResponse<any>>;

/**
 * GET handler for items paging (v2 API)
 * Fetches items with pagination and filters, with GetMultipleMenu set to true
 */
declare function GET$1(request: NextRequest): Promise<NextResponse<any>>;

declare function GET(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

interface CopyParentResponse {
    success: boolean;
    message?: string;
}
/**
 * Copy parent store items to current store.
 * @param itemIds array of item ids to copy
 */
declare function postCopyParentStore(itemIds: (number | string)[]): Promise<CopyParentResponse>;

interface CopyParentToChildStoresRequest {
    itemIds: (number | string)[];
    childStoreIds?: (number | string)[];
}
interface CopyParentToChildStoresResponse {
    success: boolean;
    message?: string;
}
/**
 * Copy selected parent items to multiple child stores.
 */
declare function postCopyParentToChildStores(payload: CopyParentToChildStoresRequest): Promise<CopyParentToChildStoresResponse>;

interface CopyToStoreRequest {
    itemIds: (number | string)[];
    forceUpdate?: boolean;
}
interface CopyToStoreResponse {
    success: boolean;
    message?: string;
}
/**
 * Copy selected items to a specific child store.
 */
declare function postCopyToStore(childStoreId: string | number, payload: CopyToStoreRequest): Promise<CopyToStoreResponse>;

declare function POST$2(request: NextRequest): Promise<NextResponse<any>>;

declare function POST$1(request: NextRequest): Promise<NextResponse<any>>;

declare function POST(request: NextRequest, { params }: {
    params: Promise<{
        childStoreId: string;
    }>;
}): Promise<NextResponse<any>>;

/**
 * Trigger a sync from the parent store to child store(s) for a specific item
 */
declare function putParentStoreSync(itemId: string | number, body?: any): Promise<any>;

declare function PUT$5(request: NextRequest, { params }: {
    params: Promise<{
        itemId: string;
    }>;
}): Promise<NextResponse<any>>;

/**
 * Activate an item by id
 */
declare function putActivateItem(id: string | number): Promise<any>;

/**
 * Deactivate an item by id
 */
declare function putDeactivateItem(id: string | number): Promise<any>;

/**
 * Activate item collections by filter
 * @param payload ItemsCollectionsFilterRequest
 */
declare function putCollectionsActivateByFilter(payload: any): Promise<any>;

/**
 * Deactivate item collections by filter
 * @param payload ItemsCollectionsFilterRequest
 */
declare function putCollectionsDeactivateByFilter(payload: any): Promise<any>;

interface UpdateItemResponse {
    success: boolean;
    message?: string;
    code?: string;
    name?: string;
}
/**
 * Update an item by id
 * @param id - Item ID
 * @param data - Fields to update
 */
declare function putItem(id: string | number, data: UpdateItemRequest): Promise<UpdateItemResponse>;

declare function deleteItem(id: string | number): Promise<any>;

declare function PUT$4(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

declare function PUT$3(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

declare function PUT$2(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

declare function DELETE(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<Response>;

declare function PUT$1(request: NextRequest): Promise<NextResponse<any>>;

declare function PUT(request: NextRequest): Promise<NextResponse<any>>;

export { type CopyParentResponse, POST$2 as CopyParentStorePOST, POST$1 as CopyParentToChildStoresPOST, type CopyParentToChildStoresRequest, type CopyParentToChildStoresResponse, POST as CopyToStorePOST, type CopyToStoreRequest, type CopyToStoreResponse, DELETE as DeleteItemDELETE, GET as GetItemByIdGET, GET$1 as GetItemsPagingGET, type GetItemsPagingParams, GET$2 as GetParentProductsGET, GET$5 as GetProductsGET, ItemsFilterParameters, Product, GET$4 as ProductInfoGET, GET$3 as ProductInfoV2GET, ProductResponse, PUT$1 as PutCollectionsActivateByFilterPUT, PUT as PutCollectionsDeactivateByFilterPUT, PUT$4 as PutItemActivatePUT, PUT$3 as PutItemDeactivatePUT, PUT$2 as PutItemPUT, PUT$5 as PutParentStoreSyncPUT, UpdateItemRequest, type UpdateItemResponse, deleteItem, getItemById, getItemsPaging, getParentProducts, getProductInfoV2, postCopyParentStore, postCopyParentToChildStores, postCopyToStore, putActivateItem, putCollectionsActivateByFilter, putCollectionsDeactivateByFilter, putDeactivateItem, putItem, putParentStoreSync };
