"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  height: 1rem;\n  text-align: center;\n  font-size: 10px;\n  vertical-align: middle;\n  line-height: initial;\n  & > div {\n    background-color: #333;\n    height: 100%;\n    width: 0.3rem;\n    margin: 0 0.1rem;\n    display: inline-block;\n\n    animation: ", " 1.2s infinite ease-in-out;\n  }\n\n  & .rect2 {\n    animation-delay: -1.1s;\n  }\n\n  & .rect3 {\n    animation-delay: -1.0s;\n  }\n\n  & .rect4 {\n    animation-delay: -0.9s;\n  }\n\n  & .rect5 {\n    animation-delay: -0.8s;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n0%, 40%, 100% {\n  transform: scaleY(0.4);\n}  20% {\n  transform: scaleY(1.0);\n}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Spinner = function Spinner(_ref) {
  var className = _ref.className;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "rect1"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "rect2"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "rect3"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "rect4"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "rect5"
    })]
  });
};

var strechDelay = (0, _styledComponents.keyframes)(_templateObject());

var _default = (0, _styledComponents["default"])(Spinner)(_templateObject2(), strechDelay);

exports["default"] = _default;