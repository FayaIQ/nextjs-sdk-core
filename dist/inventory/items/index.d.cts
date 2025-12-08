import { P as Product, b as ProductResponse, U as UpdateItemRequest } from '../../getProductInfo-DRk0a7Bx.cjs';
export { B as Brand, C as CollectionItem, I as ItemColor, h as ItemsCollectionsFilterRequest, M as MultipleMenu, f as PackUnit, e as Packs, d as SizeSet, S as SizeValue, c as UnitInfo, a as getProductInfo, g as getProducts } from '../../getProductInfo-DRk0a7Bx.cjs';
import { I as ItemsFilterParameters } from '../../filter-models-Dt5y9Xvs.cjs';
export { A as AgeGroup, G as Gender, N as NewArrivalPeriod, P as PagingParameters, S as SortType } from '../../filter-models-Dt5y9Xvs.cjs';
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

declare function POST(request: NextRequest): Promise<NextResponse<any>>;

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

export { type CopyParentResponse, POST as CopyParentStorePOST, DELETE as DeleteItemDELETE, GET as GetItemByIdGET, GET$1 as GetItemsPagingGET, type GetItemsPagingParams, GET$2 as GetParentProductsGET, GET$5 as GetProductsGET, ItemsFilterParameters, Product, GET$4 as ProductInfoGET, GET$3 as ProductInfoV2GET, ProductResponse, PUT$1 as PutCollectionsActivateByFilterPUT, PUT as PutCollectionsDeactivateByFilterPUT, PUT$4 as PutItemActivatePUT, PUT$3 as PutItemDeactivatePUT, PUT$2 as PutItemPUT, UpdateItemRequest, type UpdateItemResponse, deleteItem, getItemById, getItemsPaging, getParentProducts, getProductInfoV2, postCopyParentStore, putActivateItem, putCollectionsActivateByFilter, putCollectionsDeactivateByFilter, putDeactivateItem, putItem };
