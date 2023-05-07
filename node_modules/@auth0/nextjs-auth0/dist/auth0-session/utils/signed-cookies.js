"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateCookieValue = exports.getCookieValue = void 0;
var tslib_1 = require("tslib");
var jose = tslib_1.__importStar(require("jose"));
var getCookieValue = function (k, v, keys) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var _a, value, signature, flattenedJWS, keys_1, keys_1_1, key, e_1, e_2_1;
    var e_2, _b;
    return tslib_1.__generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!v) {
                    return [2 /*return*/, undefined];
                }
                _a = tslib_1.__read(v.split('.'), 2), value = _a[0], signature = _a[1];
                flattenedJWS = {
                    protected: jose.base64url.encode(JSON.stringify({ alg: 'HS256', b64: false, crit: ['b64'] })),
                    payload: "".concat(k, "=").concat(value),
                    signature: signature
                };
                _c.label = 1;
            case 1:
                _c.trys.push([1, 8, 9, 10]);
                keys_1 = tslib_1.__values(keys), keys_1_1 = keys_1.next();
                _c.label = 2;
            case 2:
                if (!!keys_1_1.done) return [3 /*break*/, 7];
                key = keys_1_1.value;
                _c.label = 3;
            case 3:
                _c.trys.push([3, 5, , 6]);
                return [4 /*yield*/, jose.flattenedVerify(flattenedJWS, key, {
                        algorithms: ['HS256']
                    })];
            case 4:
                _c.sent();
                return [2 /*return*/, value];
            case 5:
                e_1 = _c.sent();
                return [3 /*break*/, 6];
            case 6:
                keys_1_1 = keys_1.next();
                return [3 /*break*/, 2];
            case 7: return [3 /*break*/, 10];
            case 8:
                e_2_1 = _c.sent();
                e_2 = { error: e_2_1 };
                return [3 /*break*/, 10];
            case 9:
                try {
                    if (keys_1_1 && !keys_1_1.done && (_b = keys_1.return)) _b.call(keys_1);
                }
                finally { if (e_2) throw e_2.error; }
                return [7 /*endfinally*/];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.getCookieValue = getCookieValue;
var generateCookieValue = function (cookie, value, key) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var signature;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, new jose.FlattenedSign(new TextEncoder().encode("".concat(cookie, "=").concat(value)))
                    .setProtectedHeader({ alg: 'HS256', b64: false, crit: ['b64'] })
                    .sign(key)];
            case 1:
                signature = (_a.sent()).signature;
                return [2 /*return*/, "".concat(value, ".").concat(signature)];
        }
    });
}); };
exports.generateCookieValue = generateCookieValue;
//# sourceMappingURL=signed-cookies.js.map