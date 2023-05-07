"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var http_1 = require("http");
var assert_1 = require("../utils/assert");
var errors_1 = require("../utils/errors");
/**
 * @ignore
 */
function handleLogoutFactory(handler) {
    var _this = this;
    var logout = function (req, res, options) {
        if (options === void 0) { options = {}; }
        return tslib_1.__awaiter(_this, void 0, void 0, function () {
            var e_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        (0, assert_1.assertReqRes)(req, res);
                        return [4 /*yield*/, handler(req, res, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2:
                        e_1 = _a.sent();
                        throw new errors_1.LogoutHandlerError(e_1);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return function (reqOrOptions, res, options) {
        if (reqOrOptions instanceof http_1.IncomingMessage && res) {
            return logout(reqOrOptions, res, options);
        }
        if (typeof reqOrOptions === 'function') {
            return function (req, res) { return logout(req, res, reqOrOptions(req)); };
        }
        return function (req, res) { return logout(req, res, reqOrOptions); };
    };
}
exports.default = handleLogoutFactory;
//# sourceMappingURL=logout.js.map