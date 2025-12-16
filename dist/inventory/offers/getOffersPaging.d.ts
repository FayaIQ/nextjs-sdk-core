import { OffersPagingResponse } from './types.js';

/**
 * Fetch paginated offers
 */
declare function getOffersPaging(query?: Record<string, any>): Promise<OffersPagingResponse>;

export { getOffersPaging };
