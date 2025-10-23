import { NextRequest, NextResponse } from 'next/server';

declare function GET(req: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<unknown>>;

export { GET };
