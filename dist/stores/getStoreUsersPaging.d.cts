import { StoreUsersPagingResponse } from './store-users-models.cjs';

/**
 * Get store users with paging and filters.
 * Pass an optional params object to set query parameters (e.g., { Username: 'abc', CurrentPage: 1 })
 */
declare function getStoreUsersPaging(params?: Record<string, any>): Promise<StoreUsersPagingResponse>;

export { getStoreUsersPaging };
