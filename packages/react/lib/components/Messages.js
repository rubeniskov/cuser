"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Messages = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _useMessages2 = _interopRequireDefault(require("../hooks/useMessages"));

var _Message = _interopRequireDefault(require("./Message"));

var _LoadMore = _interopRequireDefault(require("./LoadMore"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Messages = function Messages(_ref) {
  var topicId = _ref.topicId,
      _ref$limit = _ref.limit,
      limit = _ref$limit === void 0 ? 10 : _ref$limit,
      auto = _ref.auto;
  var wrapperRef = (0, _react.useRef)(null);

  var _useMessages = (0, _useMessages2["default"])({
    topicId: topicId,
    limit: limit
  }),
      loading = _useMessages.loading,
      fetchMore = _useMessages.fetchMore,
      _useMessages$data = _useMessages.data,
      data = _useMessages$data === void 0 ? {} : _useMessages$data;

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
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ref: wrapperRef,
    children: [messages.map(function (message) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Message["default"], _objectSpread({}, message), message.id);
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