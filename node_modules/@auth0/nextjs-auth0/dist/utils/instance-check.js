"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setIsUsingOwnInstance = exports.setIsUsingNamedExports = void 0;
var isUsingNamedExports = false;
var isUsingOwnInstance = false;
var instanceCheck = function () {
    if (isUsingNamedExports && isUsingOwnInstance) {
        throw new Error('You cannot mix creating your own instance with `initAuth0` and using named ' +
            "exports like `import { handleAuth } from '@auth0/nextjs-auth0'`");
    }
};
var setIsUsingNamedExports = function () {
    isUsingNamedExports = true;
    instanceCheck();
};
exports.setIsUsingNamedExports = setIsUsingNamedExports;
var setIsUsingOwnInstance = function () {
    isUsingOwnInstance = true;
    instanceCheck();
};
exports.setIsUsingOwnInstance = setIsUsingOwnInstance;
//# sourceMappingURL=instance-check.js.map