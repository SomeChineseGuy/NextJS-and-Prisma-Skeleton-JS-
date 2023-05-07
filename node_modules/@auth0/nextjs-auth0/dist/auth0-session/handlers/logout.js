"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var url_1 = tslib_1.__importDefault(require("url"));
var url_join_1 = tslib_1.__importDefault(require("url-join"));
var debug_1 = tslib_1.__importDefault(require("../utils/debug"));
var errors_1 = require("../utils/errors");
var debug = (0, debug_1.default)('logout');
function logoutHandlerFactory(config, getClient, sessionCache) {
    var _this = this;
    return function (req, res, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var returnURL, isAuthenticated, idToken, client;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        returnURL = options.returnTo || config.routes.postLogoutRedirect;
                        debug('logout() with return url: %s', returnURL);
                        if (url_1.default.parse(returnURL).host === null) {
                            returnURL = (0, url_join_1.default)(config.baseURL, returnURL);
                        }
                        return [4 /*yield*/, sessionCache.isAuthenticated(req, res)];
                    case 1:
                        isAuthenticated = _a.sent();
                        if (!isAuthenticated) {
                            debug('end-user already logged out, redirecting to %s', returnURL);
                            res.writeHead(302, {
                                Location: returnURL
                            });
                            res.end((0, errors_1.htmlSafe)(returnURL));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, sessionCache.getIdToken(req, res)];
                    case 2:
                        idToken = _a.sent();
                        return [4 /*yield*/, sessionCache.delete(req, res)];
                    case 3:
                        _a.sent();
                        if (!config.idpLogout) {
                            debug('performing a local only logout, redirecting to %s', returnURL);
                            res.writeHead(302, {
                                Location: returnURL
                            });
                            res.end((0, errors_1.htmlSafe)(returnURL));
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, getClient()];
                    case 4:
                        client = _a.sent();
                        returnURL = client.endSessionUrl(tslib_1.__assign(tslib_1.__assign({}, options.logoutParams), { post_logout_redirect_uri: returnURL, id_token_hint: idToken }));
                        debug('logging out of identity provider, redirecting to %s', returnURL);
                        res.writeHead(302, {
                            Location: returnURL
                        });
                        res.end((0, errors_1.htmlSafe)(returnURL));
                        return [2 /*return*/];
                }
            });
        });
    };
}
exports.default = logoutHandlerFactory;
//# sourceMappingURL=logout.js.map