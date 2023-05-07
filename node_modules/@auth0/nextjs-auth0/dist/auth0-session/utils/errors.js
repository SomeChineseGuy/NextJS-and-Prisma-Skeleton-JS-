"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.htmlSafe = exports.DiscoveryError = exports.IdentityProviderError = exports.ApplicationError = exports.MissingStateCookieError = exports.MissingStateParamError = exports.EscapedError = void 0;
var tslib_1 = require("tslib");
var EscapedError = /** @class */ (function (_super) {
    tslib_1.__extends(EscapedError, _super);
    /**
     * **WARNING** The message can contain user input and is only escaped using basic escaping for putting untrusted data
     * directly into the HTML body
     */
    function EscapedError(message) {
        var _this = 
        /* c8 ignore next */
        _super.call(this, htmlSafe(message)) || this;
        Object.setPrototypeOf(_this, EscapedError.prototype);
        return _this;
    }
    return EscapedError;
}(Error));
exports.EscapedError = EscapedError;
var MissingStateParamError = /** @class */ (function (_super) {
    tslib_1.__extends(MissingStateParamError, _super);
    function MissingStateParamError() {
        var _this = 
        /* c8 ignore next */
        _super.call(this, MissingStateParamError.message) || this;
        Object.setPrototypeOf(_this, MissingStateParamError.prototype);
        return _this;
    }
    MissingStateParamError.message = 'Missing state parameter in Authorization Response.';
    return MissingStateParamError;
}(Error));
exports.MissingStateParamError = MissingStateParamError;
var MissingStateCookieError = /** @class */ (function (_super) {
    tslib_1.__extends(MissingStateCookieError, _super);
    function MissingStateCookieError() {
        var _this = 
        /* c8 ignore next */
        _super.call(this, MissingStateCookieError.message) || this;
        Object.setPrototypeOf(_this, MissingStateCookieError.prototype);
        return _this;
    }
    MissingStateCookieError.message = 'Missing state cookie from login request (check login URL, callback URL and cookie config).';
    return MissingStateCookieError;
}(Error));
exports.MissingStateCookieError = MissingStateCookieError;
var ApplicationError = /** @class */ (function (_super) {
    tslib_1.__extends(ApplicationError, _super);
    /**
     * **WARNING** The message can contain user input and is only escaped using basic escaping for putting untrusted data
     * directly into the HTML body
     */
    function ApplicationError(rpError) {
        var _this = 
        /* c8 ignore next */
        _super.call(this, rpError.message) || this;
        Object.setPrototypeOf(_this, ApplicationError.prototype);
        return _this;
    }
    return ApplicationError;
}(EscapedError));
exports.ApplicationError = ApplicationError;
var IdentityProviderError = /** @class */ (function (_super) {
    tslib_1.__extends(IdentityProviderError, _super);
    /**
     * **WARNING** The message can contain user input and is only escaped using basic escaping for putting untrusted data
     * directly into the HTML body
     */
    function IdentityProviderError(rpError) {
        var _this = 
        /* c8 ignore next */
        _super.call(this, rpError.message) || this;
        _this.error = htmlSafe(rpError.error);
        _this.errorDescription = htmlSafe(rpError.error_description);
        Object.setPrototypeOf(_this, IdentityProviderError.prototype);
        return _this;
    }
    return IdentityProviderError;
}(EscapedError));
exports.IdentityProviderError = IdentityProviderError;
var DiscoveryError = /** @class */ (function (_super) {
    tslib_1.__extends(DiscoveryError, _super);
    function DiscoveryError(error, issuerBaseUrl) {
        var _this = 
        /* c8 ignore next */
        _super.call(this, "Discovery requests failing for ".concat(issuerBaseUrl, ", ").concat(error.message)) || this;
        Object.setPrototypeOf(_this, DiscoveryError.prototype);
        return _this;
    }
    return DiscoveryError;
}(EscapedError));
exports.DiscoveryError = DiscoveryError;
// eslint-disable-next-line max-len
// Basic escaping for putting untrusted data directly into the HTML body, per: https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#rule-1-html-encode-before-inserting-untrusted-data-into-html-element-content.
function htmlSafe(input) {
    return (input &&
        input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;'));
}
exports.htmlSafe = htmlSafe;
//# sourceMappingURL=errors.js.map