import { P as ProductResponse, b as Product } from '../../getProductInfo-DoDiQlga.js';
export { C as CollectionItem, I as ItemColor, M as MultipleMenu, d as Packs, c as SizeSet, S as SizeValue, U as UnitInfo, a as getProductInfo, g as getProducts } from '../../getProductInfo-DoDiQlga.js';
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
declare function GET$4(request: NextRequest): Promise<NextResponse<any>>;

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

interface UpdateItemRequest {
    name?: string;
    nameSecondary?: string;
    description?: string;
    descriptionSecondary?: string;
    defaultPrice: number;
    menuIds?: number[];
    minimumOrderQuantity: number;
    maximumOrderQuantity: number;
    price?: number;
    barcode?: string;
    code?: string;
    isActive?: boolean;
    isFeatured?: boolean;
    isDeliverable?: boolean;
    [key: string]: any;
}
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

declare function PUT$2(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

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

declare function DELETE(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<Response>;

export { type CopyParentResponse, POST as CopyParentStorePOST, DELETE as DeleteItemDELETE, GET as GetItemByIdGET, GET$1 as GetItemsPagingGET, type GetItemsPagingParams, GET$2 as GetParentProductsGET, GET$4 as GetProductsGET, ItemsFilterParameters, Product, GET$3 as ProductInfoGET, ProductResponse, PUT$2 as PutItemActivatePUT, PUT$1 as PutItemDeactivatePUT, PUT as PutItemPUT, type UpdateItemRequest, type UpdateItemResponse, deleteItem, getItemById, getItemsPaging, getParentProducts, postCopyParentStore, putActivateItem, putDeactivateItem, putItem };
