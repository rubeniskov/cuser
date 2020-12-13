"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Message = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _clsx = _interopRequireDefault(require("clsx"));

var _moment = _interopRequireDefault(require("moment"));

var _Avatar = _interopRequireDefault(require("./Avatar"));

var _ListItem = _interopRequireDefault(require("./ListItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  .user-username {\n    display: inline-block;\n    font-weight: bold;\n    margin-top: 0.1rem;\n    margin-bottom: 0.1rem;\n  }\n  .user-avatar {\n    width: 3em;\n  }\n  .elapsed-time {\n    display: inline-block;\n    opacity: 0.5;\n  }\n  .content{\n    flex-grow: 1;\n  }\n  .content-data {\n    margin-top: 0.5rem;\n    margin-bottom: 0.5rem;\n    opacity: 0.8;\n  }\n  &.loading {\n    .user-username, .elapsed-time, .content-data {\n      background-color: #EFEFEF;\n      height: 1rem;\n      min-width: 10rem;\n      animation-duration: 1.5s;\n      animation-delay: .5s;\n      animation-fill-mode: forwards;\n      animation-iteration-count: infinite;\n      animation-name: ", ";\n      animation-timing-function: linear;\n      background: darkgray;\n      background: linear-gradient(to right, #eeeeee 10%, #dddddd 18%, #eeeeee 33%);\n      background-size: 800px 104px;\n    }\n    .user-username {\n      min-width: 25rem;\n    }\n    img {\n      filter: grayscale(1);\n    }\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n0%{\n  background-position: -468px 0\n}\n100%{\n  background-position: 468px 0\n}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Message = function Message(_ref) {
  var id = _ref.id,
      loading = _ref.loading,
      className = _ref.className,
      _ref$content = _ref.content,
      content = _ref$content === void 0 ? {} : _ref$content,
      _ref$user = _ref.user,
      user = _ref$user === void 0 ? {} : _ref$user,
      mdate = _ref.mdate;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ListItem["default"], {
    className: (0, _clsx["default"])(className, {
      loading: loading
    }),
    side: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Avatar["default"], {
      className: "user-avatar",
      loading: loading,
      avatar: user.avatar
    }),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "user-username",
      children: user.username
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {}), /*#__PURE__*/(0, _jsxRuntime.jsx)("small", {
      className: "elapsed-time",
      children: !loading && _moment["default"].duration(new Date().getTime() - mdate).humanize()
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "content-data",
      children: content.data
    })]
  });
};

exports.Message = Message;
var placeHolderShimmer = (0, _styledComponents.keyframes)(_templateObject());

var _default = (0, _styledComponents["default"])(Message)(_templateObject2(), placeHolderShimmer);

exports["default"] = _default;