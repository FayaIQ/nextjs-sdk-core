import { CustomersDropdownEnvelope } from './types.cjs';

/**
 * Fetch customers dropdown from identity service
 * Accepts optional query params: username and FullName
 * Works both server and client side (client uses /api/customers-dropdown)
 */
declare function getCustomersDropdown(username?: string, FullName?: string): Promise<CustomersDropdownEnvelope>;

export { getCustomersDropdown };
