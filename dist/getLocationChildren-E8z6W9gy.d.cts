declare function getCountries(): Promise<any>;

declare function getLocationChildren(parentId: number): Promise<any>;
declare function getCities(countryId: number): Promise<any>;
declare function getDistricts(cityId: number): Promise<any>;

export { getLocationChildren as a, getCities as b, getDistricts as c, getCountries as g };
