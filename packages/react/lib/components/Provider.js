"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _context = _interopRequireDefault(require("../utils/context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Provider = _context["default"].Provider;

var CuserProvider = function CuserProvider(_ref) {
  var client = _ref.client,
      topicId = _ref.topicId,
      children = _ref.children;
  var value = (0, _react.useMemo)(function () {
    return {
      client: client,
      topicId: topicId
    };
  }, [topicId, client]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Provider, {
    value: value,
    children: children
  });
};

var _default = CuserProvider;
exports["default"] = _default;