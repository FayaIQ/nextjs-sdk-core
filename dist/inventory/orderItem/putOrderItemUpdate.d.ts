/**
 * Update an order item
 *
 * @param {string|number} id - Order ID
 * @param {string|number} itemId - Order item ID
 * @param {any} payload - Payload to update order item with
 *
 * @returns {Promise<any>} - Server response
 *
 * @throws {Error} - Failed to update order item
 */
declare function putOrderItemUpdate(id: string | number, itemId: string | number, payload: any): Promise<any>;

export { putOrderItemUpdate };
