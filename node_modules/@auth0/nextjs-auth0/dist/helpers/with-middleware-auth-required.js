"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var server_1 = require("next/server");
/**
 * @ignore
 */
function withMiddlewareAuthRequiredFactory(_a, getSessionCache) {
    var login = _a.login, callback = _a.callback, unauthorized = _a.unauthorized;
    return function withMiddlewareAuthRequired(middleware) {
        return function wrappedMiddleware() {
            var _a, _b;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return tslib_1.__awaiter(this, void 0, void 0, function () {
                var _c, req, _d, pathname, origin, search, ignorePaths, sessionCache, authRes, session, res, headers, cookies, authCookies;
                return tslib_1.__generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _c = tslib_1.__read(args, 1), req = _c[0];
                            _d = req.nextUrl, pathname = _d.pathname, origin = _d.origin, search = _d.search;
                            ignorePaths = [login, callback, unauthorized, '/_next', '/favicon.ico'];
                            if (ignorePaths.some(function (p) { return pathname.startsWith(p); })) {
                                return [2 /*return*/];
                            }
                            sessionCache = getSessionCache();
                            authRes = server_1.NextResponse.next();
                            return [4 /*yield*/, sessionCache.get(req, authRes)];
                        case 1:
                            session = _e.sent();
                            if (!(session === null || session === void 0 ? void 0 : session.user)) {
                                if (pathname.startsWith('/api')) {
                                    return [2 /*return*/, server_1.NextResponse.rewrite(new URL(unauthorized, origin), { status: 401 })];
                                }
                                return [2 /*return*/, server_1.NextResponse.redirect(new URL("".concat(login, "?returnTo=").concat(encodeURIComponent("".concat(pathname).concat(search))), origin))];
                            }
                            return [4 /*yield*/, (middleware && middleware.apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(args), false)))];
                        case 2:
                            res = _e.sent();
                            if (res) {
                                headers = new Headers(res.headers);
                                cookies = ((_a = headers.get('set-cookie')) === null || _a === void 0 ? void 0 : _a.split(', ')) || [];
                                authCookies = ((_b = authRes.headers.get('set-cookie')) === null || _b === void 0 ? void 0 : _b.split(', ')) || [];
                                if (cookies.length || authCookies.length) {
                                    headers.set('set-cookie', tslib_1.__spreadArray(tslib_1.__spreadArray([], tslib_1.__read(authCookies), false), tslib_1.__read(cookies), false).join(', '));
                                }
                                return [2 /*return*/, server_1.NextResponse.next(tslib_1.__assign(tslib_1.__assign({}, res), { status: res.status, headers: headers }))];
                            }
                            else {
                                return [2 /*return*/, authRes];
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
    };
}
exports.default = withMiddlewareAuthRequiredFactory;
//# sourceMappingURL=with-middleware-auth-required.js.map