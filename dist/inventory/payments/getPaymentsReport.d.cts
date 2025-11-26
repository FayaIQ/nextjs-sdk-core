import { QueryParams } from '../../core/fetcher.cjs';

declare function getPaymentsReport(query?: QueryParams): Promise<any>;

export { getPaymentsReport };
