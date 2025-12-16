import { CustomersDropdownEnvelope } from '../types.js';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Next.js API handler for customers dropdown
 * Accepts query params: username, FullName
 */
declare function GET(request: NextRequest): Promise<NextResponse<{
    success: boolean;
    data: CustomersDropdownEnvelope;
}> | NextResponse<{
    success: boolean;
    error: string;
}>>;

export { GET };
