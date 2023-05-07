"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoginState = void 0;
var tslib_1 = require("tslib");
var debug_1 = tslib_1.__importDefault(require("../utils/debug"));
var debug = (0, debug_1.default)('get-login-state');
/**
 * Generate the state value for use during login transactions. It is used to store the intended
 * return URL after the user authenticates. State is not used to carry unique PRNG values here
 * because the library utilizes either nonce or PKCE for CSRF protection.
 *
 * @param {IncomingMessage} _req
 * @param {LoginOptions} options
 *
 * @return {object}
 */
var getLoginState = function (_req, options) {
    var state = { returnTo: options.returnTo };
    debug('adding default state %O', state);
    return state;
};
exports.getLoginState = getLoginState;
//# sourceMappingURL=get-login-state.js.map