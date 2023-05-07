"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSessionCookie = void 0;
var tslib_1 = require("tslib");
var auth0_session_1 = require("../auth0-session");
var generateSessionCookie = function (session, config) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var weekInSeconds, secret, _a, absoluteDuration, cookie, cookieStoreConfig, cookieStore, epoch;
    return tslib_1.__generator(this, function (_b) {
        weekInSeconds = 7 * 24 * 60 * 60;
        secret = config.secret, _a = config.duration, absoluteDuration = _a === void 0 ? weekInSeconds : _a, cookie = tslib_1.__rest(config, ["secret", "duration"]);
        cookieStoreConfig = { secret: secret, session: { absoluteDuration: absoluteDuration, cookie: cookie } };
        cookieStore = new auth0_session_1.StatelessSession(cookieStoreConfig, auth0_session_1.NodeCookies);
        epoch = (Date.now() / 1000) | 0;
        return [2 /*return*/, cookieStore.encrypt(session, { iat: epoch, uat: epoch, exp: epoch + absoluteDuration })];
    });
}); };
exports.generateSessionCookie = generateSessionCookie;
//# sourceMappingURL=testing.js.map