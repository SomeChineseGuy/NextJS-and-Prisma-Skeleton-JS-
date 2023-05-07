"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var http_1 = require("http");
var session_1 = require("../session");
var assert_1 = require("../utils/assert");
var errors_1 = require("../utils/errors");
/**
 * @ignore
 */
function profileHandler(getClient, getAccessToken, sessionCache) {
    var _this = this;
    var profile = function (req, res, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var session, accessToken, client, userInfo, newSession, e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 10, , 11]);
                        (0, assert_1.assertReqRes)(req, res);
                        return [4 /*yield*/, sessionCache.isAuthenticated(req, res)];
                    case 1:
                        if (!(_a.sent())) {
                            res.status(204).end();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, sessionCache.get(req, res)];
                    case 2:
                        session = (_a.sent());
                        res.setHeader('Cache-Control', 'no-store');
                        if (!options.refetch) return [3 /*break*/, 9];
                        return [4 /*yield*/, getAccessToken(req, res)];
                    case 3:
                        accessToken = (_a.sent()).accessToken;
                        if (!accessToken) {
                            throw new Error('No access token available to refetch the profile');
                        }
                        return [4 /*yield*/, getClient()];
                    case 4:
                        client = _a.sent();
                        return [4 /*yield*/, client.userinfo(accessToken)];
                    case 5:
                        userInfo = _a.sent();
                        newSession = (0, session_1.fromJson)(tslib_1.__assign(tslib_1.__assign({}, session), { user: tslib_1.__assign(tslib_1.__assign({}, session.user), userInfo) }));
                        if (!options.afterRefetch) return [3 /*break*/, 7];
                        return [4 /*yield*/, options.afterRefetch(req, res, newSession)];
                    case 6:
                        newSession = _a.sent();
                        _a.label = 7;
                    case 7: return [4 /*yield*/, sessionCache.set(req, res, newSession)];
                    case 8:
                        _a.sent();
                        res.json(newSession.user);
                        return [2 /*return*/];
                    case 9:
                        res.json(session.user);
                        return [3 /*break*/, 11];
                    case 10:
                        e_1 = _a.sent();
                        throw new errors_1.ProfileHandlerError(e_1);
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    return function (reqOrOptions, res, options) {
        if (reqOrOptions instanceof http_1.IncomingMessage && res) {
            return profile(reqOrOptions, res, options);
        }
        if (typeof reqOrOptions === 'function') {
            return function (req, res) { return profile(req, res, reqOrOptions(req)); };
        }
        return function (req, res) { return profile(req, res, reqOrOptions); };
    };
}
exports.default = profileHandler;
//# sourceMappingURL=profile.js.map