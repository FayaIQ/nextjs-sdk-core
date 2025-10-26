import { P as Product } from '../types-DPi3zGBH.cjs';
import { NextRequest, NextResponse } from 'next/server';

declare function GET(request: NextRequest, { params }: {
    params: {
        id: string;
    };
}): Promise<NextResponse<Product> | NextResponse<{
    error: string;
}>>;

export { GET };
