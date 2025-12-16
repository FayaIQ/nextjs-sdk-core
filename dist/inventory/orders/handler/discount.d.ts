import { NextRequest, NextResponse } from 'next/server';

/**
 * PUT /api/orders/[id]/discount
 */
declare function PUT(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

export { PUT };
