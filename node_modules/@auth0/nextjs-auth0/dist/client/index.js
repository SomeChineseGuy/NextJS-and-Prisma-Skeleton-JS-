"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.withPageAuthRequired = exports.useUser = exports.RequestError = exports.UserContext = exports.UserProvider = void 0;
var tslib_1 = require("tslib");
var use_user_1 = tslib_1.__importStar(require("./use-user"));
Object.defineProperty(exports, "UserProvider", { enumerable: true, get: function () { return use_user_1.default; } });
Object.defineProperty(exports, "UserContext", { enumerable: true, get: function () { return use_user_1.UserContext; } });
Object.defineProperty(exports, "RequestError", { enumerable: true, get: function () { return use_user_1.RequestError; } });
Object.defineProperty(exports, "useUser", { enumerable: true, get: function () { return use_user_1.useUser; } });
var with_page_auth_required_1 = tslib_1.__importDefault(require("./with-page-auth-required"));
Object.defineProperty(exports, "withPageAuthRequired", { enumerable: true, get: function () { return with_page_auth_required_1.default; } });
//# sourceMappingURL=index.js.map