import { NextResponse } from 'next/server';

/**
 * Next.js API handler for logout.
 * Simply deletes authentication cookies - no API call needed.
 *
 * Example usage in your Next.js app:
 * ```ts
 * export { POST } from "my-next-core/identity/handler/logout";
 * ```
 */
declare function POST(): Promise<NextResponse<{
    success: boolean;
    message: string;
}> | NextResponse<{
    success: boolean;
    error: string;
}>>;

export { POST };
