"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/api/login";
exports.ids = ["pages/api/login"];
exports.modules = {

/***/ "@auth0/nextjs-auth0":
/*!**************************************!*\
  !*** external "@auth0/nextjs-auth0" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("@auth0/nextjs-auth0");

/***/ }),

/***/ "(api)/./pages/api/login.js":
/*!****************************!*\
  !*** ./pages/api/login.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ login)\n/* harmony export */ });\n/* harmony import */ var _utils_auth0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../utils/auth0 */ \"(api)/./utils/auth0.js\");\n\nasync function login(req, res) {\n    try {\n        await _utils_auth0__WEBPACK_IMPORTED_MODULE_0__[\"default\"].handleLogin(req, res, {});\n    } catch (error) {\n        console.error();\n        res.status(error.status || 500).end(error.message);\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvbG9naW4uanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBc0M7QUFFdkIsZUFBZUMsTUFBTUMsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFDNUMsSUFBSTtRQUNGLE1BQU1ILGdFQUFpQixDQUFDRSxLQUFLQyxLQUFLLENBQUM7SUFDckMsRUFBRSxPQUFPRSxPQUFPO1FBQ2RDLFFBQVFELEtBQUs7UUFDYkYsSUFBSUksTUFBTSxDQUFDRixNQUFNRSxNQUFNLElBQUksS0FBS0MsR0FBRyxDQUFDSCxNQUFNSSxPQUFPO0lBQ25EO0FBQ0YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NrZWxldG9uLy4vcGFnZXMvYXBpL2xvZ2luLmpzP2FlODgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGF1dGgwIGZyb20gXCIuLi8uLi91dGlscy9hdXRoMFwiO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBsb2dpbihyZXEsIHJlcykge1xuICB0cnkge1xuICAgIGF3YWl0IGF1dGgwLmhhbmRsZUxvZ2luKHJlcSwgcmVzLCB7fSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcigpO1xuICAgIHJlcy5zdGF0dXMoZXJyb3Iuc3RhdHVzIHx8IDUwMCkuZW5kKGVycm9yLm1lc3NhZ2UpO1xuICB9XG59XG4iXSwibmFtZXMiOlsiYXV0aDAiLCJsb2dpbiIsInJlcSIsInJlcyIsImhhbmRsZUxvZ2luIiwiZXJyb3IiLCJjb25zb2xlIiwic3RhdHVzIiwiZW5kIiwibWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/login.js\n");

/***/ }),

/***/ "(api)/./utils/auth0.js":
/*!************************!*\
  !*** ./utils/auth0.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @auth0/nextjs-auth0 */ \"@auth0/nextjs-auth0\");\n/* harmony import */ var _auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__);\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_auth0_nextjs_auth0__WEBPACK_IMPORTED_MODULE_0__.initAuth0)({\n    domain: process.env.domain,\n    clientId: process.env.clientId,\n    clientSecret: process.env.clientSecret,\n    scope: \"openid profile\",\n    redirectUri: process.env.redirectUri,\n    postLogoutRedirectUri: process.env.postLogoutRedirectUri,\n    session: {\n        cookieSecret: process.env.cookieSecret,\n        cookieLifetime: 60 * 60 * 8,\n        storeIDToken: false,\n        storeAccessToken: false,\n        storeRefreshToken: false\n    },\n    oidcClient: {\n        httpTimeout: 2500,\n        clockTolerance: 10000\n    }\n}));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi91dGlscy9hdXRoMC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBZ0Q7QUFFaEQsaUVBQWVBLDhEQUFTQSxDQUFDO0lBQ3ZCQyxRQUFRQyxRQUFRQyxHQUFHLENBQUNGLE1BQU07SUFDMUJHLFVBQVVGLFFBQVFDLEdBQUcsQ0FBQ0MsUUFBUTtJQUM5QkMsY0FBY0gsUUFBUUMsR0FBRyxDQUFDRSxZQUFZO0lBQ3RDQyxPQUFPO0lBQ1BDLGFBQWFMLFFBQVFDLEdBQUcsQ0FBQ0ksV0FBVztJQUNwQ0MsdUJBQXVCTixRQUFRQyxHQUFHLENBQUNLLHFCQUFxQjtJQUN4REMsU0FBUztRQUNQQyxjQUFjUixRQUFRQyxHQUFHLENBQUNPLFlBQVk7UUFDdENDLGdCQUFnQixLQUFLLEtBQUs7UUFDMUJDLGNBQWMsS0FBSztRQUNuQkMsa0JBQWtCLEtBQUs7UUFDdkJDLG1CQUFtQixLQUFLO0lBQzFCO0lBQ0FDLFlBQVk7UUFDVkMsYUFBYTtRQUNiQyxnQkFBZ0I7SUFDbEI7QUFDRixFQUFFLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9za2VsZXRvbi8uL3V0aWxzL2F1dGgwLmpzPzAwNjgiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5pdEF1dGgwIH0gZnJvbSBcIkBhdXRoMC9uZXh0anMtYXV0aDBcIjtcblxuZXhwb3J0IGRlZmF1bHQgaW5pdEF1dGgwKHtcbiAgZG9tYWluOiBwcm9jZXNzLmVudi5kb21haW4sXG4gIGNsaWVudElkOiBwcm9jZXNzLmVudi5jbGllbnRJZCxcbiAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5jbGllbnRTZWNyZXQsXG4gIHNjb3BlOiBcIm9wZW5pZCBwcm9maWxlXCIsXG4gIHJlZGlyZWN0VXJpOiBwcm9jZXNzLmVudi5yZWRpcmVjdFVyaSxcbiAgcG9zdExvZ291dFJlZGlyZWN0VXJpOiBwcm9jZXNzLmVudi5wb3N0TG9nb3V0UmVkaXJlY3RVcmksXG4gIHNlc3Npb246IHtcbiAgICBjb29raWVTZWNyZXQ6IHByb2Nlc3MuZW52LmNvb2tpZVNlY3JldCxcbiAgICBjb29raWVMaWZldGltZTogNjAgKiA2MCAqIDgsXG4gICAgc3RvcmVJRFRva2VuOiBmYWxzZSxcbiAgICBzdG9yZUFjY2Vzc1Rva2VuOiBmYWxzZSxcbiAgICBzdG9yZVJlZnJlc2hUb2tlbjogZmFsc2UsXG4gIH0sXG4gIG9pZGNDbGllbnQ6IHtcbiAgICBodHRwVGltZW91dDogMjUwMCxcbiAgICBjbG9ja1RvbGVyYW5jZTogMTAwMDAsXG4gIH0sXG59KTtcbiJdLCJuYW1lcyI6WyJpbml0QXV0aDAiLCJkb21haW4iLCJwcm9jZXNzIiwiZW52IiwiY2xpZW50SWQiLCJjbGllbnRTZWNyZXQiLCJzY29wZSIsInJlZGlyZWN0VXJpIiwicG9zdExvZ291dFJlZGlyZWN0VXJpIiwic2Vzc2lvbiIsImNvb2tpZVNlY3JldCIsImNvb2tpZUxpZmV0aW1lIiwic3RvcmVJRFRva2VuIiwic3RvcmVBY2Nlc3NUb2tlbiIsInN0b3JlUmVmcmVzaFRva2VuIiwib2lkY0NsaWVudCIsImh0dHBUaW1lb3V0IiwiY2xvY2tUb2xlcmFuY2UiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(api)/./utils/auth0.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/login.js"));
module.exports = __webpack_exports__;

})();