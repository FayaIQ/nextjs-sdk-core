import { QueryParams } from '../../core/fetcher.js';

declare function getPayments(query?: QueryParams): Promise<any>;

export { getPayments };
