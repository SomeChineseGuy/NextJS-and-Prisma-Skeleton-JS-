"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withMiddlewareAuthRequired = exports.getSession = exports.initAuth0 = void 0;
var tslib_1 = require("tslib");
var stateless_session_1 = require("./auth0-session/session/stateless-session");
var stateful_session_1 = require("./auth0-session/session/stateful-session");
var middleware_cookies_1 = tslib_1.__importDefault(require("./utils/middleware-cookies"));
var cache_1 = tslib_1.__importDefault(require("./session/cache"));
var with_middleware_auth_required_1 = tslib_1.__importDefault(require("./helpers/with-middleware-auth-required"));
var config_1 = require("./config");
var instance_check_1 = require("./utils/instance-check");
var instance;
var genId = function () {
    var bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    return Array.from(bytes)
        .map(function (b) { return b.toString(16).padStart(2, '0'); })
        .join('');
};
function getInstance(params) {
    (0, instance_check_1.setIsUsingNamedExports)();
    if (instance) {
        return instance;
    }
    instance = _initAuth0(params);
    return instance;
}
var initAuth0 = function (params) {
    (0, instance_check_1.setIsUsingOwnInstance)();
    return _initAuth0(params);
};
exports.initAuth0 = initAuth0;
var _initAuth0 = function (params) {
    var _a = (0, config_1.getConfig)(tslib_1.__assign(tslib_1.__assign({}, params), { session: tslib_1.__assign({ genId: genId }, params === null || params === void 0 ? void 0 : params.session) })), baseConfig = _a.baseConfig, nextConfig = _a.nextConfig;
    // Init base layer (with base config)
    var sessionStore = baseConfig.session.store
        ? new stateful_session_1.StatefulSession(baseConfig, middleware_cookies_1.default)
        : new stateless_session_1.StatelessSession(baseConfig, middleware_cookies_1.default);
    var sessionCache = new cache_1.default(baseConfig, sessionStore);
    // Init Next layer (with next config)
    var getSession = function (req, res) { return sessionCache.get(req, res); };
    var withMiddlewareAuthRequired = (0, with_middleware_auth_required_1.default)(nextConfig.routes, function () { return sessionCache; });
    return {
        getSession: getSession,
        withMiddlewareAuthRequired: withMiddlewareAuthRequired
    };
};
var getSession = function () {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return (_a = getInstance()).getSession.apply(_a, tslib_1.__spreadArray([], tslib_1.__read(args), false));
};
exports.getSession = getSession;
var withMiddlewareAuthRequired = function (middleware) {
    return getInstance().withMiddlewareAuthRequired(middleware);
};
exports.withMiddlewareAuthRequired = withMiddlewareAuthRequired;
//# sourceMappingURL=edge.js.map