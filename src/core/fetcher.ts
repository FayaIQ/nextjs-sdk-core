/**
 * Type definitions for API requests
 */
export type Primitive = string | number | boolean | null | undefined;

export type RequestData = Record<string, any>;

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
 * Error thrown by apiFetch when backend returns non-2xx.
 * Contains the HTTP status and the parsed response body (if any).
 */
export class ApiError extends Error {
  status: number;
  body: any;
  constructor(status: number, body: any, message?: string) {
    super(message || `Request failed with status ${status}`);
    this.status = status;
    this.body = body;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

/**
 * Recursively search for a human-friendly message inside an error-like object.
 * Looks for common fields: message, code, error, body, data, response.
 */
function findMessageInError(
  obj: any,
  depth = 0,
  seen = new WeakSet()
): string | null {
  if (obj == null || depth > 6) return null;
  if (typeof obj === "string") {
    // If it's a JSON string, try to parse and search inside
    const s = obj.trim();
    if (s.startsWith("{") || s.startsWith("[")) {
      try {
        const parsed = JSON.parse(s);
        return findMessageInError(parsed, depth + 1, seen) || obj;
      } catch {
        return obj;
      }
    }
    return obj;
  }

  if (typeof obj !== "object") return null;
  if (seen.has(obj)) return null;
  seen.add(obj);

  // Direct fields
  if (typeof obj.message === "string" && obj.message) return obj.message;
  if (typeof obj.code === "string" && obj.code) return obj.code;
  if (typeof obj.error === "string" && obj.error) return obj.error;

  // Recurse into known containers
  const keysToCheck = [
    "message",
    "code",
    "error",
    "body",
    "data",
    "response",
    "errors",
  ];
  for (const k of keysToCheck) {
    if (k in obj) {
      const v = (obj as any)[k];
      const found = findMessageInError(v, depth + 1, seen);
      if (found) return found;
    }
  }

  // Fallback: inspect object properties shallowly
  for (const k of Object.keys(obj)) {
    try {
      const found = findMessageInError((obj as any)[k], depth + 1, seen);
      if (found) return found;
    } catch {
      // ignore
    }
  }

  return null;
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
  // Handle response errors - parse body and throw ApiError so callers must handle non-2xx
  if (!response.ok) {
    try {
      const text = await response.text();
      if (text && text.trim()) {
        // Try to parse the response. Some backends wrap an object as a JSON string
        // (e.g. '"{ ... }"'), so we attempt to parse twice when needed.
        let errorData: any;
        try {
          errorData = JSON.parse(text);
        } catch {
          errorData = text;
        }

        // If parsing produced a string that itself looks like JSON, try to parse it again
        if (typeof errorData === "string") {
          const trimmed = errorData.trim();
          if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
            try {
              errorData = JSON.parse(errorData);
            } catch {
              // keep as string if second-parse fails
            }
          }
        }

        // Prefer a clear message coming from the backend body (search nested fields)
        const derivedMessage =
          findMessageInError(errorData) ||
          (typeof errorData === "string" ? errorData : response.statusText);

        throw new ApiError(response.status, errorData, derivedMessage);
      }
      // Empty error body
      throw new ApiError(
        response.status,
        null,
        `Request failed with status ${response.status} ${response.statusText}`
      );
    } catch (err) {
      if (err instanceof ApiError) throw err;
      // Reading response failed - throw generic ApiError
      throw new ApiError(
        response.status,
        null,
        `Request failed with status ${response.status} ${response.statusText}`
      );
    }
  }

  // Handle empty response body
  const contentType = response.headers.get("content-type");
  const contentLength = response.headers.get("content-length");

  // If content-length is 0 or no content-type, return empty object
  if (contentLength === "0" || (!contentType && response.status === 200)) {
    return {} as T;
  }

  // Check if response has content
  const text = await response.text();
  if (!text || text.trim() === "") {
    return {} as T;
  }

  try {
    const parsed = JSON.parse(text);
    // Return response as-is without any normalization
    return parsed as T;
  } catch (err) {
    throw new Error(
      `Failed to parse response as JSON: ${text.substring(0, 100)}`
    );
  }
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
  let token: string | null = null;
  try {
    token = await getToken();
  } catch (err: any) {
    // Normalize token-related unauthorized errors to ApiError(401)
    if (
      err &&
      (err.status === 401 || /unauthor/i.test(String(err.message || err)))
    ) {
      throw new ApiError(401, null, "Unauthorized");
    }
    throw err;
  }
  if (!token) {
    // No token found — treat as unauthorized
    throw new ApiError(401, null, "Unauthorized");
  }
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
  let token: string | null = null;
  try {
    token = await getToken();
  } catch (err: any) {
    if (
      err &&
      (err.status === 401 || /unauthor/i.test(String(err.message || err)))
    ) {
      throw new ApiError(401, null, "Unauthorized");
    }
    throw err;
  }
  if (!token) {
    throw new ApiError(401, null, "Unauthorized");
  }
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

  // Handle error responses - return full error body instead of throwing
  // Handle error responses - parse body and throw ApiError so callers must handle non-2xx
  if (!response.ok) {
    try {
      const text = await response.text();
      if (text && text.trim()) {
        let errorData: any;
        try {
          errorData = JSON.parse(text);
        } catch {
          errorData = text;
        }

        if (typeof errorData === "string") {
          const trimmed = errorData.trim();
          if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
            try {
              errorData = JSON.parse(errorData);
            } catch {
              // keep as string if second-parse fails
            }
          }
        }

        const derivedMessage =
          findMessageInError(errorData) ||
          (typeof errorData === "string" ? errorData : response.statusText);

        throw new ApiError(response.status, errorData, derivedMessage);
      }
      // Empty error body
      throw new ApiError(
        response.status,
        null,
        `POST request failed: ${response.status} ${response.statusText}`
      );
    } catch (err) {
      if (err instanceof ApiError) throw err;
      // Reading response failed - throw generic ApiError
      throw new ApiError(
        response.status,
        null,
        `POST request failed: ${response.status} ${response.statusText}`
      );
    }
  }

  // Handle empty response body
  const contentLength = response.headers.get("content-length");
  if (contentLength === "0") {
    return {} as T;
  }

  const text = await response.text();
  if (!text || text.trim() === "") {
    return {} as T;
  }

  try {
    return JSON.parse(text) as T;
  } catch (err) {
    throw new Error(
      `Failed to parse response as JSON: ${text.substring(0, 100)}`
    );
  }
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
  let token: string | null = null;
  try {
    token = await getToken();
  } catch (err: any) {
    if (
      err &&
      (err.status === 401 || /unauthor/i.test(String(err.message || err)))
    ) {
      throw new ApiError(401, null, "Unauthorized");
    }
    throw err;
  }
  if (!token) {
    throw new ApiError(401, null, "Unauthorized");
  }
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
  let token: string | null = null;
  try {
    token = await getToken();
  } catch (err: any) {
    if (
      err &&
      (err.status === 401 || /unauthor/i.test(String(err.message || err)))
    ) {
      throw new ApiError(401, null, "Unauthorized");
    }
    throw err;
  }
  if (!token) {
    throw new ApiError(401, null, "Unauthorized");
  }
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
  let token: string | null = null;
  try {
    token = await getToken();
  } catch (err: any) {
    if (
      err &&
      (err.status === 401 || /unauthor/i.test(String(err.message || err)))
    ) {
      throw new ApiError(401, null, "Unauthorized");
    }
    throw err;
  }
  if (!token) {
    throw new ApiError(401, null, "Unauthorized");
  }
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
