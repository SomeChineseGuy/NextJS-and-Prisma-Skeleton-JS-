"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUser = exports.UserContext = exports.RequestError = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var use_config_1 = tslib_1.__importDefault(require("./use-config"));
/**
 * The error thrown by the default {@link UserFetcher}.
 *
 * The `status` property contains the status code of the response. It is `0` when the request
 * fails, for example due to being offline.
 *
 * This error is not thrown when the status code of the response is `204`, because that means the
 * user is not authenticated.
 *
 * @category Client
 */
var RequestError = /** @class */ (function (_super) {
    tslib_1.__extends(RequestError, _super);
    function RequestError(status) {
        var _this = 
        /* c8 ignore next */
        _super.call(this) || this;
        _this.status = status;
        Object.setPrototypeOf(_this, RequestError.prototype);
        return _this;
    }
    return RequestError;
}(Error));
exports.RequestError = RequestError;
/**
 * @ignore
 */
var missingUserProvider = 'You forgot to wrap your app in <UserProvider>';
/**
 * @ignore
 */
exports.UserContext = (0, react_1.createContext)({
    get user() {
        throw new Error(missingUserProvider);
    },
    get error() {
        throw new Error(missingUserProvider);
    },
    get isLoading() {
        throw new Error(missingUserProvider);
    },
    checkSession: function () {
        throw new Error(missingUserProvider);
    }
});
/**
 * The `useUser` hook, which will get you the {@link UserProfile} object from the server-side session by fetching it
 * from the {@link HandleProfile} API route.
 *
 * ```js
 * // pages/profile.js
 * import Link from 'next/link';
 * import { useUser } from '@auth0/nextjs-auth0/client';
 *
 * export default function Profile() {
 *   const { user, error, isLoading } = useUser();
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>{error.message}</div>;
 *   if (!user) return <Link href="/api/auth/login"><a>Login</a></Link>;
 *   return <div>Hello {user.name}, <Link href="/api/auth/logout"><a>Logout</a></Link></div>;
 * }
 * ```
 *
 * @category Client
 */
var useUser = function () { return (0, react_1.useContext)(exports.UserContext); };
exports.useUser = useUser;
/**
 * @ignore
 */
var userFetcher = function (url) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var response, _a;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fetch(url)];
            case 1:
                response = _b.sent();
                return [3 /*break*/, 3];
            case 2:
                _a = _b.sent();
                throw new RequestError(0); // Network error
            case 3:
                if (response.status == 204)
                    return [2 /*return*/, undefined];
                if (response.ok)
                    return [2 /*return*/, response.json()];
                throw new RequestError(response.status);
        }
    });
}); };
exports.default = (function (_a) {
    var children = _a.children, initialUser = _a.user, _b = _a.profileUrl, profileUrl = _b === void 0 ? process.env.NEXT_PUBLIC_AUTH0_PROFILE || '/api/auth/me' : _b, loginUrl = _a.loginUrl, _c = _a.fetcher, fetcher = _c === void 0 ? userFetcher : _c;
    var _d = tslib_1.__read((0, react_1.useState)({ user: initialUser, isLoading: !initialUser }), 2), state = _d[0], setState = _d[1];
    var checkSession = (0, react_1.useCallback)(function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var user_1, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, fetcher(profileUrl)];
                case 1:
                    user_1 = _a.sent();
                    setState(function (previous) { return (tslib_1.__assign(tslib_1.__assign({}, previous), { user: user_1, error: undefined })); });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    setState(function (previous) { return (tslib_1.__assign(tslib_1.__assign({}, previous), { error: error_1 })); });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); }, [profileUrl]);
    (0, react_1.useEffect)(function () {
        if (state.user)
            return;
        (function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, checkSession()];
                    case 1:
                        _a.sent();
                        setState(function (previous) { return (tslib_1.__assign(tslib_1.__assign({}, previous), { isLoading: false })); });
                        return [2 /*return*/];
                }
            });
        }); })();
    }, [state.user]);
    var user = state.user, error = state.error, isLoading = state.isLoading;
    var value = (0, react_1.useMemo)(function () { return ({ user: user, error: error, isLoading: isLoading, checkSession: checkSession }); }, [user, error, isLoading, checkSession]);
    return (react_1.default.createElement(use_config_1.default, { loginUrl: loginUrl },
        react_1.default.createElement(exports.UserContext.Provider, { value: value }, children)));
});
//# sourceMappingURL=use-user.js.map