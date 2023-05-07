"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var session_1 = require("./session");
var SessionCache = /** @class */ (function () {
    function SessionCache(config, sessionStore) {
        this.config = config;
        this.sessionStore = sessionStore;
        this.cache = new WeakMap();
        this.iatCache = new WeakMap();
    }
    SessionCache.prototype.init = function (req, res, autoSave) {
        if (autoSave === void 0) { autoSave = true; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, json, iat;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.cache.has(req)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.sessionStore.read(req)];
                    case 1:
                        _a = tslib_1.__read.apply(void 0, [_b.sent(), 2]), json = _a[0], iat = _a[1];
                        this.iatCache.set(req, iat);
                        this.cache.set(req, (0, session_1.fromJson)(json));
                        if (!(this.config.session.rolling && this.config.session.autoSave && autoSave)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.save(req, res)];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SessionCache.prototype.save = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sessionStore.save(req, res, this.cache.get(req), this.iatCache.get(req))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SessionCache.prototype.create = function (req, res, session) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.cache.set(req, session);
                        return [4 /*yield*/, this.save(req, res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SessionCache.prototype.delete = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.init(req, res, false)];
                    case 1:
                        _a.sent();
                        this.cache.set(req, null);
                        return [4 /*yield*/, this.save(req, res)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SessionCache.prototype.isAuthenticated = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var session;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.init(req, res)];
                    case 1:
                        _a.sent();
                        session = this.cache.get(req);
                        return [2 /*return*/, !!(session === null || session === void 0 ? void 0 : session.user)];
                }
            });
        });
    };
    SessionCache.prototype.getIdToken = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var session;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.init(req, res)];
                    case 1:
                        _a.sent();
                        session = this.cache.get(req);
                        return [2 /*return*/, session === null || session === void 0 ? void 0 : session.idToken];
                }
            });
        });
    };
    SessionCache.prototype.set = function (req, res, session) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.init(req, res, false)];
                    case 1:
                        _a.sent();
                        this.cache.set(req, session);
                        return [4 /*yield*/, this.save(req, res)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SessionCache.prototype.get = function (req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.init(req, res)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.cache.get(req)];
                }
            });
        });
    };
    SessionCache.prototype.fromTokenSet = function (tokenSet) {
        return (0, session_1.fromTokenSet)(tokenSet, this.config);
    };
    return SessionCache;
}());
exports.default = SessionCache;
//# sourceMappingURL=cache.js.map