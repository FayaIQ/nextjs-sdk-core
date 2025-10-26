import { NextRequest, NextResponse } from 'next/server';
import { P as Product } from '../../../types-CY01mA9d.js';

declare function GET(req: NextRequest): Promise<NextResponse<Product> | NextResponse<{
    error: string;
}>>;

export { GET };
