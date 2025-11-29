import { QueryParams } from '../../core/fetcher.js';
import OrderSalesResponse from './types.js';

declare function getReportsOrderSales(query?: QueryParams): Promise<OrderSalesResponse>;

export { getReportsOrderSales };
