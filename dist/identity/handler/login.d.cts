import { User } from '../login.cjs';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Next.js API handler for manual login.
 *
 * Example usage in your Next.js app:
 * ```ts
 * export { POST } from "my-next-core/identity/handler/login";
 * ```
 */
declare function POST(request: NextRequest): Promise<NextResponse<{
    success: boolean;
    message: string;
    employeeStoreId: number | null;
    roles: string[];
    user: User | null;
}> | NextResponse<{
    success: boolean;
    error: string;
}>>;

export { POST };
