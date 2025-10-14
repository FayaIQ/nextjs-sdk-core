import { apiFetch, ApiRequestOptions } from "./fetcher";
import getToken from "./token";

 type Primitive = string | number | boolean | null | undefined;
 type RequestData = Record<string, Primitive | Primitive[] | Record<string, Primitive>>;
 type QueryParams = Record<string, Primitive>;

export interface ServerApiOptions {
  headers?: Record<string, string>;
  data?: RequestData;
  query?: QueryParams;
}

async function request<T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  options: ServerApiOptions = {}
): Promise<T> {
  const { data, query, headers: customHeaders = {} } = options;

  const token = await getToken();

  const fetchOptions: ApiRequestOptions = { method, headers: customHeaders, data, query, token };
  return apiFetch<T>(endpoint, fetchOptions);
}

// Exported methods
export const serverApi = {
  get: <T>(endpoint: string, options?: ServerApiOptions) => request<T>(endpoint, "GET", options),
  post: <T>(endpoint: string, data?: RequestData, options?: ServerApiOptions) =>
    request<T>(endpoint, "POST", { ...options, data }),
    put: <T>(endpoint: string, data?: RequestData, options?: ServerApiOptions) =>
    request<T>(endpoint, "PUT", { ...options, data }),
  delete: <T>(endpoint: string, options?: ServerApiOptions) => request<T>(endpoint, "DELETE", options),
};
