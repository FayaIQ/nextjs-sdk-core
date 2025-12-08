import { NextResponse } from 'next/server';
import { StoreInfo } from '../types.js';
import '../../../types.js';

declare function GET(): Promise<NextResponse<StoreInfo> | NextResponse<{
    error: string;
}>>;

export { GET };
