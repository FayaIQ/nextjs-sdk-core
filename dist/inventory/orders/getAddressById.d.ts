import { OrderAddress } from './order-models.js';

declare function getAddressById(id: string | number): Promise<OrderAddress>;

export { getAddressById };
