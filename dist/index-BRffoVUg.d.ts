/**
 * Type definitions for API requests
 */
type Primitive = string | number | boolean | null | undefined;
type RequestData = Record<string, any>;
type QueryParams = Record<string, Primitive>;
interface ApiRequestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    headers?: Record<string, string>;
    body?: object;
    data?: RequestData;
    query?: QueryParams;
    token?: string | null;
}
/**
 * Generic API fetch wrapper with authentication and error handling
 * @param url - The API endpoint URL
 * @param options - Request configuration options
 * @returns Promise with typed response data
 */
declare function apiFetch<T>(url: string, options?: ApiRequestOptions): Promise<T>;
/**
 * GET request with automatic authentication
 * Automatically fetches the auth token - no need to pass it manually
 *
 * @param url - The API endpoint URL
 * @param query - Optional query parameters
 * @param headers - Optional additional headers
 * @returns Promise with typed response data
 *
 * @example
 * const products = await getWithAuth<Product[]>('https://api.example.com/products', { page: 1 });
 */
declare function getWithAuth<T>(url: string, query?: QueryParams, headers?: Record<string, string>): Promise<T>;
/**
 * GET request without authentication
 * @param url - The API endpoint URL
 * @param query - Optional query parameters
 * @param headers - Optional additional headers
 * @returns Promise with typed response data
 *
 * @example
 * const data = await getWithoutAuth<PublicData>('/api/public/info', { lang: 'en' });
 */
declare function getWithoutAuth<T>(url: string, query?: QueryParams, headers?: Record<string, string>): Promise<T>;
/**
 * POST request with automatic authentication
 * Automatically fetches the auth token - no need to pass it manually
 *
 * @param url - The API endpoint URL
 * @param data - Request body data
 * @param headers - Optional additional headers
 * @returns Promise with typed response data
 *
 * @example
 * const order = await postWithAuth<Order>('https://api.example.com/orders', { items: [...] });
 */
declare function postWithAuth<T>(url: string, data?: RequestData, headers?: Record<string, string>): Promise<T>;
/**
 * POST request without authentication
 * @param url - The API endpoint URL
 * @param data - Request body data
 * @param headers - Optional additional headers
 * @returns Promise with typed response data
 *
 * @example
 * const result = await postWithoutAuth<LoginResponse>('/api/login', { username, password });
 */
declare function postWithoutAuth<T>(url: string, data?: RequestData, headers?: Record<string, string>): Promise<T>;
/**
 * PUT request with automatic authentication
 * Automatically fetches the auth token - no need to pass it manually
 *
 * @param url - The API endpoint URL
 * @param data - Request body data
 * @param headers - Optional additional headers
 * @returns Promise with typed response data
 *
 * @example
 * const updated = await putWithAuth<Product>('https://api.example.com/products/123', { name: 'New Name' });
 */
declare function putWithAuth<T>(url: string, data?: RequestData, headers?: Record<string, string>): Promise<T>;
/**
 * PUT request without authentication
 * @param url - The API endpoint URL
 * @param data - Request body data
 * @param headers - Optional additional headers
 * @returns Promise with typed response data
 *
 * @example
 * const updated = await putWithoutAuth<Settings>('/api/public/settings', { theme: 'dark' });
 */
declare function putWithoutAuth<T>(url: string, data?: RequestData, headers?: Record<string, string>): Promise<T>;
/**
 * DELETE request with automatic authentication
 * Automatically fetches the auth token - no need to pass it manually
 *
 * @param url - The API endpoint URL
 * @param headers - Optional additional headers
 * @returns Promise with typed response data
 *
 * @example
 * await deleteWithAuth<void>('https://api.example.com/products/123');
 */
declare function deleteWithAuth<T>(url: string, headers?: Record<string, string>): Promise<T>;
/**
 * DELETE request without authentication
 * @param url - The API endpoint URL
 * @param headers - Optional additional headers
 * @returns Promise with typed response data
 *
 * @example
 * await deleteWithoutAuth<void>('/api/cache/clear');
 */
declare function deleteWithoutAuth<T>(url: string, headers?: Record<string, string>): Promise<T>;
/**
 * PATCH request with automatic authentication
 * Automatically fetches the auth token - no need to pass it manually
 *
 * @param url - The API endpoint URL
 * @param data - Request body data (partial update)
 * @param headers - Optional additional headers
 * @returns Promise with typed response data
 *
 * @example
 * const patched = await patchWithAuth<Product>('https://api.example.com/products/123', { price: 99.99 });
 */
declare function patchWithAuth<T>(url: string, data?: RequestData, headers?: Record<string, string>): Promise<T>;
/**
 * PATCH request without authentication
 * @param url - The API endpoint URL
 * @param data - Request body data (partial update)
 * @param headers - Optional additional headers
 * @returns Promise with typed response data
 *
 * @example
 * const patched = await patchWithoutAuth<Settings>('/api/public/preferences', { notifications: false });
 */
declare function patchWithoutAuth<T>(url: string, data?: RequestData, headers?: Record<string, string>): Promise<T>;

export { type ApiRequestOptions as A, type Primitive as P, type QueryParams as Q, type RequestData as R, apiFetch as a, getWithoutAuth as b, postWithoutAuth as c, putWithAuth as d, putWithoutAuth as e, deleteWithAuth as f, getWithAuth as g, deleteWithoutAuth as h, patchWithAuth as i, patchWithoutAuth as j, postWithAuth as p };
