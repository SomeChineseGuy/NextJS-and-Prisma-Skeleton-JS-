"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractSession = void 0;
var tslib_1 = require("tslib");
var debug_1 = tslib_1.__importDefault(require("../utils/debug"));
var debug = (0, debug_1.default)('session');
var epoch = function () { return (Date.now() / 1000) | 0; }; // eslint-disable-line no-bitwise
var assert = function (bool, msg) {
    if (!bool) {
        throw new Error(msg);
    }
};
var AbstractSession = /** @class */ (function () {
    function AbstractSession(config, Cookies) {
        this.config = config;
        this.Cookies = Cookies;
    }
    AbstractSession.prototype.read = function (req) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, rollingDuration, absoluteDuration, existingSessionValue, header, data, iat, uat, exp, err_1;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.config.session, rollingDuration = _a.rollingDuration, absoluteDuration = _a.absoluteDuration;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.getSession(req)];
                    case 2:
                        existingSessionValue = _b.sent();
                        if (existingSessionValue) {
                            header = existingSessionValue.header, data = existingSessionValue.data;
                            iat = header.iat, uat = header.uat, exp = header.exp;
                            // check that the existing session isn't expired based on options when it was established
                            assert(exp > epoch(), 'it is expired based on options when it was established');
                            // check that the existing session isn't expired based on current rollingDuration rules
                            if (rollingDuration) {
                                assert(uat + rollingDuration > epoch(), 'it is expired based on current rollingDuration rules');
                            }
                            // check that the existing session isn't expired based on current absoluteDuration rules
                            if (typeof absoluteDuration === 'number') {
                                assert(iat + absoluteDuration > epoch(), 'it is expired based on current absoluteDuration rules');
                            }
                            return [2 /*return*/, [data, iat]];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _b.sent();
                        debug('error handling session %O', err_1);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, []];
                }
            });
        });
    };
    AbstractSession.prototype.save = function (req, res, session, createdAt) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, transient, cookieConfig, isNewSession, uat, iat, exp, cookieOptions;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.config.session.cookie, transient = _a.transient, cookieConfig = tslib_1.__rest(_a, ["transient"]);
                        if (!!session) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.deleteSession(req, res, cookieConfig)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/];
                    case 2:
                        isNewSession = typeof createdAt === 'undefined';
                        uat = epoch();
                        iat = typeof createdAt === 'number' ? createdAt : uat;
                        exp = this.calculateExp(iat, uat);
                        cookieOptions = tslib_1.__assign({}, cookieConfig);
                        if (!transient) {
                            cookieOptions.expires = new Date(exp * 1000);
                        }
                        return [4 /*yield*/, this.setSession(req, res, session, uat, iat, exp, cookieOptions, isNewSession)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AbstractSession.prototype.calculateExp = function (iat, uat) {
        var absoluteDuration = this.config.session.absoluteDuration;
        var _a = this.config.session, rolling = _a.rolling, rollingDuration = _a.rollingDuration;
        if (typeof absoluteDuration !== 'number') {
            return uat + rollingDuration;
        }
        if (!rolling) {
            return iat + absoluteDuration;
        }
        return Math.min(uat + rollingDuration, iat + absoluteDuration);
    };
    return AbstractSession;
}());
exports.AbstractSession = AbstractSession;
//# sourceMappingURL=abstract-session.js.map