import { NextRequest, NextResponse } from 'next/server';

declare function PUT(request: NextRequest): Promise<NextResponse<any>>;

export { PUT };
