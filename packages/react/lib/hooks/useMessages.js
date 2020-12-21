"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _useCuser2 = _interopRequireDefault(require("./useCuser"));

var _usePromiseResolver = _interopRequireDefault(require("./usePromiseResolver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var useMessages = function useMessages() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$subscribe = _ref.subscribe,
      subscribe = _ref$subscribe === void 0 ? true : _ref$subscribe,
      _ref$polling = _ref.polling,
      polling = _ref$polling === void 0 ? 5000 : _ref$polling,
      restOpts = _objectWithoutProperties(_ref, ["subscribe", "polling"]);

  var _useCuser = (0, _useCuser2["default"])(restOpts),
      client = _useCuser.client,
      topicId = _useCuser.topicId;

  var resolver = function resolver(_ref2) {
    var topicId = _ref2.topicId,
        resVars = _objectWithoutProperties(_ref2, ["topicId"]);

    return client.getMessagesEdges(topicId, resVars);
  };

  var updateQuery = (0, _react.useCallback)(function () {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref3$edges = _ref3.edges,
        edges = _ref3$edges === void 0 ? [] : _ref3$edges,
        restState = _objectWithoutProperties(_ref3, ["edges"]);

    var _ref4 = arguments.length > 1 ? arguments[1] : undefined,
        fetchMoreResult = _ref4.fetchMoreResult;

    return _objectSpread(_objectSpread(_objectSpread({}, restState), fetchMoreResult), {}, {
      edges: [].concat(_toConsumableArray(edges), _toConsumableArray(fetchMoreResult.edges))
    });
  }, []);
  var result = (0, _usePromiseResolver["default"])(resolver, _objectSpread(_objectSpread({}, restOpts), {}, {
    variables: {
      topicId: topicId
    }
  }));
  (0, _react.useEffect)(function () {
    if (subscribe) {
      var subscription = result.subscribeToMore({
        subscriber: function subscriber(_ref5, listener) {
          var topicId = _ref5.topicId;
          return client.subscribe(topicId, listener);
        },
        updateQuery: function updateQuery(prev, _ref6) {
          var _ref6$subscriptionDat = _ref6.subscriptionData,
              topicId = _ref6$subscriptionDat.topicId,
              value = _ref6$subscriptionDat.value;
          var first = prev && prev.edges[0];

          if (first) {
            return client.getMessagesEdges(topicId, {
              rootId: value.replace(/^\/ipfs\//, ''),
              // rootId: evt.value,
              limit: prev.edges.length
            });
          }

          return prev;
        }
      });
      return function () {
        return subscription.unsubcribe();
      };
    }
  }, [subscribe, updateQuery]);
  var missingRecord = /record requested for .+ was not found in the network/.test(result.error);
  (0, _react.useEffect)(function () {
    if (missingRecord) {
      result.startPolling(polling);
      return function () {
        return result.stopPolling();
      };
    }
  }, [missingRecord]);
  var wrappedFetchMore = (0, _react.useCallback)(function () {
    var data = result.data || {
      edges: []
    };
    var last = data.edges[data.edges.length - 1] || {};
    result.fetchMore({
      variables: {
        after: last.cursor
      },
      updateQuery: updateQuery
    });
  }, [result, updateQuery]);
  return (0, _react.useMemo)(function () {
    return _objectSpread(_objectSpread({}, result), {}, {
      error: missingRecord ? null : result.error,
      fetchMore: wrappedFetchMore
    });
  }, [result, wrappedFetchMore]);
};

var _default = useMessages;
exports["default"] = _default;