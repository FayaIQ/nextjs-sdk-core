import { ItemsFilterParameters } from './filter-models.js';
import { ProductResponse } from './types.js';

type GetItemsPagingParams = ItemsFilterParameters;
/**
 * Get items with pagination (v2 API)
 * @param filters - Filter parameters for items
 * @returns Promise with ProductResponse
 */
declare function getItemsPaging(filters?: GetItemsPagingParams): Promise<ProductResponse>;

export { type GetItemsPagingParams, getItemsPaging };
