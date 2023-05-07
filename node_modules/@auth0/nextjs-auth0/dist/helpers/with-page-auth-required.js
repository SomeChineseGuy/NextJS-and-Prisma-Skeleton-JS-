"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert_1 = require("../utils/assert");
/**
 * @ignore
 */
function withPageAuthRequiredFactory(loginUrl, getSessionCache) {
    var _this = this;
    return function (_a) {
        var _b = _a === void 0 ? {} : _a, getServerSideProps = _b.getServerSideProps, returnTo = _b.returnTo;
        return function (ctx) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var sessionCache, session, ret;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        (0, assert_1.assertCtx)(ctx);
                        sessionCache = getSessionCache();
                        return [4 /*yield*/, sessionCache.get(ctx.req, ctx.res)];
                    case 1:
                        session = _a.sent();
                        if (!(session === null || session === void 0 ? void 0 : session.user)) {
                            return [2 /*return*/, {
                                    redirect: {
                                        destination: "".concat(loginUrl, "?returnTo=").concat(encodeURIComponent(returnTo || ctx.resolvedUrl)),
                                        permanent: false
                                    }
                                }];
                        }
                        ret = { props: {} };
                        if (!getServerSideProps) return [3 /*break*/, 3];
                        return [4 /*yield*/, getServerSideProps(ctx)];
                    case 2:
                        ret = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (ret.props instanceof Promise) {
                            return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, ret), { props: ret.props.then(function (props) { return (tslib_1.__assign({ user: session.user }, props)); }) })];
                        }
                        return [2 /*return*/, tslib_1.__assign(tslib_1.__assign({}, ret), { props: tslib_1.__assign({ user: session.user }, ret.props) })];
                }
            });
        }); };
    };
}
exports.default = withPageAuthRequiredFactory;
//# sourceMappingURL=with-page-auth-required.js.map