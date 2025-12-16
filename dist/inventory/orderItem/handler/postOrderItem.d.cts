import { NextRequest, NextResponse } from 'next/server';

declare function POST(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<any>>;

export { POST };
