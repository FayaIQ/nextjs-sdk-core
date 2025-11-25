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

interface Customer {
    id: string;
    username: string;
    fullName: string;
    oldUsername: string | null;
    email: string | null;
    emailConfirmed: boolean;
    phoneNumber: string | null;
    phoneNumberConfirmed: boolean;
    gender: number;
    birthdate: string | null;
    profileThumpPicture: string | null;
    [key: string]: any;
}
interface CustomerResponse {
    currentPage: number;
    pageCount: number;
    pageSize: number;
    rowCount: number;
    sortField: string | null;
    currentSortField: string | null;
    currentSortOrder: string | null;
    nextSortOrder: string | null;
    results: Customer[];
}
interface CustomersDropdownEnvelope {
    success: boolean;
    data: CustomerResponse;
}

/**
 * Fetch customers dropdown from identity service
 * Accepts optional query params: username and FullName
 * Works both server and client side (client uses /api/customers-dropdown)
 */
declare function getCustomersDropdown(username?: string, FullName?: string): Promise<CustomersDropdownEnvelope>;

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

export { type Customer, type CustomerResponse, type CustomersDropdownEnvelope, GET as CustomersDropdownGET, POST$1 as LoginPOST, POST as LogoutPOST, getCustomersDropdown, loginUser, logoutUser };
