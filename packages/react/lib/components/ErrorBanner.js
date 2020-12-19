"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  background-color: #EFEFEF;\n  padding: 1rem;\n  color: red;\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ErrorBanner = function ErrorBanner(_ref) {
  var error = _ref.error,
      className = _ref.className;

  if (error && /invalid signature/.test(error.message)) {
    error = new Error('User token is outdated, please relogin');
  }

  return error ? /*#__PURE__*/(0, _jsxRuntime.jsx)("pre", {
    className: className,
    children: [error.message, error.extendedInfo].filter(Boolean).join('\n')
  }) : null;
};

var _default = (0, _styledComponents["default"])(ErrorBanner)(_templateObject());

exports["default"] = _default;