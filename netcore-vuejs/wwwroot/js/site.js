/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Scripts/site.js":
/*!*************************!*\
  !*** ./Scripts/site.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ \"./Scripts/utils.js\");\n﻿\r\n\r\nnew Vue({\r\n    el: '#form',\r\n    data: {\r\n        FullName: '',\r\n        Email: '',\r\n        Comments: '',\r\n        InvalidEmail: false\r\n    },\r\n    computed: {\r\n        isSubmitDisabled() {\r\n            let isDisabled = true;\r\n\r\n            if (\r\n                this.FullName !== '' &&\r\n                this.Email !== '' &&\r\n                this.Comments !== ''\r\n            ) {\r\n                isDisabled = false;\r\n            }\r\n\r\n            return isDisabled;\r\n        }\r\n    },\r\n    methods: {\r\n        ResetForm() {\r\n            this.FullName = '';\r\n            this.Email = '';\r\n            this.Comments = '';\r\n        },\r\n        SubmitForm() {\r\n            let submit = true;\r\n\r\n            if (!Object(_utils__WEBPACK_IMPORTED_MODULE_0__[\"validateEmail\"])(this.Email)) {\r\n                this.InvalidEmail = true;\r\n                submit = false;\r\n            } else {\r\n                this.InvalidEmail = false;\r\n            }\r\n\r\n            if (submit) {\r\n                axios({\r\n                    method: 'post',\r\n                    url: '/Home/SubmitedForm',\r\n                    data: { \"Fields\": this.$data }\r\n                }).then(res => {\r\n                    alert('Successfully submitted feedback form ');\r\n                    this.$refs.SubmitButton.setAttribute(\"disabled\", \"disabled\");\r\n                }).catch(err => {\r\n                    alert(`There was an error submitting your form. See details: ${err}`);\r\n                });\r\n            }\r\n        }\r\n    }\r\n});\r\n\n\n//# sourceURL=webpack:///./Scripts/site.js?");

/***/ }),

/***/ "./Scripts/utils.js":
/*!**************************!*\
  !*** ./Scripts/utils.js ***!
  \**************************/
/*! exports provided: validateEmail */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"validateEmail\", function() { return validateEmail; });\n﻿const validateEmail = email => {\r\n    const re = /^(([^<>()\\[\\]\\\\.,;:\\s@\"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@\"]+)*)|(\".+\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/;\r\n    return re.test(String(email).toLowerCase());\r\n};\r\n\n\n//# sourceURL=webpack:///./Scripts/utils.js?");

/***/ }),

/***/ 0:
/*!**************************************************!*\
  !*** multi ./Scripts/site.js ./Scripts/utils.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! E:\\netcore-vuejs\\netcore-vuejs\\Scripts\\site.js */\"./Scripts/site.js\");\nmodule.exports = __webpack_require__(/*! E:\\netcore-vuejs\\netcore-vuejs\\Scripts\\utils.js */\"./Scripts/utils.js\");\n\n\n//# sourceURL=webpack:///multi_./Scripts/site.js_./Scripts/utils.js?");

/***/ })

/******/ });