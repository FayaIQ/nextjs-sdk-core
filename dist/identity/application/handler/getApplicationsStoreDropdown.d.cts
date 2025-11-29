import { ApplicationStoreDropdownItem } from '../getApplicationsStoreDropdown.cjs';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Handler for application stores dropdown
 */
declare function GET(request: NextRequest): Promise<NextResponse<ApplicationStoreDropdownItem[]> | NextResponse<{
    error: string;
}>>;

export { GET };
