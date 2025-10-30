export * from "./getCountries";
export * from "./getLocationChildren";
export type { Location, Country, City, District } from "./types";
export { GET as getCountriesHandler } from "./handler/countries";
export { GET as getLocationChildrenHandler } from "./handler/children";