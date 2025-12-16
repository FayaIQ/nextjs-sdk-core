import { NextRequest, NextResponse } from 'next/server';

declare function GET(request: NextRequest, { params }: {
    params: Promise<{
        storeId: string;
    }>;
}): Promise<NextResponse<any>>;

export { GET };
