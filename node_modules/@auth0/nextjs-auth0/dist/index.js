"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = exports.SessionCache = exports.ApplicationError = exports.IdentityProviderError = exports.MissingStateParamError = exports.MissingStateCookieError = exports.ProfileHandlerError = exports.LogoutHandlerError = exports.LoginHandlerError = exports.CallbackHandlerError = exports.HandlerError = exports.AccessTokenError = exports.AccessTokenErrorCode = exports.AuthError = exports.handleAuth = exports.handleProfile = exports.handleCallback = exports.handleLogout = exports.handleLogin = exports.withPageAuthRequired = exports.withApiAuthRequired = exports.getAccessToken = exports.updateSession = exports.getSession = exports._initAuth = exports.initAuth0 = void 0;
var tslib_1 = require("tslib");
var crypto_1 = tslib_1.__importDefault(require("crypto"));
var auth0_session_1 = require("./auth0-session");
var handlers_1 = require("./handlers");
var session_1 = require("./session/");
Object.defineProperty(exports, "SessionCache", { enumerable: true, get: function () { return session_1.SessionCache; } });
Object.defineProperty(exports, "Session", { enumerable: true, get: function () { return session_1.Session; } });
var helpers_1 = require("./helpers");
var version_1 = tslib_1.__importDefault(require("./version"));
var config_1 = require("./config");
var instance_check_1 = require("./utils/instance-check");
var instance;
var genId = function () { return crypto_1.default.randomBytes(16).toString('hex'); };
// For using managed instance with named exports.
function getInstance() {
    (0, instance_check_1.setIsUsingNamedExports)();
    if (instance) {
        return instance;
    }
    instance = (0, exports._initAuth)();
    return instance;
}
// For creating own instance.
var initAuth0 = function (params) {
    (0, instance_check_1.setIsUsingOwnInstance)();
    var _a = (0, exports._initAuth)(params), sessionCache = _a.sessionCache, publicApi = tslib_1.__rest(_a, ["sessionCache"]); // eslint-disable-line @typescript-eslint/no-unused-vars
    return publicApi;
};
exports.initAuth0 = initAuth0;
var _initAuth = function (params) {
    var _a = (0, config_1.getConfig)(tslib_1.__assign(tslib_1.__assign({}, params), { session: tslib_1.__assign({ genId: genId }, params === null || params === void 0 ? void 0 : params.session) })), baseConfig = _a.baseConfig, nextConfig = _a.nextConfig;
    // Init base layer (with base config)
    var getClient = (0, auth0_session_1.clientFactory)(baseConfig, { name: 'nextjs-auth0', version: version_1.default });
    var transientStore = new auth0_session_1.TransientStore(baseConfig);
    var sessionStore = baseConfig.session.store
        ? new auth0_session_1.StatefulSession(baseConfig, auth0_session_1.NodeCookies)
        : new auth0_session_1.StatelessSession(baseConfig, auth0_session_1.NodeCookies);
    var sessionCache = new session_1.SessionCache(baseConfig, sessionStore);
    var baseHandleLogin = (0, auth0_session_1.loginHandler)(baseConfig, getClient, transientStore);
    var baseHandleLogout = (0, auth0_session_1.logoutHandler)(baseConfig, getClient, sessionCache);
    var baseHandleCallback = (0, auth0_session_1.callbackHandler)(baseConfig, getClient, sessionCache, transientStore);
    // Init Next layer (with next config)
    var getSession = (0, session_1.sessionFactory)(sessionCache);
    var touchSession = (0, session_1.touchSessionFactory)(sessionCache);
    var updateSession = (0, session_1.updateSessionFactory)(sessionCache);
    var getAccessToken = (0, session_1.accessTokenFactory)(nextConfig, getClient, sessionCache);
    var withApiAuthRequired = (0, helpers_1.withApiAuthRequiredFactory)(sessionCache);
    var withPageAuthRequired = (0, helpers_1.withPageAuthRequiredFactory)(nextConfig.routes.login, function () { return sessionCache; });
    var handleLogin = (0, handlers_1.loginHandler)(baseHandleLogin, nextConfig, baseConfig);
    var handleLogout = (0, handlers_1.logoutHandler)(baseHandleLogout);
    var handleCallback = (0, handlers_1.callbackHandler)(baseHandleCallback, nextConfig);
    var handleProfile = (0, handlers_1.profileHandler)(getClient, getAccessToken, sessionCache);
    var handleAuth = (0, handlers_1.handlerFactory)({ handleLogin: handleLogin, handleLogout: handleLogout, handleCallback: handleCallback, handleProfile: handleProfile });
    return {
        sessionCache: sessionCache,
        getSession: getSession,
        touchSession: touchSession,
        updateSession: updateSession,
        getAccessToken: getAccessToken,
        withApiAuthRequired: withApiAuthRequired,
        withPageAuthRequired: withPageAuthRequired,
        handleLogin: handleLogin,
        handleLogout: handleLogout,
        handleCallback: handleCallback,
        handleProfile: handleProfile,
        handleAuth: handleAuth
    };
};
exports._initAuth = _initAuth;
/* c8 ignore start */
var getSessionCache = function () { return getInstance().sessionCache; };
var getSession = function () {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return (_a = getInstance()).getSession.apply(_a, tslib_1.__spreadArray([], tslib_1.__read(args), false));
};
exports.getSession = getSession;
var updateSession = function () {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return (_a = getInstance()).updateSession.apply(_a, tslib_1.__spreadArray([], tslib_1.__read(args), false));
};
exports.updateSession = updateSession;
var getAccessToken = function () {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return (_a = getInstance()).getAccessToken.apply(_a, tslib_1.__spreadArray([], tslib_1.__read(args), false));
};
exports.getAccessToken = getAccessToken;
var withApiAuthRequired = function () {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return (_a = getInstance()).withApiAuthRequired.apply(_a, tslib_1.__spreadArray([], tslib_1.__read(args), false));
};
exports.withApiAuthRequired = withApiAuthRequired;
exports.withPageAuthRequired = (0, helpers_1.withPageAuthRequiredFactory)((0, config_1.getLoginUrl)(), getSessionCache);
exports.handleLogin = (function () {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return (_a = getInstance()).handleLogin.apply(_a, tslib_1.__spreadArray([], tslib_1.__read(args), false));
});
exports.handleLogout = (function () {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return (_a = getInstance()).handleLogout.apply(_a, tslib_1.__spreadArray([], tslib_1.__read(args), false));
});
exports.handleCallback = (function () {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return (_a = getInstance()).handleCallback.apply(_a, tslib_1.__spreadArray([], tslib_1.__read(args), false));
});
exports.handleProfile = (function () {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return (_a = getInstance()).handleProfile.apply(_a, tslib_1.__spreadArray([], tslib_1.__read(args), false));
});
var handleAuth = function () {
    var _a;
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return (_a = getInstance()).handleAuth.apply(_a, tslib_1.__spreadArray([], tslib_1.__read(args), false));
};
exports.handleAuth = handleAuth;
var errors_1 = require("./utils/errors");
Object.defineProperty(exports, "AuthError", { enumerable: true, get: function () { return errors_1.AuthError; } });
Object.defineProperty(exports, "AccessTokenErrorCode", { enumerable: true, get: function () { return errors_1.AccessTokenErrorCode; } });
Object.defineProperty(exports, "AccessTokenError", { enumerable: true, get: function () { return errors_1.AccessTokenError; } });
Object.defineProperty(exports, "HandlerError", { enumerable: true, get: function () { return errors_1.HandlerError; } });
Object.defineProperty(exports, "CallbackHandlerError", { enumerable: true, get: function () { return errors_1.CallbackHandlerError; } });
Object.defineProperty(exports, "LoginHandlerError", { enumerable: true, get: function () { return errors_1.LoginHandlerError; } });
Object.defineProperty(exports, "LogoutHandlerError", { enumerable: true, get: function () { return errors_1.LogoutHandlerError; } });
Object.defineProperty(exports, "ProfileHandlerError", { enumerable: true, get: function () { return errors_1.ProfileHandlerError; } });
var auth0_session_2 = require("./auth0-session");
Object.defineProperty(exports, "MissingStateCookieError", { enumerable: true, get: function () { return auth0_session_2.MissingStateCookieError; } });
Object.defineProperty(exports, "MissingStateParamError", { enumerable: true, get: function () { return auth0_session_2.MissingStateParamError; } });
Object.defineProperty(exports, "IdentityProviderError", { enumerable: true, get: function () { return auth0_session_2.IdentityProviderError; } });
Object.defineProperty(exports, "ApplicationError", { enumerable: true, get: function () { return auth0_session_2.ApplicationError; } });
/* c8 ignore stop */
//# sourceMappingURL=index.js.map