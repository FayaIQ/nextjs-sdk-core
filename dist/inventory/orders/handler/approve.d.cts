import { ApproveOrderResponse } from '../putOrderApprove.cjs';
import { NextRequest, NextResponse } from 'next/server';

declare function PUT(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<{
    error: string;
}> | NextResponse<ApproveOrderResponse>>;

export { PUT };
