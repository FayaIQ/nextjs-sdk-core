import { OrderItem } from '../orders/order-models.js';

declare function getOrderItem(id: string | number, itemId: string | number): Promise<OrderItem>;

export { getOrderItem };
