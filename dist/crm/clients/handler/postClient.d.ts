import { NextRequest, NextResponse } from 'next/server';

declare function POST(request: NextRequest): Promise<NextResponse<any>>;

export { POST };
