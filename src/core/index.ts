export {
  getWithAuth,
  getWithoutAuth,
  postWithAuth,
  postWithoutAuth,
  putWithAuth,
  putWithoutAuth,
  deleteWithAuth,
  deleteWithoutAuth,
  patchWithAuth,
  patchWithoutAuth,
} from "./fetcher";

export type { ApiRequestOptions, RequestData, QueryParams, Primitive } from "./fetcher";

export { getAuthConfig, getCookieTTLConfig } from "./config";
export type { AuthConfig, CookieTTLConfig } from "./config";
