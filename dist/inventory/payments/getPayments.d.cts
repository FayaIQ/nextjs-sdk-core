import { QueryParams } from '../../core/fetcher.cjs';

declare function getPayments(query?: QueryParams): Promise<any>;

export { getPayments };
