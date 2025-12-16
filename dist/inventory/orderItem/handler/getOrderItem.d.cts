import { OrderItem } from '../../orders/order-models.cjs';
import { NextRequest, NextResponse } from 'next/server';

declare function GET(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
        itemId: string;
    }>;
}): Promise<NextResponse<OrderItem> | NextResponse<{
    error: string;
}>>;

export { GET };
