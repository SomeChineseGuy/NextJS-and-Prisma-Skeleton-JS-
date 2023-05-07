"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatelessSession = void 0;
var tslib_1 = require("tslib");
var jose = tslib_1.__importStar(require("jose"));
var cookie_1 = require("cookie");
var debug_1 = tslib_1.__importDefault(require("../utils/debug"));
var hkdf_1 = require("../utils/hkdf");
var abstract_session_1 = require("./abstract-session");
var debug = (0, debug_1.default)('stateless-session');
var MAX_COOKIE_SIZE = 4096;
var alg = 'dir';
var enc = 'A256GCM';
var notNull = function (value) { return value !== null; };
var StatelessSession = /** @class */ (function (_super) {
    tslib_1.__extends(StatelessSession, _super);
    function StatelessSession(config, Cookies) {
        var _this = _super.call(this, config, Cookies) || this;
        _this.config = config;
        _this.Cookies = Cookies;
        var _a = _this.config.session, _b = _a.cookie, transient = _b.transient, cookieConfig = tslib_1.__rest(_b, ["transient"]), sessionName = _a.name;
        var cookieOptions = tslib_1.__assign({}, cookieConfig);
        if (!transient) {
            cookieOptions.expires = new Date();
        }
        var emptyCookie = (0, cookie_1.serialize)("".concat(sessionName, ".0"), '', cookieOptions);
        _this.chunkSize = MAX_COOKIE_SIZE - emptyCookie.length;
        return _this;
    }
    StatelessSession.prototype.getKeys = function () {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var secret, secrets, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.keys) return [3 /*break*/, 2];
                        secret = this.config.secret;
                        secrets = Array.isArray(secret) ? secret : [secret];
                        _a = this;
                        return [4 /*yield*/, Promise.all(secrets.map(hkdf_1.encryption))];
                    case 1:
                        _a.keys = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, this.keys];
                }
            });
        });
    };
    StatelessSession.prototype.encrypt = function (payload, _a) {
        var iat = _a.iat, uat = _a.uat, exp = _a.exp;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _b, key;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getKeys()];
                    case 1:
                        _b = tslib_1.__read.apply(void 0, [_c.sent(), 1]), key = _b[0];
                        return [4 /*yield*/, new jose.EncryptJWT(tslib_1.__assign({}, payload)).setProtectedHeader({ alg: alg, enc: enc, uat: uat, iat: iat, exp: exp }).encrypt(key)];
                    case 2: return [2 /*return*/, _c.sent()];
                }
            });
        });
    };
    StatelessSession.prototype.decrypt = function (jwe) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var keys, err, keys_1, keys_1_1, key, e_1, e_2_1;
            var e_2, _a;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getKeys()];
                    case 1:
                        keys = _b.sent();
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 9, 10, 11]);
                        keys_1 = tslib_1.__values(keys), keys_1_1 = keys_1.next();
                        _b.label = 3;
                    case 3:
                        if (!!keys_1_1.done) return [3 /*break*/, 8];
                        key = keys_1_1.value;
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        return [4 /*yield*/, jose.jwtDecrypt(jwe, key)];
                    case 5: return [2 /*return*/, _b.sent()];
                    case 6:
                        e_1 = _b.sent();
                        err = e_1;
                        return [3 /*break*/, 7];
                    case 7:
                        keys_1_1 = keys_1.next();
                        return [3 /*break*/, 3];
                    case 8: return [3 /*break*/, 11];
                    case 9:
                        e_2_1 = _b.sent();
                        e_2 = { error: e_2_1 };
                        return [3 /*break*/, 11];
                    case 10:
                        try {
                            if (keys_1_1 && !keys_1_1.done && (_a = keys_1.return)) _a.call(keys_1);
                        }
                        finally { if (e_2) throw e_2.error; }
                        return [7 /*endfinally*/];
                    case 11: throw err;
                }
            });
        });
    };
    StatelessSession.prototype.getSession = function (req) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sessionName, cookies, existingSessionValue, _a, protectedHeader, payload;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sessionName = this.config.session.name;
                        cookies = new this.Cookies().getAll(req);
                        if (sessionName in cookies) {
                            // get JWE from unchunked session cookie
                            debug('reading session from %s cookie', sessionName);
                            existingSessionValue = cookies[sessionName];
                        }
                        else if ("".concat(sessionName, ".0") in cookies) {
                            // get JWE from chunked session cookie
                            // iterate all cookie names
                            // match and filter for the ones that match sessionName.<number>
                            // sort by chunk index
                            // concat
                            existingSessionValue = Object.entries(cookies)
                                .map(function (_a) {
                                var _b = tslib_1.__read(_a, 2), cookie = _b[0], value = _b[1];
                                var match = cookie.match("^".concat(sessionName, "\\.(\\d+)$"));
                                if (match) {
                                    return [match[1], value];
                                }
                                return null;
                            })
                                .filter(notNull)
                                .sort(function (_a, _b) {
                                var _c = tslib_1.__read(_a, 1), a = _c[0];
                                var _d = tslib_1.__read(_b, 1), b = _d[0];
                                return parseInt(a, 10) - parseInt(b, 10);
                            })
                                .map(function (_a) {
                                var _b = tslib_1.__read(_a, 2), i = _b[0], chunk = _b[1];
                                debug('reading session chunk from %s.%d cookie', sessionName, i);
                                return chunk;
                            })
                                .join('');
                        }
                        if (!existingSessionValue) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.decrypt(existingSessionValue)];
                    case 1:
                        _a = _b.sent(), protectedHeader = _a.protectedHeader, payload = _a.payload;
                        return [2 /*return*/, { header: protectedHeader, data: payload }];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    StatelessSession.prototype.setSession = function (req, res, session, uat, iat, exp, cookieOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sessionName, cookieSetter, cookies, value, chunkCount, i, chunkValue, chunkCookieName, _a, _b, cookieName;
            var e_3, _c;
            return tslib_1.__generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        sessionName = this.config.session.name;
                        cookieSetter = new this.Cookies();
                        cookies = cookieSetter.getAll(req);
                        debug('found session, creating signed session cookie(s) with name %o(.i)', sessionName);
                        return [4 /*yield*/, this.encrypt(session, { iat: iat, uat: uat, exp: exp })];
                    case 1:
                        value = _d.sent();
                        chunkCount = Math.ceil(value.length / this.chunkSize);
                        if (chunkCount > 1) {
                            debug('cookie size greater than %d, chunking', this.chunkSize);
                            for (i = 0; i < chunkCount; i++) {
                                chunkValue = value.slice(i * this.chunkSize, (i + 1) * this.chunkSize);
                                chunkCookieName = "".concat(sessionName, ".").concat(i);
                                cookieSetter.set(chunkCookieName, chunkValue, cookieOptions);
                            }
                            if (sessionName in cookies) {
                                cookieSetter.clear(sessionName, cookieOptions);
                            }
                        }
                        else {
                            cookieSetter.set(sessionName, value, cookieOptions);
                            try {
                                for (_a = tslib_1.__values(Object.keys(cookies)), _b = _a.next(); !_b.done; _b = _a.next()) {
                                    cookieName = _b.value;
                                    if (cookieName.match("^".concat(sessionName, "\\.\\d$"))) {
                                        cookieSetter.clear(cookieName, cookieOptions);
                                    }
                                }
                            }
                            catch (e_3_1) { e_3 = { error: e_3_1 }; }
                            finally {
                                try {
                                    if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                                }
                                finally { if (e_3) throw e_3.error; }
                            }
                        }
                        cookieSetter.commit(res, this.config.session.name);
                        return [2 /*return*/];
                }
            });
        });
    };
    StatelessSession.prototype.deleteSession = function (req, res, cookieOptions) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var sessionName, cookieSetter, cookies, _a, _b, cookieName;
            var e_4, _c;
            return tslib_1.__generator(this, function (_d) {
                sessionName = this.config.session.name;
                cookieSetter = new this.Cookies();
                cookies = cookieSetter.getAll(req);
                try {
                    for (_a = tslib_1.__values(Object.keys(cookies)), _b = _a.next(); !_b.done; _b = _a.next()) {
                        cookieName = _b.value;
                        if (cookieName.match("^".concat(sessionName, "(?:\\.\\d)?$"))) {
                            cookieSetter.clear(cookieName, cookieOptions);
                            cookieSetter.commit(res, this.config.session.name);
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
                return [2 /*return*/];
            });
        });
    };
    return StatelessSession;
}(abstract_session_1.AbstractSession));
exports.StatelessSession = StatelessSession;
//# sourceMappingURL=stateless-session.js.map