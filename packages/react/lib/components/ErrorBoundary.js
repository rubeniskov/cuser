"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _reactErrorBoundary = require("react-error-boundary");

function ErrorFallback(_ref) {
  var error = _ref.error,
      resetErrorBoundary = _ref.resetErrorBoundary;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    role: "alert",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      children: "Something went wrong:"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("pre", {
      children: error.message
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("pre", {
      children: error.stack
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      onClick: resetErrorBoundary,
      children: "Try again"
    })]
  });
}

var ErrorBoundary = function ErrorBoundary(_ref2) {
  var children = _ref2.children,
      _ref2$fallback = _ref2.fallback,
      fallback = _ref2$fallback === void 0 ? ErrorFallback : _ref2$fallback;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_reactErrorBoundary.ErrorBoundary, {
    FallbackComponent: fallback,
    children: children
  });
};

var _default = ErrorBoundary;
exports["default"] = _default;