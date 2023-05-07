"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var auth0_session_1 = require("../auth0-session");
var errors_1 = require("../utils/errors");
var array_1 = require("../utils/array");
var session_1 = require("../session");
/**
 * @ignore
 */
function accessTokenFactory(config, getClient, sessionCache) {
    var _this = this;
    return function (req, res, accessTokenRequest) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var session, persistedScopes, matchingScopes, client, tokenSet, e_1, newSession;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sessionCache.get(req, res)];
                case 1:
                    session = _a.sent();
                    if (!session) {
                        throw new errors_1.AccessTokenError(errors_1.AccessTokenErrorCode.MISSING_SESSION, 'The user does not have a valid session.');
                    }
                    if (!session.accessToken && !session.refreshToken) {
                        throw new errors_1.AccessTokenError(errors_1.AccessTokenErrorCode.MISSING_ACCESS_TOKEN, 'The user does not have a valid access token.');
                    }
                    if (!session.accessTokenExpiresAt) {
                        throw new errors_1.AccessTokenError(errors_1.AccessTokenErrorCode.EXPIRED_ACCESS_TOKEN, 'Expiration information for the access token is not available. The user will need to sign in again.');
                    }
                    if (accessTokenRequest && accessTokenRequest.scopes) {
                        persistedScopes = session.accessTokenScope;
                        if (!persistedScopes || persistedScopes.length === 0) {
                            throw new errors_1.AccessTokenError(errors_1.AccessTokenErrorCode.INSUFFICIENT_SCOPE, 'An access token with the requested scopes could not be provided. The user will need to sign in again.');
                        }
                        matchingScopes = (0, array_1.intersect)(accessTokenRequest.scopes, persistedScopes.split(' '));
                        if (!(0, array_1.match)(accessTokenRequest.scopes, tslib_1.__spreadArray([], tslib_1.__read(matchingScopes), false))) {
                            throw new errors_1.AccessTokenError(errors_1.AccessTokenErrorCode.INSUFFICIENT_SCOPE, "Could not retrieve an access token with scopes \"".concat(accessTokenRequest.scopes.join(' '), "\". The user will need to sign in again."));
                        }
                    }
                    // Check if the token has expired.
                    // There is an edge case where we might have some clock skew where our code assumes the token is still valid.
                    // Adding a skew of 1 minute to compensate.
                    if (!session.refreshToken && session.accessTokenExpiresAt * 1000 - 60000 < Date.now()) {
                        throw new errors_1.AccessTokenError(errors_1.AccessTokenErrorCode.EXPIRED_ACCESS_TOKEN, 'The access token expired and a refresh token is not available. The user will need to sign in again.');
                    }
                    if ((accessTokenRequest === null || accessTokenRequest === void 0 ? void 0 : accessTokenRequest.refresh) && !session.refreshToken) {
                        throw new errors_1.AccessTokenError(errors_1.AccessTokenErrorCode.MISSING_REFRESH_TOKEN, 'A refresh token is required to refresh the access token, but none is present.');
                    }
                    if (!((session.refreshToken && session.accessTokenExpiresAt * 1000 - 60000 < Date.now()) ||
                        (session.refreshToken && accessTokenRequest && accessTokenRequest.refresh))) return [3 /*break*/, 10];
                    return [4 /*yield*/, getClient()];
                case 2:
                    client = _a.sent();
                    tokenSet = void 0;
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, client.refresh(session.refreshToken, {
                            exchangeBody: accessTokenRequest === null || accessTokenRequest === void 0 ? void 0 : accessTokenRequest.authorizationParams
                        })];
                case 4:
                    tokenSet = _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    throw new errors_1.AccessTokenError(errors_1.AccessTokenErrorCode.FAILED_REFRESH_GRANT, 'The request to refresh the access token failed.', new auth0_session_1.IdentityProviderError(e_1));
                case 6:
                    newSession = (0, session_1.fromTokenSet)(tokenSet, config);
                    Object.assign(session, tslib_1.__assign(tslib_1.__assign({}, newSession), { refreshToken: newSession.refreshToken || session.refreshToken, user: tslib_1.__assign(tslib_1.__assign({}, session.user), newSession.user) }));
                    if (!(accessTokenRequest === null || accessTokenRequest === void 0 ? void 0 : accessTokenRequest.afterRefresh)) return [3 /*break*/, 8];
                    return [4 /*yield*/, accessTokenRequest.afterRefresh(req, res, session)];
                case 7:
                    session = _a.sent();
                    _a.label = 8;
                case 8: return [4 /*yield*/, sessionCache.set(req, res, session)];
                case 9:
                    _a.sent();
                    // Return the new access token.
                    return [2 /*return*/, {
                            accessToken: tokenSet.access_token
                        }];
                case 10:
                    // We don't have an access token.
                    if (!session.accessToken) {
                        throw new errors_1.AccessTokenError(errors_1.AccessTokenErrorCode.MISSING_ACCESS_TOKEN, 'The user does not have a valid access token.');
                    }
                    // The access token is not expired and has sufficient scopes.
                    return [2 /*return*/, {
                            accessToken: session.accessToken
                        }];
            }
        });
    }); };
}
exports.default = accessTokenFactory;
//# sourceMappingURL=get-access-token.js.map