import { QueryParams } from '../../core/fetcher.js';

declare function getPaymentsReport(query?: QueryParams): Promise<any>;

export { getPaymentsReport };
