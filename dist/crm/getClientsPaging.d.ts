import { ClientsPagingResponse } from './client-models.js';

/**
 * Fetch paginated clients. Accepts an optional query object which will be
 * serialized to URL parameters.
 */
declare function getClientsPaging(query?: Record<string, any>): Promise<ClientsPagingResponse>;

export { getClientsPaging };
