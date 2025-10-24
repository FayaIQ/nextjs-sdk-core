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

