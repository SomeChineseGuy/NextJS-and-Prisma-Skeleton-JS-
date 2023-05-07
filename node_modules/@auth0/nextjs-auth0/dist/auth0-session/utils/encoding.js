"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeState = exports.encodeState = void 0;
var tslib_1 = require("tslib");
var jose = tslib_1.__importStar(require("jose"));
var util_1 = require("util");
/**
 * Prepare a state object to send.
 *
 * @param {object} stateObject
 *
 * @return {string}
 */
function encodeState(stateObject) {
    // This filters out nonce, code_verifier, and max_age from the state object so that the values are
    // only stored in its dedicated transient cookie.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    var nonce = stateObject.nonce, code_verifier = stateObject.code_verifier, max_age = stateObject.max_age, filteredState = tslib_1.__rest(stateObject, ["nonce", "code_verifier", "max_age"]);
    return jose.base64url.encode(JSON.stringify(filteredState));
}
exports.encodeState = encodeState;
/**
 * Decode a state value.
 *
 * @param {string} stateValue
 *
 * @return {object|undefined}
 */
function decodeState(stateValue) {
    try {
        return JSON.parse(new util_1.TextDecoder().decode(jose.base64url.decode(stateValue)));
    }
    catch (e) {
        return undefined;
    }
}
exports.decodeState = decodeState;
//# sourceMappingURL=encoding.js.map