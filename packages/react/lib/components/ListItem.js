"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ListItem = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  display: flex;\n  flex-flow: row;\n  margin-bottom: 0.5rem;\n  position: 'relative';\n  .side {\n    margin-right: 1rem;\n  }\n  .content {\n    flex-grow: 1;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ListItem = function ListItem(_ref) {
  var className = _ref.className,
      side = _ref.side,
      children = _ref.children;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "side",
      children: side
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "content",
      children: children
    })]
  });
};

exports.ListItem = ListItem;

var _default = (0, _styledComponents["default"])(ListItem)(_templateObject());

exports["default"] = _default;