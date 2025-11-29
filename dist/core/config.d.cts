interface AuthConfig {
    clientId: string;
    clientSecret: string;
    username: string;
    password: string;
    language?: number;
    gmt?: number;
}
declare const getAuthConfig: () => AuthConfig;

export { type AuthConfig, getAuthConfig };
