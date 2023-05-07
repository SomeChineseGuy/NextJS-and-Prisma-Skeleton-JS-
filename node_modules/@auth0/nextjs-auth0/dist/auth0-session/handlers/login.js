"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var url_join_1 = tslib_1.__importDefault(require("url-join"));
var assert_1 = require("assert");
var encoding_1 = require("../utils/encoding");
var debug_1 = tslib_1.__importDefault(require("../utils/debug"));
var errors_1 = require("../utils/errors");
var debug = (0, debug_1.default)('handlers');
function getRedirectUri(config) {
    return (0, url_join_1.default)(config.baseURL, config.routes.callback);
}
function loginHandlerFactory(config, getClient, transientHandler) {
    var _this = this;
    return function (req, res, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var client, returnTo, opts, transientOpts, stateValue, responseType, usePKCE, authParams, _a, _b, _c, _d, _e, validResponseTypes, authorizationUrl;
            var _f, _g;
            return tslib_1.__generator(this, function (_h) {
                switch (_h.label) {
                    case 0: return [4 /*yield*/, getClient()];
                    case 1:
                        client = _h.sent();
                        returnTo = options.returnTo || config.baseURL;
                        opts = tslib_1.__assign({ returnTo: returnTo, getLoginState: config.getLoginState }, options);
                        // Ensure a redirect_uri, merge in configuration options, then passed-in options.
                        opts.authorizationParams = tslib_1.__assign(tslib_1.__assign({ redirect_uri: getRedirectUri(config) }, config.authorizationParams), (opts.authorizationParams || {}));
                        transientOpts = {
                            sameSite: opts.authorizationParams.response_mode === 'form_post' ? 'none' : config.session.cookie.sameSite
                        };
                        return [4 /*yield*/, opts.getLoginState(req, opts)];
                    case 2:
                        stateValue = _h.sent();
                        if (typeof stateValue !== 'object') {
                            throw new Error('Custom state value must be an object.');
                        }
                        stateValue.nonce = transientHandler.generateNonce();
                        stateValue.returnTo = stateValue.returnTo || opts.returnTo;
                        responseType = opts.authorizationParams.response_type;
                        usePKCE = responseType.includes('code');
                        if (usePKCE) {
                            debug('response_type includes code, the authorization request will use PKCE');
                            stateValue.code_verifier = transientHandler.generateCodeVerifier();
                        }
                        if (!(responseType !== config.authorizationParams.response_type)) return [3 /*break*/, 4];
                        return [4 /*yield*/, transientHandler.save('response_type', req, res, tslib_1.__assign(tslib_1.__assign({}, transientOpts), { value: responseType }))];
                    case 3:
                        _h.sent();
                        _h.label = 4;
                    case 4:
                        _a = [tslib_1.__assign({}, opts.authorizationParams)];
                        _f = {};
                        return [4 /*yield*/, transientHandler.save('nonce', req, res, transientOpts)];
                    case 5:
                        _f.nonce = _h.sent();
                        return [4 /*yield*/, transientHandler.save('state', req, res, tslib_1.__assign(tslib_1.__assign({}, transientOpts), { value: (0, encoding_1.encodeState)(stateValue) }))];
                    case 6:
                        _b = [tslib_1.__assign.apply(void 0, _a.concat([(_f.state = _h.sent(), _f)]))];
                        if (!usePKCE) return [3 /*break*/, 8];
                        _g = {};
                        _e = (_d = transientHandler).calculateCodeChallenge;
                        return [4 /*yield*/, transientHandler.save('code_verifier', req, res, transientOpts)];
                    case 7:
                        _c = (_g.code_challenge = _e.apply(_d, [_h.sent()]),
                            _g.code_challenge_method = 'S256',
                            _g);
                        return [3 /*break*/, 9];
                    case 8:
                        _c = undefined;
                        _h.label = 9;
                    case 9:
                        authParams = tslib_1.__assign.apply(void 0, _b.concat([(_c)]));
                        validResponseTypes = ['id_token', 'code id_token', 'code'];
                        (0, assert_1.strict)(validResponseTypes.includes(authParams.response_type), "response_type should be one of ".concat(validResponseTypes.join(', ')));
                        (0, assert_1.strict)(/\bopenid\b/.test(authParams.scope), 'scope should contain "openid"');
                        if (!authParams.max_age) return [3 /*break*/, 11];
                        return [4 /*yield*/, transientHandler.save('max_age', req, res, tslib_1.__assign(tslib_1.__assign({}, transientOpts), { value: authParams.max_age.toString() }))];
                    case 10:
                        _h.sent();
                        _h.label = 11;
                    case 11:
                        authorizationUrl = client.authorizationUrl(authParams);
                        debug('redirecting to %s', authorizationUrl);
                        res.writeHead(302, {
                            Location: authorizationUrl
                        });
                        res.end((0, errors_1.htmlSafe)(authorizationUrl));
                        return [2 /*return*/];
                }
            });
        });
    };
}
exports.default = loginHandlerFactory;
//# sourceMappingURL=login.js.map