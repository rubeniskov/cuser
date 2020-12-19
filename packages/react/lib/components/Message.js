"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Message = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _clsx = _interopRequireDefault(require("clsx"));

var _moment = _interopRequireDefault(require("moment"));

var _Avatar = _interopRequireDefault(require("./Avatar"));

var _ListItem = _interopRequireDefault(require("./ListItem"));

var _MessageActions = _interopRequireDefault(require("./MessageActions"));

var _MarkdownPreview = _interopRequireDefault(require("./MarkdownPreview"));

var _MessageUpdater = _interopRequireDefault(require("./MessageUpdater"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  .user-username {\n    display: inline-block;\n    font-weight: bold;\n    margin-top: 0.1rem;\n    margin-bottom: 0.1rem;\n  }\n  .user-avatar {\n    width: 3em;\n  }\n  .elapsed-time {\n    display: inline-block;\n    opacity: 0.5;\n  }\n  .content{\n    border-bottom: solid 1px #efefef;\n    margin-bottom: 1rem;\n  }\n  .content-data {\n    margin-top: 0.5rem;\n    margin-bottom: 0.5rem;\n    opacity: 0.8;\n  }\n  &.loading {\n    .user-username, .elapsed-time, .content-data {\n      background-color: #EFEFEF;\n      height: 1rem;\n      min-width: 10rem;\n      animation-duration: 1.5s;\n      animation-delay: .5s;\n      animation-fill-mode: forwards;\n      animation-iteration-count: infinite;\n      animation-name: ", ";\n      animation-timing-function: linear;\n      background: darkgray;\n      background: linear-gradient(to right, #eeeeee 10%, #dddddd 18%, #eeeeee 33%);\n      background-size: 800px 104px;\n    }\n    .user-username {\n      min-width: 25rem;\n    }\n    img {\n      filter: grayscale(1);\n    }\n  }\n"]);

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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Message = function Message(_ref) {
  var _ref$editMode = _ref.editMode,
      editMode = _ref$editMode === void 0 ? false : _ref$editMode,
      id = _ref.id,
      loading = _ref.loading,
      className = _ref.className,
      _ref$content = _ref.content,
      content = _ref$content === void 0 ? {} : _ref$content,
      _ref$user = _ref.user,
      user = _ref$user === void 0 ? {} : _ref$user,
      peerId = _ref.peerId,
      cdate = _ref.cdate,
      mdate = _ref.mdate,
      restProps = _objectWithoutProperties(_ref, ["editMode", "id", "loading", "className", "content", "user", "peerId", "cdate", "mdate"]);

  var elapsedTimeText = (0, _react.useMemo)(function () {
    var elapsed = _moment["default"].duration(new Date().getTime() - mdate).humanize();

    if (mdate - cdate > 1000) {
      elapsed = "edited ".concat(elapsed);
    }

    return elapsed;
  }, [cdate, mdate]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ListItem["default"], {
    className: (0, _clsx["default"])(className, {
      loading: loading
    }),
    actions: /*#__PURE__*/(0, _jsxRuntime.jsx)(_MessageActions["default"], _objectSpread(_objectSpread({}, restProps), {}, {
      messageId: id,
      peerId: peerId,
      disabled: !peerId || editMode,
      user: user
    })),
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
      children: !loading && elapsedTimeText
    }), editMode ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_MessageUpdater["default"], _objectSpread(_objectSpread({}, restProps), {}, {
      data: content.data,
      messageId: id
    })) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_MarkdownPreview["default"], {
      className: "content-data",
      children: content.data
    })]
  });
};

exports.Message = Message;
var placeHolderShimmer = (0, _styledComponents.keyframes)(_templateObject());

var _default = (0, _styledComponents["default"])(Message)(_templateObject2(), placeHolderShimmer);

exports["default"] = _default;