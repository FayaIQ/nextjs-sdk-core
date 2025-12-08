import { PostClientRequest, Client } from '../client-models.cjs';

declare function postClient(data: PostClientRequest): Promise<Client>;

export { postClient };
