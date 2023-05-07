"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var assert_1 = require("../utils/assert");
/**
 * @ignore
 */
function updateSessionFactory(sessionCache) {
    var _this = this;
    return function (req, res, newSession) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        var session;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    (0, assert_1.assertReqRes)(req, res);
                    return [4 /*yield*/, sessionCache.get(req, res)];
                case 1:
                    session = _a.sent();
                    if (!session || !newSession || !newSession.user) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, sessionCache.set(req, res, newSession)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
}
exports.default = updateSessionFactory;
//# sourceMappingURL=update-session.js.map