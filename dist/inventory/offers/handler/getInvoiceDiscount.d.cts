import { NextRequest, NextResponse } from 'next/server';

declare function GET(request: NextRequest, { params }: {
    params: Promise<{
        coupon: string;
    }>;
}): Promise<NextResponse<any>>;

export { GET };
