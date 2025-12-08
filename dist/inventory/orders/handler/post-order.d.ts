import { OrderDetail } from '../order-models.js';
import { NextRequest, NextResponse } from 'next/server';

declare function POST(request: NextRequest): Promise<NextResponse<OrderDetail> | NextResponse<{
    error: string;
}>>;

export { POST };
