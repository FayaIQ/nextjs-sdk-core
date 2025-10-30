// file: nextjs-sdk-core/npm/src/locations/types.ts

export interface Location {
  id: number;
  name: string;
  name_en: string;
}

export type Country = Location;
export type City = Location;
export type District = Location;

