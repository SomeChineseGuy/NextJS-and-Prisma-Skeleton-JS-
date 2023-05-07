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
exports.id = "pages/profile";
exports.ids = ["pages/profile"];
exports.modules = {

/***/ "./pages/profile.jsx":
/*!***************************!*\
  !*** ./pages/profile.jsx ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Profile)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _auth0_nextjs_auth0_client__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @auth0/nextjs-auth0/client */ \"@auth0/nextjs-auth0/client\");\n/* harmony import */ var _auth0_nextjs_auth0_client__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_auth0_nextjs_auth0_client__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nfunction Profile() {\n    const { user , error , isLoading  } = (0,_auth0_nextjs_auth0_client__WEBPACK_IMPORTED_MODULE_2__.useUser)();\n    console.log(user);\n    if (isLoading) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: \"Loading...\"\n    }, void 0, false, {\n        fileName: \"/Users/davique/lighthouse/TripMate/pages/profile.jsx\",\n        lineNumber: 8,\n        columnNumber: 25\n    }, this);\n    if (error) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: error.message\n    }, void 0, false, {\n        fileName: \"/Users/davique/lighthouse/TripMate/pages/profile.jsx\",\n        lineNumber: 9,\n        columnNumber: 21\n    }, this);\n    return user && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"img\", {\n                src: user.picture,\n                alt: user.name\n            }, void 0, false, {\n                fileName: \"/Users/davique/lighthouse/TripMate/pages/profile.jsx\",\n                lineNumber: 14,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                children: user.name\n            }, void 0, false, {\n                fileName: \"/Users/davique/lighthouse/TripMate/pages/profile.jsx\",\n                lineNumber: 15,\n                columnNumber: 9\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                children: user.email\n            }, void 0, false, {\n                fileName: \"/Users/davique/lighthouse/TripMate/pages/profile.jsx\",\n                lineNumber: 16,\n                columnNumber: 9\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/davique/lighthouse/TripMate/pages/profile.jsx\",\n        lineNumber: 13,\n        columnNumber: 7\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9wcm9maWxlLmpzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUEwQjtBQUMyQjtBQUV0QyxTQUFTRSxVQUFVO0lBQ2hDLE1BQU0sRUFBRUMsS0FBSSxFQUFFQyxNQUFLLEVBQUVDLFVBQVMsRUFBRSxHQUFHSixtRUFBT0E7SUFDMUNLLFFBQVFDLEdBQUcsQ0FBQ0o7SUFFWixJQUFJRSxXQUFXLHFCQUFPLDhEQUFDRztrQkFBSTs7Ozs7O0lBQzNCLElBQUlKLE9BQU8scUJBQU8sOERBQUNJO2tCQUFLSixNQUFNSyxPQUFPOzs7Ozs7SUFFckMsT0FDRU4sc0JBQ0UsOERBQUNLOzswQkFDQyw4REFBQ0U7Z0JBQUlDLEtBQUtSLEtBQUtTLE9BQU87Z0JBQUVDLEtBQUtWLEtBQUtXLElBQUk7Ozs7OzswQkFDdEMsOERBQUNDOzBCQUFJWixLQUFLVyxJQUFJOzs7Ozs7MEJBQ2QsOERBQUNFOzBCQUFHYixLQUFLYyxLQUFLOzs7Ozs7Ozs7Ozs7QUFJdEIsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NrZWxldG9uLy4vcGFnZXMvcHJvZmlsZS5qc3g/M2QyMSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VVc2VyIH0gZnJvbSBcIkBhdXRoMC9uZXh0anMtYXV0aDAvY2xpZW50XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFByb2ZpbGUoKSB7XG4gIGNvbnN0IHsgdXNlciwgZXJyb3IsIGlzTG9hZGluZyB9ID0gdXNlVXNlcigpO1xuICBjb25zb2xlLmxvZyh1c2VyKTtcblxuICBpZiAoaXNMb2FkaW5nKSByZXR1cm4gPGRpdj5Mb2FkaW5nLi4uPC9kaXY+O1xuICBpZiAoZXJyb3IpIHJldHVybiA8ZGl2PntlcnJvci5tZXNzYWdlfTwvZGl2PjtcblxuICByZXR1cm4gKFxuICAgIHVzZXIgJiYgKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGltZyBzcmM9e3VzZXIucGljdHVyZX0gYWx0PXt1c2VyLm5hbWV9IC8+XG4gICAgICAgIDxoMj57dXNlci5uYW1lfTwvaDI+XG4gICAgICAgIDxwPnt1c2VyLmVtYWlsfTwvcD5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgKTtcbn1cbiJdLCJuYW1lcyI6WyJSZWFjdCIsInVzZVVzZXIiLCJQcm9maWxlIiwidXNlciIsImVycm9yIiwiaXNMb2FkaW5nIiwiY29uc29sZSIsImxvZyIsImRpdiIsIm1lc3NhZ2UiLCJpbWciLCJzcmMiLCJwaWN0dXJlIiwiYWx0IiwibmFtZSIsImgyIiwicCIsImVtYWlsIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/profile.jsx\n");

/***/ }),

/***/ "@auth0/nextjs-auth0/client":
/*!*********************************************!*\
  !*** external "@auth0/nextjs-auth0/client" ***!
  \*********************************************/
/***/ ((module) => {

module.exports = require("@auth0/nextjs-auth0/client");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/profile.jsx"));
module.exports = __webpack_exports__;

})();