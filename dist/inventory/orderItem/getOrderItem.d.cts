import { OrderItem } from '../orders/order-models.cjs';

declare function getOrderItem(id: string | number, itemId: string | number): Promise<OrderItem>;

export { getOrderItem };
