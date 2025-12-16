import { UpdateItemRequest } from './types.cjs';

interface UpdateItemResponse {
    success: boolean;
    message?: string;
    code?: string;
    name?: string;
}
/**
 * Update an item by id
 * @param id - Item ID
 * @param data - Fields to update
 */
declare function putItem(id: string | number, data: UpdateItemRequest): Promise<UpdateItemResponse>;

export { type UpdateItemResponse, putItem };
