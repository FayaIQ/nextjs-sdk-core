import { OrderAddress } from '../order-models.cjs';
import { NextRequest, NextResponse } from 'next/server';

declare function GET(request: NextRequest): Promise<NextResponse<OrderAddress> | NextResponse<{
    error: string;
}>>;

export { GET };
