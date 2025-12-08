import { OrdersFilterParameters, OrdersApiResponse } from './order-models.cjs';

declare function getOrders({ filterParams, }: {
    filterParams: OrdersFilterParameters;
}): Promise<OrdersApiResponse>;

export { getOrders };
