import { C as Category } from './types-D0Xbpetb.cjs';
import { I as ItemsFilterParameters } from './filter-models-CasAOMhY.cjs';

declare function getMenus({ filterParams, }: {
    filterParams: ItemsFilterParameters;
}): Promise<Category[]>;

export { getMenus as g };
