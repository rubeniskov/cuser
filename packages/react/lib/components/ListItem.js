"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ListItem = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _ErrorBanner = _interopRequireDefault(require("./ErrorBanner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  .content-box {\n    display: flex;\n    flex-flow: row;\n    margin-bottom: 0.5rem;\n    position: relative;\n  }\n  .side {\n    margin-right: 1rem;\n    width: 4rem;\n  }\n  .content {\n    flex-grow: 1;\n  }\n  .actions {\n    text-align: right;\n    margin-top: 0.5rem;\n    margin-bottom: 0.5rem;\n    margin-left: -0.5rem;\n    margin-right: -0.5rem;\n    > * {\n      margin: 0 0.5rem;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ListItem = function ListItem(_ref) {
  var className = _ref.className,
      error = _ref.error,
      side = _ref.side,
      children = _ref.children,
      actions = _ref.actions;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "content-box",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "side",
        children: side
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "content",
        children: [children, actions && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "actions",
          children: actions
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ErrorBanner["default"], {
      error: error
    })]
  });
};

exports.ListItem = ListItem;

var _default = (0, _styledComponents["default"])(ListItem)(_templateObject());

exports["default"] = _default;