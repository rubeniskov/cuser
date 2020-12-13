"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _useCuser2 = _interopRequireDefault(require("./useCuser"));

var _usePromiseResolver3 = _interopRequireDefault(require("./usePromiseResolver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var useMessages = function useMessages(variables) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$subscribe = _ref.subscribe,
      subscribe = _ref$subscribe === void 0 ? true : _ref$subscribe,
      restOpts = _objectWithoutProperties(_ref, ["subscribe"]);

  var topicId = variables.topicId;

  var _useCuser = (0, _useCuser2["default"])(),
      client = _useCuser.client;

  var resolver = function resolver(resVars) {
    return client.getMessagesEdges(topicId, resVars);
  };

  var merge = function merge() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref2$edges = _ref2.edges,
        edges = _ref2$edges === void 0 ? [] : _ref2$edges,
        restState = _objectWithoutProperties(_ref2, ["edges"]);

    var data = arguments.length > 1 ? arguments[1] : undefined;
    return _objectSpread(_objectSpread(_objectSpread({}, restState), data), {}, {
      edges: [].concat(_toConsumableArray(edges), _toConsumableArray(data.edges))
    });
  };

  var _usePromiseResolver = (0, _usePromiseResolver3["default"])(resolver, _objectSpread(_objectSpread({}, restOpts), {}, {
    lazy: false,
    variables: variables,
    merge: merge
  })),
      _usePromiseResolver2 = _slicedToArray(_usePromiseResolver, 2),
      _ = _usePromiseResolver2[0],
      result = _usePromiseResolver2[1];

  var fetchMore = result.fetchMore,
      mergeData = result.mergeData,
      data = result.data;
  (0, _react.useEffect)(function () {
    if (subscribe) {
      return client.subscribe(variables.topicId, function (evt) {
        mergeData(function (prev) {
          var first = prev.edges[0];

          if (first) {
            return client.getMessagesEdges(topicId, {
              rootId: evt.value.replace(/^\/ipfs\//, ''),
              // rootId: evt.value,
              limit: prev.edges.length
            });
          }

          return prev;
        });
      });
    }
  }, [subscribe, topicId, data, mergeData]);
  var wrappedFetchMore = (0, _react.useCallback)(function () {
    var last = data.edges[data.edges.length - 1] || {};
    result.fetchMore({
      after: last.cursor
    });
  }, [fetchMore, data]);
  return _objectSpread(_objectSpread({}, result), {}, {
    fetchMore: wrappedFetchMore
  });
};

var _default = useMessages;
exports["default"] = _default;