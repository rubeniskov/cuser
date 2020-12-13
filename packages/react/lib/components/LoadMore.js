"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.LoadMore = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _useInfinityScroll = _interopRequireDefault(require("../hooks/useInfinityScroll"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Spinner = _interopRequireDefault(require("./Spinner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  span {\n    opacity: 0.5;\n  }\n  button {\n    background: #EFEFEF;\n    outline: none;\n    border: none;\n    border-radius: 0.2rem;\n    width: 100%;\n    height: 3rem;\n    cursor: pointer;\n    &:disabled {\n      cursor: not-allowed;\n    }\n  }\n  svg {\n    height: 100%;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var LoadMore = function LoadMore(_ref) {
  var contentRef = _ref.contentRef,
      className = _ref.className,
      loading = _ref.loading,
      auto = _ref.auto,
      onLoadMore = _ref.onLoadMore;
  (0, _useInfinityScroll["default"])(onLoadMore, {
    disabled: !auto || loading,
    contentRef: contentRef
  });
  var handleClick = (0, _react.useCallback)(function (evt) {
    if (!auto && typeof onLoadMore === 'function') {
      onLoadMore(evt);
    }
  }, [auto, onLoadMore]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      onClick: handleClick,
      disabled: loading,
      children: loading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Spinner["default"], {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: "Load more"
      })
    })
  });
};

exports.LoadMore = LoadMore;

var _default = (0, _styledComponents["default"])(LoadMore)(_templateObject());

exports["default"] = _default;