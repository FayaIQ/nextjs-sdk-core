import { OrderAddress } from '../../inventory/orders/order-models.js';

declare function getAddressById(id: string | number): Promise<OrderAddress>;

export { getAddressById };
