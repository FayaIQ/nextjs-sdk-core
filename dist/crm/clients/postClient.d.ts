import { PostClientRequest, Client } from '../client-models.js';

declare function postClient(data: PostClientRequest): Promise<Client>;

export { postClient };
