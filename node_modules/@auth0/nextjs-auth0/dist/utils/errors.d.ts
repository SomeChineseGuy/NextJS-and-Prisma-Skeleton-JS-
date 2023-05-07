import { HttpError } from 'http-errors';
/**
 * @ignore
 */
export declare function appendCause(errorMessage: string, cause?: Error): string;
type AuthErrorOptions = {
    code: string;
    message: string;
    name: string;
    cause?: Error;
    status?: number;
};
/**
 * The base class for all SDK errors.
 *
 * Because part of the error message can come from the OpenID Connect `error` query parameter we
 * do some basic escaping which makes sure the default error handler is safe from XSS.
 *
 * **IMPORTANT** If you write your own error handler, you should **not** render the error
 * without using a templating engine that will properly escape it for other HTML contexts first.
 *
 * Note that the error message of the {@link AuthError.cause | underlying error} is **not** escaped
 * in any way, so do **not** render it without escaping it first!
 *
 * @category Server
 */
export declare abstract class AuthError extends Error {
    /**
     * A machine-readable error code that remains stable within a major version of the SDK. You
     * should rely on this error code to handle errors. In contrast, the error message is not part of
     * the API and can change anytime. Do **not** parse or otherwise rely on the error message to
     * handle errors.
     */
    readonly code: string;
    /**
     * The error class name.
     */
    readonly name: string;
    /**
     * The underlying error, if any.
     *
     * **IMPORTANT** When this error is from the Identity Provider ({@Link IdentityProviderError}) it can contain user
     * input and is only escaped using basic escaping for putting untrusted data directly into the HTML body.
     *
     * You should **not** render this error without using a templating engine that will properly escape it for other
     * HTML contexts first.
     */
    readonly cause?: Error;
    /**
     * The HTTP status code, if any.
     */
    readonly status?: number;
    constructor(options: AuthErrorOptions);
}
/**
 * Error codes for {@link AccessTokenError}.
 *
 * @category Server
 */
export declare enum AccessTokenErrorCode {
    MISSING_SESSION = "ERR_MISSING_SESSION",
    MISSING_ACCESS_TOKEN = "ERR_MISSING_ACCESS_TOKEN",
    MISSING_REFRESH_TOKEN = "ERR_MISSING_REFRESH_TOKEN",
    EXPIRED_ACCESS_TOKEN = "ERR_EXPIRED_ACCESS_TOKEN",
    INSUFFICIENT_SCOPE = "ERR_INSUFFICIENT_SCOPE",
    FAILED_REFRESH_GRANT = "ERR_FAILED_REFRESH_GRANT"
}
/**
 * The error thrown by {@link GetAccessToken}.
 *
 * @see the {@link AuthError.code | code property} contains a machine-readable error code that
 * remains stable within a major version of the SDK. You should rely on this error code to handle
 * errors. In contrast, the error message is not part of the API and can change anytime. Do **not**
 * parse or otherwise rely on the error message to handle errors.
 *
 * @see {@link AccessTokenErrorCode} for the list of all possible error codes.
 * @category Server
 */
export declare class AccessTokenError extends AuthError {
    constructor(code: AccessTokenErrorCode, message: string, cause?: Error);
}
/**
 * @ignore
 */
export type HandlerErrorCause = Error | AuthError | HttpError;
type HandlerErrorOptions = {
    code: string;
    message: string;
    name: string;
    cause: HandlerErrorCause;
};
/**
 * The base class for errors thrown by API route handlers. It extends {@link AuthError}.
 *
 * Because part of the error message can come from the OpenID Connect `error` query parameter we
 * do some basic escaping which makes sure the default error handler is safe from XSS.
 *
 * **IMPORTANT** If you write your own error handler, you should **not** render the error message
 * without using a templating engine that will properly escape it for other HTML contexts first.
 *
 * @see the {@link AuthError.cause | cause property} contains the underlying error.
 * **IMPORTANT** When this error is from the Identity Provider ({@Link IdentityProviderError}) it can contain user
 * input and is only escaped using basic escaping for putting untrusted data directly into the HTML body.
 * You should **not** render this error without using a templating engine that will properly escape it for other
 * HTML contexts first.
 *
 * @see the {@link AuthError.status | status property} contains the HTTP status code of the error,
 * if any.
 *
 * @category Server
 */
export declare class HandlerError extends AuthError {
    constructor(options: HandlerErrorOptions);
}
/**
 * The error thrown by the callback API route handler. It extends {@link HandlerError}.
 *
 * Because part of the error message can come from the OpenID Connect `error` query parameter we
 * do some basic escaping which makes sure the default error handler is safe from XSS.
 *
 * **IMPORTANT** If you write your own error handler, you should **not** render the error message
 * without using a templating engine that will properly escape it for other HTML contexts first.
 *
 * @see the {@link AuthError.cause | cause property} contains the underlying error.
 * **IMPORTANT** When this error is from the Identity Provider ({@Link IdentityProviderError}) it can contain user
 * input and is only escaped using basic escaping for putting untrusted data directly into the HTML body.
 * You should **not** render this error without using a templating engine that will properly escape it for other
 * HTML contexts first.
 *
 * @see the {@link AuthError.status | status property} contains the HTTP status code of the error,
 * if any.
 *
 * @category Server
 */
export declare class CallbackHandlerError extends HandlerError {
    static readonly code: string;
    constructor(cause: HandlerErrorCause);
}
/**
 * The error thrown by the login API route handler. It extends {@link HandlerError}.
 *
 * @see the {@link AuthError.cause | cause property} contains the underlying error.
 * @category Server
 */
export declare class LoginHandlerError extends HandlerError {
    static readonly code: string;
    constructor(cause: HandlerErrorCause);
}
/**
 * The error thrown by the logout API route handler. It extends {@link HandlerError}.
 *
 * @see the {@link AuthError.cause | cause property} contains the underlying error.
 * @category Server
 */
export declare class LogoutHandlerError extends HandlerError {
    static readonly code: string;
    constructor(cause: HandlerErrorCause);
}
/**
 * The error thrown by the profile API route handler. It extends {@link HandlerError}.
 *
 * @see the {@link AuthError.cause | cause property} contains the underlying error.
 * @category Server
 */
export declare class ProfileHandlerError extends HandlerError {
    static readonly code: string;
    constructor(cause: HandlerErrorCause);
}
export {};
//# sourceMappingURL=errors.d.ts.map