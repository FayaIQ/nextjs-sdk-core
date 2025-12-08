import { OrderAddress } from './order-models.cjs';

declare function getAddressById(id: string | number): Promise<OrderAddress>;

export { getAddressById };
