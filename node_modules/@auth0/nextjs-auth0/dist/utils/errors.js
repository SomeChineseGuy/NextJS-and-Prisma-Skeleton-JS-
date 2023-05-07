"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileHandlerError = exports.LogoutHandlerError = exports.LoginHandlerError = exports.CallbackHandlerError = exports.HandlerError = exports.AccessTokenError = exports.AccessTokenErrorCode = exports.AuthError = exports.appendCause = void 0;
var tslib_1 = require("tslib");
/**
 * @ignore
 */
function appendCause(errorMessage, cause) {
    if (!cause)
        return errorMessage;
    var separator = errorMessage.endsWith('.') ? '' : '.';
    return "".concat(errorMessage).concat(separator, " CAUSE: ").concat(cause.message);
}
exports.appendCause = appendCause;
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
var AuthError = /** @class */ (function (_super) {
    tslib_1.__extends(AuthError, _super);
    function AuthError(options) {
        var _this = 
        /* c8 ignore next */
        _super.call(this, appendCause(options.message, options.cause)) || this;
        _this.code = options.code;
        _this.name = options.name;
        _this.cause = options.cause;
        _this.status = options.status;
        return _this;
    }
    return AuthError;
}(Error));
exports.AuthError = AuthError;
/**
 * Error codes for {@link AccessTokenError}.
 *
 * @category Server
 */
var AccessTokenErrorCode;
(function (AccessTokenErrorCode) {
    AccessTokenErrorCode["MISSING_SESSION"] = "ERR_MISSING_SESSION";
    AccessTokenErrorCode["MISSING_ACCESS_TOKEN"] = "ERR_MISSING_ACCESS_TOKEN";
    AccessTokenErrorCode["MISSING_REFRESH_TOKEN"] = "ERR_MISSING_REFRESH_TOKEN";
    AccessTokenErrorCode["EXPIRED_ACCESS_TOKEN"] = "ERR_EXPIRED_ACCESS_TOKEN";
    AccessTokenErrorCode["INSUFFICIENT_SCOPE"] = "ERR_INSUFFICIENT_SCOPE";
    AccessTokenErrorCode["FAILED_REFRESH_GRANT"] = "ERR_FAILED_REFRESH_GRANT";
})(AccessTokenErrorCode = exports.AccessTokenErrorCode || (exports.AccessTokenErrorCode = {}));
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
var AccessTokenError = /** @class */ (function (_super) {
    tslib_1.__extends(AccessTokenError, _super);
    function AccessTokenError(code, message, cause) {
        var _this = 
        /* c8 ignore next */
        _super.call(this, { code: code, message: message, name: 'AccessTokenError', cause: cause }) || this;
        // Capturing stack trace, excluding constructor call from it.
        Error.captureStackTrace(_this, _this.constructor);
        Object.setPrototypeOf(_this, AccessTokenError.prototype);
        return _this;
    }
    return AccessTokenError;
}(AuthError));
exports.AccessTokenError = AccessTokenError;
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
var HandlerError = /** @class */ (function (_super) {
    tslib_1.__extends(HandlerError, _super);
    function HandlerError(options) {
        var status;
        if ('status' in options.cause)
            status = options.cause.status;
        /* c8 ignore next */
        return _super.call(this, tslib_1.__assign(tslib_1.__assign({}, options), { status: status })) || this;
    }
    return HandlerError;
}(AuthError));
exports.HandlerError = HandlerError;
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
var CallbackHandlerError = /** @class */ (function (_super) {
    tslib_1.__extends(CallbackHandlerError, _super);
    function CallbackHandlerError(cause) {
        var _this = _super.call(this, {
            code: CallbackHandlerError.code,
            message: 'Callback handler failed.',
            name: 'CallbackHandlerError',
            cause: cause
        }) || this;
        Object.setPrototypeOf(_this, CallbackHandlerError.prototype);
        return _this;
    }
    CallbackHandlerError.code = 'ERR_CALLBACK_HANDLER_FAILURE';
    return CallbackHandlerError;
}(HandlerError));
exports.CallbackHandlerError = CallbackHandlerError;
/**
 * The error thrown by the login API route handler. It extends {@link HandlerError}.
 *
 * @see the {@link AuthError.cause | cause property} contains the underlying error.
 * @category Server
 */
var LoginHandlerError = /** @class */ (function (_super) {
    tslib_1.__extends(LoginHandlerError, _super);
    function LoginHandlerError(cause) {
        var _this = _super.call(this, {
            code: LoginHandlerError.code,
            message: 'Login handler failed.',
            name: 'LoginHandlerError',
            cause: cause
        }) || this;
        Object.setPrototypeOf(_this, LoginHandlerError.prototype);
        return _this;
    }
    LoginHandlerError.code = 'ERR_LOGIN_HANDLER_FAILURE';
    return LoginHandlerError;
}(HandlerError));
exports.LoginHandlerError = LoginHandlerError;
/**
 * The error thrown by the logout API route handler. It extends {@link HandlerError}.
 *
 * @see the {@link AuthError.cause | cause property} contains the underlying error.
 * @category Server
 */
var LogoutHandlerError = /** @class */ (function (_super) {
    tslib_1.__extends(LogoutHandlerError, _super);
    function LogoutHandlerError(cause) {
        var _this = _super.call(this, {
            code: LogoutHandlerError.code,
            message: 'Logout handler failed.',
            name: 'LogoutHandlerError',
            cause: cause
        }) || this;
        Object.setPrototypeOf(_this, LogoutHandlerError.prototype);
        return _this;
    }
    LogoutHandlerError.code = 'ERR_LOGOUT_HANDLER_FAILURE';
    return LogoutHandlerError;
}(HandlerError));
exports.LogoutHandlerError = LogoutHandlerError;
/**
 * The error thrown by the profile API route handler. It extends {@link HandlerError}.
 *
 * @see the {@link AuthError.cause | cause property} contains the underlying error.
 * @category Server
 */
var ProfileHandlerError = /** @class */ (function (_super) {
    tslib_1.__extends(ProfileHandlerError, _super);
    function ProfileHandlerError(cause) {
        var _this = _super.call(this, {
            code: ProfileHandlerError.code,
            message: 'Profile handler failed.',
            name: 'ProfileHandlerError',
            cause: cause
        }) || this;
        Object.setPrototypeOf(_this, ProfileHandlerError.prototype);
        return _this;
    }
    ProfileHandlerError.code = 'ERR_PROFILE_HANDLER_FAILURE';
    return ProfileHandlerError;
}(HandlerError));
exports.ProfileHandlerError = ProfileHandlerError;
//# sourceMappingURL=errors.js.map