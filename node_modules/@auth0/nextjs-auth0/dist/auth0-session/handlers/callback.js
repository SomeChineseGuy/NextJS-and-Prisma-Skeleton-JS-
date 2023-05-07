"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var url_join_1 = tslib_1.__importDefault(require("url-join"));
var http_errors_1 = tslib_1.__importDefault(require("http-errors"));
var openid_client_1 = require("openid-client");
var encoding_1 = require("../utils/encoding");
var errors_1 = require("../utils/errors");
function getRedirectUri(config) {
    return (0, url_join_1.default)(config.baseURL, config.routes.callback);
}
function callbackHandlerFactory(config, getClient, sessionCache, transientCookieHandler) {
    var _this = this;
    return function (req, res, options) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var client, redirectUri, tokenSet, callbackParams, expectedState, max_age, code_verifier, nonce, response_type, err_1, openidState, session;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getClient()];
                case 1:
                    client = _a.sent();
                    redirectUri = (options === null || options === void 0 ? void 0 : options.redirectUri) || getRedirectUri(config);
                    callbackParams = client.callbackParams(req);
                    if (!callbackParams.state) {
                        throw (0, http_errors_1.default)(404, new errors_1.MissingStateParamError());
                    }
                    return [4 /*yield*/, transientCookieHandler.read('state', req, res)];
                case 2:
                    expectedState = _a.sent();
                    if (!expectedState) {
                        throw (0, http_errors_1.default)(400, new errors_1.MissingStateCookieError());
                    }
                    return [4 /*yield*/, transientCookieHandler.read('max_age', req, res)];
                case 3:
                    max_age = _a.sent();
                    return [4 /*yield*/, transientCookieHandler.read('code_verifier', req, res)];
                case 4:
                    code_verifier = _a.sent();
                    return [4 /*yield*/, transientCookieHandler.read('nonce', req, res)];
                case 5:
                    nonce = _a.sent();
                    return [4 /*yield*/, transientCookieHandler.read('response_type', req, res)];
                case 6:
                    response_type = (_a.sent()) || config.authorizationParams.response_type;
                    _a.label = 7;
                case 7:
                    _a.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, client.callback(redirectUri, callbackParams, {
                            max_age: max_age !== undefined ? +max_age : undefined,
                            code_verifier: code_verifier,
                            nonce: nonce,
                            state: expectedState,
                            response_type: response_type
                        }, { exchangeBody: options === null || options === void 0 ? void 0 : options.authorizationParams })];
                case 8:
                    tokenSet = _a.sent();
                    return [3 /*break*/, 10];
                case 9:
                    err_1 = _a.sent();
                    if (err_1 instanceof openid_client_1.errors.OPError) {
                        err_1 = new errors_1.IdentityProviderError(err_1);
                    }
                    else if (err_1 instanceof openid_client_1.errors.RPError) {
                        err_1 = new errors_1.ApplicationError(err_1);
                        /* c8 ignore next 3 */
                    }
                    else {
                        err_1 = new errors_1.EscapedError(err_1.message);
                    }
                    throw (0, http_errors_1.default)(400, err_1, { openIdState: (0, encoding_1.decodeState)(expectedState) });
                case 10:
                    openidState = (0, encoding_1.decodeState)(expectedState);
                    return [4 /*yield*/, sessionCache.fromTokenSet(tokenSet)];
                case 11:
                    session = _a.sent();
                    if (!(options === null || options === void 0 ? void 0 : options.afterCallback)) return [3 /*break*/, 13];
                    return [4 /*yield*/, options.afterCallback(req, res, session, openidState)];
                case 12:
                    session = _a.sent();
                    _a.label = 13;
                case 13:
                    if (!session) return [3 /*break*/, 15];
                    return [4 /*yield*/, sessionCache.create(req, res, session)];
                case 14:
                    _a.sent();
                    _a.label = 15;
                case 15:
                    if (!res.writableEnded) {
                        res.writeHead(302, {
                            Location: res.getHeader('Location') || openidState.returnTo || config.baseURL
                        });
                        res.end((0, errors_1.htmlSafe)(openidState.returnTo || config.baseURL));
                    }
                    return [2 /*return*/];
            }
        });
    }); };
}
exports.default = callbackHandlerFactory;
//# sourceMappingURL=callback.js.map