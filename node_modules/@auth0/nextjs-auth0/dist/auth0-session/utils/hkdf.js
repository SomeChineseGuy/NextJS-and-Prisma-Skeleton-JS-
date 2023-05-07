"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signing = exports.encryption = void 0;
var tslib_1 = require("tslib");
var hkdf_1 = tslib_1.__importDefault(require("@panva/hkdf"));
var BYTE_LENGTH = 32;
var ENCRYPTION_INFO = 'JWE CEK';
var SIGNING_INFO = 'JWS Cookie Signing';
var digest = 'sha256';
/**
 *
 * Derives appropriate sized keys from the end-user provided secret random string/passphrase using
 * HKDF (HMAC-based Extract-and-Expand Key Derivation Function) defined in RFC 8569.
 *
 * @see https://tools.ietf.org/html/rfc5869
 *
 */
var encryption = function (secret) {
    return (0, hkdf_1.default)(digest, secret, '', ENCRYPTION_INFO, BYTE_LENGTH);
};
exports.encryption = encryption;
var signing = function (secret) { return (0, hkdf_1.default)(digest, secret, '', SIGNING_INFO, BYTE_LENGTH); };
exports.signing = signing;
//# sourceMappingURL=hkdf.js.map