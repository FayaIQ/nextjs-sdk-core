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

export { type LoginRequest, type LoginResponse, type User, loginUser };
