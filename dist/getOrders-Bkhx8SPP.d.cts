import { O as OrdersFilterParameters, a as OrdersApiResponse } from './order-models-nbgqiu1i.cjs';

declare function getOrders({ filterParams, }: {
    filterParams: OrdersFilterParameters;
}): Promise<OrdersApiResponse>;

export { getOrders as g };
