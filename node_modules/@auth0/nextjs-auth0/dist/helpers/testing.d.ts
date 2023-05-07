import { CookieConfig } from '../auth0-session';
import { Session } from '../session';
/**
 * Configuration parameters used by {@link generateSessionCookie}.
 */
export type GenerateSessionCookieConfig = {
    /**
     * The secret used to derive an encryption key for the session cookie.
     *
     * **IMPORTANT**: you must use the same value as in the SDK configuration.
     * See {@link ConfigParameters.secret}.
     */
    secret: string;
    /**
     * Integer value, in seconds, used as the duration of the session cookie.
     * Defaults to `604800` seconds (7 days).
     */
    duration?: number;
} & Partial<CookieConfig>;
export declare const generateSessionCookie: (session: Partial<Session>, config: GenerateSessionCookieConfig) => Promise<string>;
//# sourceMappingURL=testing.d.ts.map