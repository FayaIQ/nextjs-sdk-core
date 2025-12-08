import { C as Category } from './types-BlK7R_r9.cjs';
import { I as ItemsFilterParameters } from './filter-models-Dt5y9Xvs.cjs';

declare function getMenus({ filterParams, }: {
    filterParams: ItemsFilterParameters;
}): Promise<Category[]>;

export { getMenus as g };
