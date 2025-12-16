import { NextResponse } from 'next/server';
import { StoreInfo } from '../types.cjs';
import '../../../types.cjs';

declare function GET(): Promise<NextResponse<StoreInfo> | NextResponse<{
    error: string;
}>>;

export { GET };
