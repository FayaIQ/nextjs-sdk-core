import { NextRequest, NextResponse } from 'next/server';

declare function PUT(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
        itemId: string;
    }>;
}): Promise<NextResponse<any>>;

export { PUT };
