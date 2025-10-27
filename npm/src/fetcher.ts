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

export async function apiFetch<T>(
  url: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { method = "GET", headers = {}, data, query, token } = options;
  let endpoint = url;

  if (query) {
    const params = new URLSearchParams();
    Object.entries(query).forEach(([k, v]) => {
      if (v !== undefined && v !== null) params.append(k, String(v));
    });
    endpoint += `?${params.toString()}`;
  }

  const allHeaders = { ...headers };
  allHeaders["Authorization"] = `Bearer ${token}`;
  if (data && !(data instanceof FormData))
    allHeaders["Content-Type"] = "application/json";

  const res = await fetch(endpoint, {
    method,
    headers: allHeaders,
    body: data && !(data instanceof FormData) ? JSON.stringify(data) : data,
  });

  // ✅ Read body ONCE
  const raw = await res.json();

  return raw;
}
