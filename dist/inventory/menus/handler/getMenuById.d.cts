import { Category } from '../../../types.cjs';
import { NextRequest, NextResponse } from 'next/server';

declare function GET(request: NextRequest, { params }: {
    params: Promise<{
        id: string;
    }>;
}): Promise<NextResponse<Category> | NextResponse<{
    error: string;
}>>;

export { GET };
