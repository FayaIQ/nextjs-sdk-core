interface Store {
    id: number;
    code: string;
    name: string;
}
type StoresResponse = Store[];

export type { Store, StoresResponse };
