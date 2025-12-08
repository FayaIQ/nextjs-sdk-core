import { OrdersFilterParameters, OrdersApiResponse } from './order-models.js';

declare function getOrders({ filterParams, }: {
    filterParams: OrdersFilterParameters;
}): Promise<OrdersApiResponse>;

export { getOrders };
