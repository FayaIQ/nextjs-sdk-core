import { NextRequest, NextResponse } from 'next/server';

/**
 * User address information
 */
interface UserAddress {
    GPS?: string;
    DistrictId: number | string;
    Note?: string;
}
/**
 * Request payload for updating user information
 */
interface PutUserInfoRequest {
    FullName: string;
    Email: string;
    Phone: number | string;
    Gender: number;
    Address: UserAddress;
    Birthdate?: string;
}
/**
 * Response from user info update
 */
interface PutUserInfoResponse {
    success?: boolean;
    message?: string;
    [key: string]: any;
}
/**
 * Helper function to convert birthdate string to ISO format
 * Accepts "YYYY-MM-DD" and other valid date strings; returns undefined if invalid/empty.
 */
declare const toIsoBirthdate: (value: string) => string | undefined;
/**
 * Update user information (server-side only)
 *
 * @param userInfo - The user data to update
 * @returns Promise with the updated user response
 *
 * @example Server Component:
 * ```typescript
 * import { putUserInfo } from 'erp-core/identity/users';
 *
 * const userData = {
 *   FullName: "John Doe",
 *   Email: "john@example.com",
 *   Phone: "1234567890",
 *   Gender: 1,
 *   Address: {
 *     GPS: "",
 *     DistrictId: 353,
 *     Note: "Apartment 4B"
 *   },
 *   Birthdate: "1990-01-15T00:00:00.000Z"
 * };
 *
 * const result = await putUserInfo(userData);
 * ```
 *
 * @example Client Component (using API route):
 * ```typescript
 * const response = await fetch('/api/users', {
 *   method: 'PUT',
 *   headers: { 'Content-Type': 'application/json' },
 *   body: JSON.stringify(userData)
 * });
 * const result = await response.json();
 * ```
 */
declare function putUserInfo(userInfo: PutUserInfoRequest): Promise<PutUserInfoResponse>;

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

export { PUT as PutUserInfoPUT, type PutUserInfoRequest, type PutUserInfoResponse, type UserAddress, putUserInfo, toIsoBirthdate };
