import { PutUserInfoResponse } from '../putUserInfo.cjs';
import { NextRequest, NextResponse } from 'next/server';

/**
 * Ready-to-use API route handler for updating user information
 * Users can simply re-export this in their app/api/users/route.ts:
 *
 * @example
 * export { PUT } from 'erp-core/identity/users';
 */
declare function PUT(request: NextRequest): Promise<NextResponse<{
    error: string;
}> | NextResponse<PutUserInfoResponse>>;

export { PUT };
