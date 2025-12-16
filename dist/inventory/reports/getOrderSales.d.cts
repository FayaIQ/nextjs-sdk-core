import { QueryParams } from '../../core/fetcher.cjs';
import OrderSalesResponse from './types.cjs';

declare function getReportsOrderSales(query?: QueryParams): Promise<OrderSalesResponse>;

export { getReportsOrderSales };
