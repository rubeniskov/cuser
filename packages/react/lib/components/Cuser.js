"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Cuser = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _ErrorBoundary = _interopRequireDefault(require("./ErrorBoundary"));

var _Messages = _interopRequireDefault(require("./Messages"));

var _MessageWriter = _interopRequireDefault(require("./MessageWriter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  font-family: sans-serif;\n  /* overflow: scroll; */\n  /* height: 20rem; */\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Cuser = function Cuser(_ref) {
  var className = _ref.className,
      style = _ref.style,
      restProps = _objectWithoutProperties(_ref, ["className", "style"]);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    style: style,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ErrorBoundary["default"], {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MessageWriter["default"], _objectSpread({}, restProps))
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ErrorBoundary["default"], {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_react.Suspense, {
        fallback: 'loading',
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Messages["default"], _objectSpread({}, restProps))
      })
    })]
  });
};

exports.Cuser = Cuser;

var _default = (0, _styledComponents["default"])(Cuser)(_templateObject());

exports["default"] = _default;