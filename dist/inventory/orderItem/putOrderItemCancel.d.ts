/**
 * Cancel an order item
 *
 * @param {string|number} id - Order ID
 * @param {string|number} itemId - Order item ID
 *
 * @returns {Promise<any>} - Server response
 *
 * @throws {Error} - Failed to cancel order item
 */
declare function putOrderItemCancel(id: string | number, itemId: string | number): Promise<any>;

export { putOrderItemCancel };
