"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("../utils/assert");
/**
 * @ignore
 */
function sessionFactory(sessionCache) {
    return function (req, res) {
        (0, assert_1.assertReqRes)(req, res);
        return sessionCache.get(req, res);
    };
}
exports.default = sessionFactory;
//# sourceMappingURL=get-session.js.map