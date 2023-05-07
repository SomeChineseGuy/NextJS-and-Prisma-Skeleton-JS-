"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cookies = void 0;
var tslib_1 = require("tslib");
var cookie_1 = require("cookie");
var Cookies = /** @class */ (function () {
    function Cookies() {
        this.cookies = [];
    }
    Cookies.prototype.set = function (name, value, options) {
        if (options === void 0) { options = {}; }
        this.cookies.push((0, cookie_1.serialize)(name, value, options));
    };
    Cookies.prototype.clear = function (name, options) {
        if (options === void 0) { options = {}; }
        var domain = options.domain, path = options.path, secure = options.secure, sameSite = options.sameSite;
        var clearOptions = {
            domain: domain,
            path: path,
            maxAge: 0
        };
        // If SameSite=None is set, the cookie Secure attribute must also be set (or the cookie will be blocked)
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite#none
        if (sameSite === 'none') {
            clearOptions.secure = secure;
            clearOptions.sameSite = sameSite;
        }
        this.set(name, '', clearOptions);
    };
    Cookies.prototype.commit = function (res, filterCookiePrefix) {
        var previousCookies = this.getSetCookieHeader(res);
        if (filterCookiePrefix) {
            var re_1 = new RegExp("^".concat(filterCookiePrefix, "(\\.\\d+)?="));
            previousCookies = previousCookies.filter(function (cookie) { return !re_1.test(cookie); });
        }
        this.setSetCookieHeader(res, tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(previousCookies), false), tslib_1.__read(this.cookies), false));
    };
    return Cookies;
}());
exports.Cookies = Cookies;
var NodeCookies = /** @class */ (function (_super) {
    tslib_1.__extends(NodeCookies, _super);
    function NodeCookies() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NodeCookies.prototype.getSetCookieHeader = function (res) {
        var cookies = res.getHeader('Set-Cookie') || [];
        if (!Array.isArray(cookies)) {
            cookies = [cookies];
        }
        return cookies;
    };
    NodeCookies.prototype.setSetCookieHeader = function (res, cookies) {
        res.setHeader('Set-Cookie', cookies);
    };
    NodeCookies.prototype.getAll = function (req) {
        return (0, cookie_1.parse)(req.headers.cookie || '');
    };
    return NodeCookies;
}(Cookies));
exports.default = NodeCookies;
//# sourceMappingURL=cookies.js.map