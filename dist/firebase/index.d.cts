import * as _firebase_app from '@firebase/app';

declare function getFirebaseApp(): Promise<_firebase_app.FirebaseApp>;

type StartPhoneSignInResult = {
    confirm: (code: string) => Promise<any>;
};
declare function startPhoneSignIn(phoneNumber: string, recaptchaContainerId?: string): Promise<StartPhoneSignInResult>;
declare function confirmPhoneCode(confirmation: StartPhoneSignInResult, code: string): Promise<string>;
declare function getFirebaseIdToken(forceRefresh?: boolean): Promise<string | null>;
declare function signOutFirebase(): Promise<void>;
declare function startAuthStateSync(options?: {
    loginEndpoint?: string;
    onError?: (e: any) => void;
    refreshOnInit?: boolean;
}): Promise<() => void>;

export { type StartPhoneSignInResult, confirmPhoneCode, getFirebaseApp, getFirebaseIdToken, signOutFirebase, startAuthStateSync, startPhoneSignIn };
