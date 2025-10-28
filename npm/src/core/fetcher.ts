/**
 * Type definitions for API requests
 */
export type Primitive = string | number | boolean | null | undefined;

export type RequestData = Record<
  string,
  Primitive | Primitive[] | Record<string, Primitive>
>;

export type QueryParams = Record<string, Primitive>;

export interface ApiRequestOptions {
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
export async function apiFetch<T>(
  url: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { method = "GET", headers = {}, data, query, token } = options;

  let endpoint = url;

  // Append query parameters if provided
  if (query) {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
    const queryString = params.toString();
    if (queryString) {
      endpoint += `?${queryString}`;
    }
  }

  // Prepare headers
  const requestHeaders: Record<string, string> = { ...headers };
  
  if (token) {
    requestHeaders["Authorization"] = `Bearer ${token}`;
  }
  
  if (data && !(data instanceof FormData)) {
    requestHeaders["Content-Type"] = "application/json";
  }

  // Prepare request body
  let body: string | FormData | undefined;
  if (data) {
    body = data instanceof FormData ? data : JSON.stringify(data);
  }

  // Make the request
  const response = await fetch(endpoint, {
    method,
    headers: requestHeaders,
    body,
  });

  // Handle response errors
  if (!response.ok) {
    let errorMessage = `Request failed with status ${response.status}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData?.message || errorMessage;
    } catch {
      // If error response is not JSON, use default message
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

/**
 * Reusable API helper functions with and without authentication
 */

// Import getToken for automatic token fetching
import getToken from "../token";

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
export async function getWithAuth<T>(
  url: string,
  query?: QueryParams,
  headers?: Record<string, string>
): Promise<T> {
  const token = await getToken();
  return apiFetch<T>(url, {
    method: "GET",
    token,
    query,
    headers,
  });
}

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
export async function getWithoutAuth<T>(
  url: string,
  query?: QueryParams,
  headers?: Record<string, string>
): Promise<T> {
  return apiFetch<T>(url, {
    method: "GET",
    query,
    headers,
  });
}

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
export async function postWithAuth<T>(
  url: string,
  data?: RequestData,
  headers?: Record<string, string>
): Promise<T> {
  const token = await getToken();
  return apiFetch<T>(url, {
    method: "POST",
    token,
    data,
    headers,
  });
}

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
export async function postWithoutAuth<T>(
  url: string,
  data?: RequestData,
  headers: Record<string, string> = {}
): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  if (!response.ok) {
    throw new Error(`POST request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

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
export async function putWithAuth<T>(
  url: string,
  data?: RequestData,
  headers?: Record<string, string>
): Promise<T> {
  const token = await getToken();
  return apiFetch<T>(url, {
    method: "PUT",
    token,
    data,
    headers,
  });
}

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
export async function putWithoutAuth<T>(
  url: string,
  data?: RequestData,
  headers?: Record<string, string>
): Promise<T> {
  return apiFetch<T>(url, {
    method: "PUT",
    data,
    headers,
  });
}

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
export async function deleteWithAuth<T>(
  url: string,
  headers?: Record<string, string>
): Promise<T> {
  const token = await getToken();
  return apiFetch<T>(url, {
    method: "DELETE",
    token,
    headers,
  });
}

/**
 * DELETE request without authentication
 * @param url - The API endpoint URL
 * @param headers - Optional additional headers
 * @returns Promise with typed response data
 * 
 * @example
 * await deleteWithoutAuth<void>('/api/cache/clear');
 */
export async function deleteWithoutAuth<T>(
  url: string,
  headers?: Record<string, string>
): Promise<T> {
  return apiFetch<T>(url, {
    method: "DELETE",
    headers,
  });
}

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
export async function patchWithAuth<T>(
  url: string,
  data?: RequestData,
  headers?: Record<string, string>
): Promise<T> {
  const token = await getToken();
  return apiFetch<T>(url, {
    method: "PATCH",
    token,
    data,
    headers,
  });
}

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
export async function patchWithoutAuth<T>(
  url: string,
  data?: RequestData,
  headers?: Record<string, string>
): Promise<T> {
  return apiFetch<T>(url, {
    method: "PATCH",
    data,
    headers,
  });
}

