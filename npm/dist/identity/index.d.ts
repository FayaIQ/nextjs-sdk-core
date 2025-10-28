import { NextRequest, NextResponse } from 'next/server';

/**
 * Represents login credentials for Storeak Identity Service
 */
interface LoginRequest {
    username: string;
    password: string;
}
/**
 * User information from login response
 */
interface User {
    id: string;
    username: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    storeIDRegisteredWith: number;
    gender: number;
    birthdate: string;
    [key: string]: any;
}
/**
 * Login response from the Storeak Identity Service
 */
interface LoginResponse {
    access_token: string;
    token_type: string;
    expires: number;
    employeeStoreId?: number;
    roles?: string[];
    user?: User;
    [key: string]: any;
}
/**
 * Logs in a user and retrieves an access token.
 * Automatically saves the token, roles, and store ID to cookies.
 * Only requires username and password - other credentials come from env config.
 */
declare function loginUser(credentials: LoginRequest): Promise<LoginResponse>;

declare function logoutUser(): Promise<{
    success: boolean;
}>;

/**
 * Next.js API handler for manual login.
 *
 * Example usage in your Next.js app:
 * ```ts
 * export { POST } from "my-next-core/identity/handler/login";
 * ```
 */
declare function POST$1(request: NextRequest): Promise<NextResponse<{
    success: boolean;
    message: string;
    employeeStoreId: number | null;
    roles: string[];
    user: User | null;
}> | NextResponse<{
    success: boolean;
    error: string;
}>>;

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

export { POST$1 as LoginPOST, POST as LogoutPOST, loginUser, logoutUser };
