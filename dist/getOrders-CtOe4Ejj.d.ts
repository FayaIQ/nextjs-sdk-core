import { O as OrdersFilterParameters, a as OrdersApiResponse } from './order-models-Dqv0Jc_o.js';

declare function getOrders({ filterParams, }: {
    filterParams: OrdersFilterParameters;
}): Promise<OrdersApiResponse>;

export { getOrders as g };
