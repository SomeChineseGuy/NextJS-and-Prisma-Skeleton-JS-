import type { errors } from 'openid-client';
export declare class EscapedError extends Error {
    /**
     * **WARNING** The message can contain user input and is only escaped using basic escaping for putting untrusted data
     * directly into the HTML body
     */
    constructor(message: string);
}
export declare class MissingStateParamError extends Error {
    static message: string;
    constructor();
}
export declare class MissingStateCookieError extends Error {
    static message: string;
    constructor();
}
export declare class ApplicationError extends EscapedError {
    /**
     * **WARNING** The message can contain user input and is only escaped using basic escaping for putting untrusted data
     * directly into the HTML body
     */
    constructor(rpError: errors.RPError);
}
export declare class IdentityProviderError extends EscapedError {
    /**
     * The 'error_description' parameter from the AS response.
     * **WARNING** This can contain user input and is only escaped using basic escaping for putting untrusted data
     * directly into the HTML body
     */
    errorDescription?: string;
    /**
     * The 'error' parameter from the AS response
     * **WARNING** This can contain user input and is only escaped using basic escaping for putting untrusted data
     * directly into the HTML body
     */
    error?: string;
    /**
     * **WARNING** The message can contain user input and is only escaped using basic escaping for putting untrusted data
     * directly into the HTML body
     */
    constructor(rpError: errors.OPError);
}
export declare class DiscoveryError extends EscapedError {
    constructor(error: Error | (Error & {
        _errors: Error[];
    }), issuerBaseUrl: string);
}
export declare function htmlSafe(input?: string): string | undefined;
//# sourceMappingURL=errors.d.ts.map