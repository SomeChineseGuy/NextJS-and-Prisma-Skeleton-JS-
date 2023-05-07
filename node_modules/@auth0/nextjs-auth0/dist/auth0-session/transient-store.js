"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var openid_client_1 = require("openid-client");
var signed_cookies_1 = require("./utils/signed-cookies");
var hkdf_1 = require("./utils/hkdf");
var cookies_1 = tslib_1.__importDefault(require("./utils/cookies"));
var TransientStore = /** @class */ (function () {
    function TransientStore(config) {
        this.config = config;
    }
    TransientStore.prototype.getKeys = function () {
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
    /**
     * Set a cookie with a value or a generated nonce.
     *
     * @param {String} key Cookie name to use.
     * @param {IncomingMessage} _req Server Request object.
     * @param {ServerResponse} res Server Response object.
     * @param {Object} opts Options object.
     * @param {String} opts.sameSite SameSite attribute of `None`, `Lax`, or `Strict`. Defaults to `None`.
     * @param {String} opts.value Cookie value. Omit this key to store a generated value.
     *
     * @return {String} Cookie value that was set.
     */
    TransientStore.prototype.save = function (key, _req, res, _a) {
        var _b = _a.sameSite, sameSite = _b === void 0 ? 'none' : _b, _c = _a.value, value = _c === void 0 ? this.generateNonce() : _c;
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var isSameSiteNone, _d, domain, path, secure, basicAttr, _e, signingKey, cookieSetter, cookieValue, cookieValue;
            return tslib_1.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        isSameSiteNone = sameSite === 'none';
                        _d = this.config.session.cookie, domain = _d.domain, path = _d.path, secure = _d.secure;
                        basicAttr = {
                            httpOnly: true,
                            secure: secure,
                            domain: domain,
                            path: path
                        };
                        return [4 /*yield*/, this.getKeys()];
                    case 1:
                        _e = tslib_1.__read.apply(void 0, [_f.sent(), 1]), signingKey = _e[0];
                        cookieSetter = new cookies_1.default();
                        return [4 /*yield*/, (0, signed_cookies_1.generateCookieValue)(key, value, signingKey)];
                    case 2:
                        cookieValue = _f.sent();
                        // Set the cookie with the SameSite attribute and, if needed, the Secure flag.
                        cookieSetter.set(key, cookieValue, tslib_1.__assign(tslib_1.__assign({}, basicAttr), { sameSite: sameSite, secure: isSameSiteNone ? true : basicAttr.secure }));
                        if (!(isSameSiteNone && this.config.legacySameSiteCookie)) return [3 /*break*/, 4];
                        return [4 /*yield*/, (0, signed_cookies_1.generateCookieValue)("_".concat(key), value, signingKey)];
                    case 3:
                        cookieValue = _f.sent();
                        // Set the fallback cookie with no SameSite or Secure attributes.
                        cookieSetter.set("_".concat(key), cookieValue, basicAttr);
                        _f.label = 4;
                    case 4:
                        cookieSetter.commit(res);
                        return [2 /*return*/, value];
                }
            });
        });
    };
    /**
     * Get a cookie value then delete it.
     *
     * @param {String} key Cookie name to use.
     * @param {IncomingMessage} req Express Request object.
     * @param {ServerResponse} res Express Response object.
     *
     * @return {String|undefined} Cookie value or undefined if cookie was not found.
     */
    TransientStore.prototype.read = function (key, req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var cookies, cookie, cookieConfig, cookieSetter, verifyingKeys, value, fallbackKey, fallbackCookie;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        cookies = new cookies_1.default().getAll(req);
                        cookie = cookies[key];
                        cookieConfig = this.config.session.cookie;
                        cookieSetter = new cookies_1.default();
                        return [4 /*yield*/, this.getKeys()];
                    case 1:
                        verifyingKeys = _a.sent();
                        return [4 /*yield*/, (0, signed_cookies_1.getCookieValue)(key, cookie, verifyingKeys)];
                    case 2:
                        value = _a.sent();
                        cookieSetter.clear(key, cookieConfig);
                        if (!this.config.legacySameSiteCookie) return [3 /*break*/, 5];
                        fallbackKey = "_".concat(key);
                        if (!!value) return [3 /*break*/, 4];
                        fallbackCookie = cookies[fallbackKey];
                        return [4 /*yield*/, (0, signed_cookies_1.getCookieValue)(fallbackKey, fallbackCookie, verifyingKeys)];
                    case 3:
                        value = _a.sent();
                        _a.label = 4;
                    case 4:
                        cookieSetter.clear(fallbackKey, cookieConfig);
                        _a.label = 5;
                    case 5:
                        cookieSetter.commit(res);
                        return [2 /*return*/, value];
                }
            });
        });
    };
    /**
     * Generates a `nonce` value.
     *
     * @return {String}
     */
    TransientStore.prototype.generateNonce = function () {
        return openid_client_1.generators.nonce();
    };
    /**
     * Generates a `code_verifier` value.
     *
     * @return {String}
     */
    TransientStore.prototype.generateCodeVerifier = function () {
        return openid_client_1.generators.codeVerifier();
    };
    /**
     * Calculates a `code_challenge` value for a given `codeVerifier`.
     *
     * @param {String} codeVerifier Code verifier to calculate the `code_challenge` value from.
     * @return {String}
     */
    TransientStore.prototype.calculateCodeChallenge = function (codeVerifier) {
        return openid_client_1.generators.codeChallenge(codeVerifier);
    };
    return TransientStore;
}());
exports.default = TransientStore;
//# sourceMappingURL=transient-store.js.map