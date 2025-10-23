import { NextRequest, NextResponse } from 'next/server';

declare function GET(req: NextRequest): Promise<NextResponse<unknown>>;

export { GET };
