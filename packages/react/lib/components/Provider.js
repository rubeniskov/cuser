"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _context = _interopRequireDefault(require("../utils/context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Provider = _context["default"].Provider;

var CuserProvider = function CuserProvider(_ref) {
  var client = _ref.client,
      topicId = _ref.topicId,
      children = _ref.children;
  var value = (0, _react.useMemo)(function () {
    return _objectSpread(_objectSpread({}, _context["default"]._currentValue), {}, {
      client: client,
      topicId: topicId
    });
  }, [topicId, client]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Provider, {
    value: value,
    children: children
  });
};

var _default = CuserProvider;
exports["default"] = _default;