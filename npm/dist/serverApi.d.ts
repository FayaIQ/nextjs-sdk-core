type Primitive = string | number | boolean | null | undefined;
type RequestData = Record<string, Primitive | Primitive[] | Record<string, Primitive>>;
type QueryParams = Record<string, Primitive>;
export interface ServerApiOptions {
    headers?: Record<string, string>;
    data?: RequestData;
    query?: QueryParams;
}
export declare const serverApi: {
    get: <T>(endpoint: string, options?: ServerApiOptions) => Promise<T>;
    post: <T>(endpoint: string, data?: RequestData, options?: ServerApiOptions) => Promise<T>;
    put: <T>(endpoint: string, data?: RequestData, options?: ServerApiOptions) => Promise<T>;
    delete: <T>(endpoint: string, options?: ServerApiOptions) => Promise<T>;
};
export {};
