import { OrderDetail } from '../order-models.cjs';
import { NextRequest, NextResponse } from 'next/server';

declare function POST(request: NextRequest): Promise<NextResponse<OrderDetail> | NextResponse<{
    error: string;
}>>;

export { POST };
