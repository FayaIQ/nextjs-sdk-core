import { OrderAddress } from '../../inventory/orders/order-models.cjs';

declare function getAddressById(id: string | number): Promise<OrderAddress>;

export { getAddressById };
