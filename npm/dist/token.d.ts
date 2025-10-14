export type TokenResponse = {
    access_token: string;
    token_type?: string;
    expires_in?: number;
    [k: string]: unknown;
};
export type TokenProvider = () => Promise<string | null>;
export default function getToken(): Promise<string>;
