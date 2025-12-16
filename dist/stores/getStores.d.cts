import { Store } from './store-models.cjs';

declare function getStores(): Promise<Store[]>;

export { getStores };
