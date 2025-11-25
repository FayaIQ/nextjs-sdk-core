import { O as OrdersFilterParameters, a as OrdersApiResponse } from './order-models-DdD4MxCq.cjs';

declare function getOrders({ filterParams, }: {
    filterParams: OrdersFilterParameters;
}): Promise<OrdersApiResponse>;

export { getOrders as g };
