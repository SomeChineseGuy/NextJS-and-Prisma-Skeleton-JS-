"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var cookies_1 = require("../auth0-session/utils/cookies");
var MiddlewareCookies = /** @class */ (function (_super) {
    tslib_1.__extends(MiddlewareCookies, _super);
    function MiddlewareCookies() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MiddlewareCookies.prototype.getSetCookieHeader = function (res) {
        var value = res.headers.get('set-cookie');
        return (value === null || value === void 0 ? void 0 : value.split(', ')) || [];
    };
    MiddlewareCookies.prototype.setSetCookieHeader = function (res, cookies) {
        res.headers.set('set-cookie', cookies.join(', '));
    };
    MiddlewareCookies.prototype.getAll = function (req) {
        var cookies = req.cookies;
        if (typeof cookies.getAll === 'function') {
            return req.cookies.getAll().reduce(function (memo, _a) {
                var _b;
                var name = _a.name, value = _a.value;
                return (tslib_1.__assign(tslib_1.__assign({}, memo), (_b = {}, _b[name] = value, _b)));
            }, {});
        }
        // Edge cookies before Next 13.0.1 have no `getAll` and extend `Map`.
        var legacyCookies = cookies;
        return Array.from(legacyCookies.keys()).reduce(function (memo, key) {
            memo[key] = legacyCookies.get(key);
            return memo;
        }, {});
    };
    return MiddlewareCookies;
}(cookies_1.Cookies));
exports.default = MiddlewareCookies;
//# sourceMappingURL=middleware-cookies.js.map