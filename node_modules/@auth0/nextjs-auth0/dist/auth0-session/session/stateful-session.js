"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatefulSession = void 0;
var tslib_1 = require("tslib");
var debug_1 = tslib_1.__importDefault(require("../utils/debug"));
var abstract_session_1 = require("./abstract-session");
var signed_cookies_1 = require("../utils/signed-cookies");
var hkdf_1 = require("../utils/hkdf");
var debug = (0, debug_1.default)('stateful-session');
var StatefulSession = /** @class */ (function (_super) {
    tslib_1.__extends(StatefulSession, _super);
    function StatefulSession(config, Cookies) {
        var _this = _super.call(this, config, Cookies) || this;
        _this.config = config;
        _this.Cookies = Cookies;
        _this.store = config.session.store;
        return _this;
    }
    StatefulSession.prototype.getKeys = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var secret, secrets, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.keys) return [3 /*break*/, 2];
                        secret = this.config.secret;
                        secrets = Array.isArray(secret) ? secret : [secret];
                        _a = this;
                        return [4 /*yield*/, Promise.all(secrets.map(hkdf_1.signing))];
                    case 1:
                        _a.keys = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.keys];
                }
            });
        });
    };
    StatefulSession.prototype.getSession = function (req) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sessionName, cookies, keys, sessionId;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sessionName = this.config.session.name;
                        cookies = new this.Cookies().getAll(req);
                        return [4 /*yield*/, this.getKeys()];
                    case 1:
                        keys = _a.sent();
                        return [4 /*yield*/, (0, signed_cookies_1.getCookieValue)(sessionName, cookies[sessionName], keys)];
                    case 2:
                        sessionId = _a.sent();
                        if (sessionId) {
                            debug('reading session from %s store', sessionId);
                            return [2 /*return*/, this.store.get(sessionId)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    StatefulSession.prototype.setSession = function (req, res, session, uat, iat, exp, cookieOptions, isNewSession) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, sessionName, genId, cookieSetter, cookies, keys, sessionId, cookieValue;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.config.session, sessionName = _a.name, genId = _a.genId;
                        cookieSetter = new this.Cookies();
                        cookies = cookieSetter.getAll(req);
                        return [4 /*yield*/, this.getKeys()];
                    case 1:
                        keys = _b.sent();
                        return [4 /*yield*/, (0, signed_cookies_1.getCookieValue)(sessionName, cookies[sessionName], keys)];
                    case 2:
                        sessionId = _b.sent();
                        if (!(sessionId && isNewSession)) return [3 /*break*/, 4];
                        debug('regenerating session id %o to prevent session fixation', sessionId);
                        return [4 /*yield*/, this.store.delete(sessionId)];
                    case 3:
                        _b.sent();
                        sessionId = undefined;
                        _b.label = 4;
                    case 4:
                        if (!!sessionId) return [3 /*break*/, 6];
                        return [4 /*yield*/, genId(req, session)];
                    case 5:
                        sessionId = _b.sent();
                        debug('generated new session id %o', sessionId);
                        _b.label = 6;
                    case 6:
                        debug('set session %o', sessionId);
                        return [4 /*yield*/, (0, signed_cookies_1.generateCookieValue)(sessionName, sessionId, keys[0])];
                    case 7:
                        cookieValue = _b.sent();
                        cookieSetter.set(sessionName, cookieValue, cookieOptions);
                        cookieSetter.commit(res);
                        return [4 /*yield*/, this.store.set(sessionId, {
                                header: { iat: iat, uat: uat, exp: exp },
                                data: session
                            })];
                    case 8:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    StatefulSession.prototype.deleteSession = function (req, res, cookieOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sessionName, cookieSetter, cookies, keys, sessionId;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sessionName = this.config.session.name;
                        cookieSetter = new this.Cookies();
                        cookies = cookieSetter.getAll(req);
                        return [4 /*yield*/, this.getKeys()];
                    case 1:
                        keys = _a.sent();
                        return [4 /*yield*/, (0, signed_cookies_1.getCookieValue)(sessionName, cookies[sessionName], keys)];
                    case 2:
                        sessionId = _a.sent();
                        if (!sessionId) return [3 /*break*/, 4];
                        debug('deleting session %o', sessionId);
                        cookieSetter.clear(sessionName, cookieOptions);
                        cookieSetter.commit(res);
                        return [4 /*yield*/, this.store.delete(sessionId)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return StatefulSession;
}(abstract_session_1.AbstractSession));
exports.StatefulSession = StatefulSession;
//# sourceMappingURL=stateful-session.js.map