import { G as GetBrandsResponse } from '../../getBrands-CtwNxho6.cjs';
export { B as Brand, g as getBrands } from '../../getBrands-CtwNxho6.cjs';
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

declare const getBrands_GET: typeof GET;
declare namespace getBrands {
  export { getBrands_GET as GET };
}

export { GetBrandsResponse, getBrands as handlers };
