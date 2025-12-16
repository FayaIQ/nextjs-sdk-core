/**
 * Undo cancel an order item
 *
 * @param {string|number} id - Order ID
 * @param {string|number} itemId - Order item ID
 * @returns {Promise<Object>} - API response
 * @throws {Error} - If there is an error in the API call
 */
declare function putOrderItemUndoCancel(id: string | number, itemId: string | number): Promise<any>;

export { putOrderItemUndoCancel };
