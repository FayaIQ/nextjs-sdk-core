import { OffersPagingResponse } from './types.cjs';

/**
 * Fetch paginated offers
 */
declare function getOffersPaging(query?: Record<string, any>): Promise<OffersPagingResponse>;

export { getOffersPaging };
