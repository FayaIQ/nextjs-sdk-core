export type Primitive = string | number | boolean | null | undefined;
export type RequestData = Record<string, Primitive | Primitive[] | Record<string, Primitive>>;
export type QueryParams = Record<string, Primitive>;
export interface ApiRequestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    headers?: Record<string, string>;
    body?: object;
    data?: RequestData;
    query?: QueryParams;
    token?: string | null;
}
export declare function apiFetch<T>(url: string, options?: ApiRequestOptions): Promise<T>;
