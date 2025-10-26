import { S as StoreInfo, P as Product } from '../types-DPi3zGBH.cjs';
import { NextResponse, NextRequest } from 'next/server';

/**
 * Ready-to-use API route handler for store info
 * Users can simply re-export this in their app/api/storeInfo/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/handlers/storeInfo';
 */
declare function GET$2(): Promise<NextResponse<StoreInfo> | NextResponse<{
    error: string;
}>>;

/**
 * Ready-to-use API route handler for products
 * Users can simply re-export this in their app/api/getProducts/route.ts:
 *
 * @example
 * export { GET } from 'my-next-core/handlers/getProducts';
 */
declare function GET$1(request: NextRequest): Promise<NextResponse<Product> | NextResponse<{
    error: string;
}>>;

declare function GET(request: NextRequest, { params }: {
    params: {
        id: string;
    };
}): Promise<NextResponse<Product> | NextResponse<{
    error: string;
}>>;

declare function POST$1(req: Request): Promise<Response>;

declare function POST(): Promise<Response>;

export { GET$1 as GetProductsGET, POST$1 as LoginPOST, POST as LogoutPOST, GET as ProductInfoGET, GET$2 as StoreInfoGET };
