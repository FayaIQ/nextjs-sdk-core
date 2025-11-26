interface Location {
    id: number;
    name: string;
    name_en: string;
}
type Country = Location;
type City = Location;
type District = Location;

export type { City, Country, District, Location };
