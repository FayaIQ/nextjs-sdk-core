import { NextRequest, NextResponse } from 'next/server';

declare function POST(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
        forceUpdate: string;
    }>;
}): Promise<NextResponse<any>>;

export { POST };
