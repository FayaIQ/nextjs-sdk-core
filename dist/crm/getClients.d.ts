import { Client } from './client-models.js';

type FilterLike = {
    toURLSearchParams(): URLSearchParams;
} | Record<string, any> | URLSearchParams | string;
declare function getClients({ filterParams }?: {
    filterParams?: FilterLike;
}): Promise<Client[]>;

export { getClients };
