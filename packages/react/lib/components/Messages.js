"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Messages = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _useMessages2 = _interopRequireDefault(require("../hooks/useMessages"));

var _useAuth2 = _interopRequireDefault(require("../hooks/useAuth"));

var _Message = _interopRequireDefault(require("./Message"));

var _LoadMore = _interopRequireDefault(require("./LoadMore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var NoMessages = /*#__PURE__*/(0, _react.lazy)(function () {
  return Promise.resolve().then(function () {
    return _interopRequireWildcard(require('./NoMessages'));
  });
});

var Messages = function Messages(_ref) {
  var auto = _ref.auto,
      _ref$limit = _ref.limit,
      limit = _ref$limit === void 0 ? 10 : _ref$limit,
      restProps = _objectWithoutProperties(_ref, ["auto", "limit"]);

  var wrapperRef = (0, _react.useRef)(null);

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      editMessageId = _useState2[0],
      setEditMessageId = _useState2[1];

  var _useMessages = (0, _useMessages2["default"])(_objectSpread(_objectSpread({}, restProps), {}, {
    limit: limit
  })),
      loading = _useMessages.loading,
      fetchMore = _useMessages.fetchMore,
      _useMessages$data = _useMessages.data,
      data = _useMessages$data === void 0 ? {} : _useMessages$data,
      error = _useMessages.error;

  var _useAuth = (0, _useAuth2["default"])(),
      user = _useAuth.user;

  var _data$edges = data.edges,
      edges = _data$edges === void 0 ? [] : _data$edges,
      _data$pageInfo = data.pageInfo;
  _data$pageInfo = _data$pageInfo === void 0 ? {} : _data$pageInfo;
  var hasNextPage = _data$pageInfo.hasNextPage;
  var messages = edges.map(function (_ref2) {
    var node = _ref2.node;
    return node;
  });
  var loadMore = (0, _react.useCallback)(function () {
    return fetchMore();
  }, [fetchMore, edges.length]);
  var loadingMessages = (0, _react.useMemo)(function () {
    return new Array(limit).fill(null).map(function (_, id) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Message["default"], {
        loading: true
      }, id);
    });
  }, [limit]);
  var handleEdit = (0, _react.useCallback)(function (_, messageId) {
    return setEditMessageId(messageId);
  }, []);
  var handleAbortEdit = (0, _react.useCallback)(function (_) {
    return setEditMessageId(null);
  }, []);
  var handleCompleteEdit = (0, _react.useCallback)(function (_) {
    return setEditMessageId(null);
  }, []);

  if (messages.length === 0) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(NoMessages, {});
  }

  if (error) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: error.message
    });
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ref: wrapperRef,
    children: [messages.map(function (message) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Message["default"], _objectSpread({
        peerId: user.data && user.data.peerId,
        onEdit: handleEdit,
        onAbort: handleAbortEdit,
        onComplete: handleCompleteEdit,
        editMode: editMessageId === message.id
      }, message), "".concat(message.id, ":rev_").concat(message.content.revision));
    }), loading && loadingMessages, hasNextPage && /*#__PURE__*/(0, _jsxRuntime.jsx)(_LoadMore["default"], {
      auto: auto,
      loading: loading,
      contentRef: wrapperRef,
      onLoadMore: loadMore
    })]
  });
};

exports.Messages = Messages;
var _default = Messages;
exports["default"] = _default;