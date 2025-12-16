type Primitive = string | number | boolean | null | undefined;
type RequestData = Record<string, Primitive | Primitive[] | Record<string, Primitive>>;
type QueryParams = Record<string, Primitive>;
interface ApiRequestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    headers?: Record<string, string>;
    body?: object;
    data?: RequestData;
    query?: QueryParams;
    token?: string | null;
}
declare function apiFetch<T>(url: string, options?: ApiRequestOptions): Promise<T>;

export { type ApiRequestOptions, type Primitive, type QueryParams, type RequestData, apiFetch };
