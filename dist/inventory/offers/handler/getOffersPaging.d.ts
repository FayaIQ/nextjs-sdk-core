import { NextRequest, NextResponse } from 'next/server';

declare function GET(request: NextRequest): Promise<NextResponse<any>>;

export { GET };
