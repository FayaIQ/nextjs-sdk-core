import { Store } from './store-models.js';

declare function getStores(): Promise<Store[]>;

export { getStores };
