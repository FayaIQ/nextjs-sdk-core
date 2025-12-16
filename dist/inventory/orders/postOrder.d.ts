import { PostOrderRequest, OrderDetail } from './order-models.js';

/**
 * Create a new order (v2)
 */
declare function postOrder(data: PostOrderRequest): Promise<OrderDetail>;

export { postOrder };
