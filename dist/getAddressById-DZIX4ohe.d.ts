import { b as OrderAddress } from './order-models-Dqv0Jc_o.js';

declare function getCountries(): Promise<any>;

declare function getLocationChildren(parentId: number): Promise<any>;
declare function getCities(countryId: number): Promise<any>;
declare function getDistricts(cityId: number): Promise<any>;

declare function getAddressById(id: string | number): Promise<OrderAddress>;

export { getLocationChildren as a, getCities as b, getDistricts as c, getAddressById as d, getCountries as g };
