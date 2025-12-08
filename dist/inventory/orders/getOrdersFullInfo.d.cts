import { OrderDetail } from './order-models.cjs';

type OrderIdsInput = number[] | {
    orderIds?: number[];
    body?: number[];
};
/**
 * Fetch full info for orders. Accepts either an array of ids or an object
 * containing `orderIds` (or legacy `body`) and normalizes to the shape the
 * backend expects: { orderIds: [...] }.
 */
declare function getOrdersFullInfo(input: OrderIdsInput): Promise<OrderDetail[]>;

export { getOrdersFullInfo };
