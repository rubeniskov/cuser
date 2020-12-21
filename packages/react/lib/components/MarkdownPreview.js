"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _snarkdown = _interopRequireDefault(require("snarkdown"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n img {\n   max-width: 100%;\n }\n * {\n  font-size: 1rem;\n }\n pre {\n  background: #efefef;\n  padding: 1rem;\n  border-radius: 0.2rem;\n }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var parseMarkdown = function parseMarkdown() {
  var source = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return (0, _snarkdown["default"])(source);
};

var MarkdownPreview = function MarkdownPreview(_ref) {
  var className = _ref.className,
      children = _ref.children;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    dangerouslySetInnerHTML: {
      __html: parseMarkdown(children)
    }
  });
};

var _default = (0, _styledComponents["default"])(MarkdownPreview)(_templateObject());

exports["default"] = _default;