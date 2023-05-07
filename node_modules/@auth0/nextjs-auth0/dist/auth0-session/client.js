"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var openid_client_1 = require("openid-client");
var url_1 = tslib_1.__importDefault(require("url"));
var url_join_1 = tslib_1.__importDefault(require("url-join"));
var debug_1 = tslib_1.__importDefault(require("./utils/debug"));
var errors_1 = require("./utils/errors");
var jose_1 = require("jose");
var crypto_1 = require("crypto");
var debug = (0, debug_1.default)('client');
function sortSpaceDelimitedString(str) {
    return str.split(' ').sort().join(' ');
}
function get(config, _a) {
    var _this = this;
    var name = _a.name, version = _a.version;
    var client = null;
    return function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var issuer, e_1, issuerTokenAlgs, configRespType, issuerRespTypes, configRespMode, issuerRespModes, jwks, privateKey, jwk;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (client) {
                        return [2 /*return*/, client];
                    }
                    openid_client_1.custom.setHttpOptionsDefaults({
                        headers: tslib_1.__assign({ 'User-Agent': "".concat(name, "/").concat(version) }, (config.enableTelemetry
                            ? {
                                'Auth0-Client': Buffer.from(JSON.stringify({
                                    name: name,
                                    version: version,
                                    env: {
                                        node: process.version
                                    }
                                })).toString('base64')
                            }
                            : undefined)),
                        timeout: config.httpTimeout
                    });
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, openid_client_1.Issuer.discover(config.issuerBaseURL)];
                case 2:
                    issuer = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    e_1 = _a.sent();
                    throw new errors_1.DiscoveryError(e_1, config.issuerBaseURL);
                case 4:
                    issuerTokenAlgs = Array.isArray(issuer.id_token_signing_alg_values_supported)
                        ? issuer.id_token_signing_alg_values_supported
                        : [];
                    if (!issuerTokenAlgs.includes(config.idTokenSigningAlg)) {
                        debug('ID token algorithm %o is not supported by the issuer. Supported ID token algorithms are: %o.', config.idTokenSigningAlg, issuerTokenAlgs);
                    }
                    configRespType = sortSpaceDelimitedString(config.authorizationParams.response_type);
                    issuerRespTypes = Array.isArray(issuer.response_types_supported) ? issuer.response_types_supported : [];
                    issuerRespTypes.map(sortSpaceDelimitedString);
                    if (!issuerRespTypes.includes(configRespType)) {
                        debug('Response type %o is not supported by the issuer. Supported response types are: %o.', configRespType, issuerRespTypes);
                    }
                    configRespMode = config.authorizationParams.response_mode;
                    issuerRespModes = Array.isArray(issuer.response_modes_supported) ? issuer.response_modes_supported : [];
                    if (configRespMode && !issuerRespModes.includes(configRespMode)) {
                        debug('Response mode %o is not supported by the issuer. Supported response modes are %o.', configRespMode, issuerRespModes);
                    }
                    if (!config.clientAssertionSigningKey) return [3 /*break*/, 6];
                    privateKey = (0, crypto_1.createPrivateKey)({ key: config.clientAssertionSigningKey });
                    return [4 /*yield*/, (0, jose_1.exportJWK)(privateKey)];
                case 5:
                    jwk = _a.sent();
                    jwks = { keys: [jwk] };
                    _a.label = 6;
                case 6:
                    client = new issuer.Client({
                        client_id: config.clientID,
                        client_secret: config.clientSecret,
                        id_token_signed_response_alg: config.idTokenSigningAlg,
                        token_endpoint_auth_method: config.clientAuthMethod,
                        token_endpoint_auth_signing_alg: config.clientAssertionSigningAlg
                    }, jwks);
                    client[openid_client_1.custom.clock_tolerance] = config.clockTolerance;
                    if (config.idpLogout) {
                        if (config.auth0Logout ||
                            (url_1.default.parse(issuer.metadata.issuer).hostname.match('\\.auth0\\.com$') &&
                                config.auth0Logout !== false)) {
                            Object.defineProperty(client, 'endSessionUrl', {
                                value: function (params) {
                                    var id_token_hint = params.id_token_hint, post_logout_redirect_uri = params.post_logout_redirect_uri, extraParams = tslib_1.__rest(params, ["id_token_hint", "post_logout_redirect_uri"]);
                                    var parsedUrl = url_1.default.parse((0, url_join_1.default)(issuer.metadata.issuer, '/v2/logout'));
                                    parsedUrl.query = tslib_1.__assign(tslib_1.__assign({}, extraParams), { returnTo: post_logout_redirect_uri, client_id: config.clientID });
                                    Object.entries(parsedUrl.query).forEach(function (_a) {
                                        var _b = tslib_1.__read(_a, 2), key = _b[0], value = _b[1];
                                        if (value === null || value === undefined) {
                                            delete parsedUrl.query[key];
                                        }
                                    });
                                    return url_1.default.format(parsedUrl);
                                }
                            });
                        }
                        else if (!issuer.end_session_endpoint) {
                            debug('the issuer does not support RP-Initiated Logout');
                        }
                    }
                    return [2 /*return*/, client];
            }
        });
    }); };
}
exports.default = get;
//# sourceMappingURL=client.js.map