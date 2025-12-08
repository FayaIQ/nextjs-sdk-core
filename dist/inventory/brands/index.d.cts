import { G as GetBrandsResponse } from '../../getBrands-CWOuMjIS.cjs';
export { B as Brand, g as getBrands } from '../../getBrands-CWOuMjIS.cjs';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Ready-to-use API route handler for brands
 * Users can simply re-export this in their app/api/brands/route.ts:
 *
 * @example
 * export { GET } from 'erp-core/inventory/brands/handler';
 */
declare function GET(request: NextRequest): Promise<NextResponse<GetBrandsResponse> | NextResponse<{
    error: string;
}>>;

export { GET as GetBrandsGET, GetBrandsResponse };
