"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _objectHash = _interopRequireDefault(require("object-hash"));

var _observableQuery = _interopRequireDefault(require("../utils/observableQuery"));

var _useCacheMemo = _interopRequireDefault(require("./useCacheMemo"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

/**
 * @typedef {Object} PromiseResolverOptions
 * @prop {Boolean} [suspense=false]
 * @prop {Boolean} [lazy=false]
 */

/** @typedef {PromiseResolverOptions & QueryOptions} PromiseResolverHookOptions */

/**
 *
 * @param {(variables: Record<string, any>) => Promise<any>} resolver
 * @param {PromiseResolverHookOptions} opts
 */
var usePromiseResolver = function usePromiseResolver(resolver) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$suspense = _ref.suspense,
      suspense = _ref$suspense === void 0 ? false : _ref$suspense,
      _ref$lazy = _ref.lazy,
      lazy = _ref$lazy === void 0 ? false : _ref$lazy,
      _ref$variables = _ref.variables,
      variables = _ref$variables === void 0 ? {} : _ref$variables,
      restOpts = _objectWithoutProperties(_ref, ["suspense", "lazy", "variables"]);

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      responseId = _useState2[0],
      setResponseId = _useState2[1];

  var fetchObservable = (0, _useCacheMemo["default"])(function () {
    return new _observableQuery["default"](resolver, _objectSpread(_objectSpread({}, restOpts), {}, {
      variables: variables,
      loading: !lazy
    }));
  }, [resolver]);
  (0, _react.useEffect)(function () {
    var invalidateCurrentResult = function invalidateCurrentResult() {
      setResponseId(function (x) {
        return x + 1;
      });
    };

    var subscription = fetchObservable.subscribe(invalidateCurrentResult, invalidateCurrentResult);
    return function () {
      subscription.unsubscribe();
    };
  }, [fetchObservable]);
  (0, _react.useEffect)(function () {
    fetchObservable.setVariables(variables);

    if (!lazy) {
      process.nextTick(function () {
        return fetchObservable.refetch();
      });
    }
  }, [(0, _objectHash["default"])(variables)]);
  var currentResult = (0, _react.useMemo)(function () {
    /** @type {QueryResult} */
    var result = fetchObservable.getCurrentResult();
    var helpers = {
      fetchMore: fetchObservable.fetchMore.bind(fetchObservable),
      subscribeToMore: fetchObservable.subscribeToMore.bind(fetchObservable),
      refetch: fetchObservable.refetch.bind(fetchObservable),
      clean: fetchObservable.clean.bind(fetchObservable),
      startPolling: fetchObservable.startPolling.bind(fetchObservable),
      stopPolling: fetchObservable.stopPolling.bind(fetchObservable)
    };
    return _objectSpread(_objectSpread({}, helpers), result);
  }, [fetchObservable, responseId]);

  if (suspense && currentResult.loading) {
    throw fetchObservable.result();
  }

  return currentResult;
};

var _default = usePromiseResolver;
exports["default"] = _default;