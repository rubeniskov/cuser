"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _suspense = require("../utils/suspense");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var usePromiseResolver = function usePromiseResolver(resolver) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$lazy = _ref.lazy,
      lazy = _ref$lazy === void 0 ? true : _ref$lazy,
      _ref$suspense = _ref.suspense,
      suspense = _ref$suspense === void 0 ? false : _ref$suspense,
      _ref$variables = _ref.variables,
      variables = _ref$variables === void 0 ? {} : _ref$variables,
      data = _ref.data,
      _ref$merge = _ref.merge,
      merge = _ref$merge === void 0 ? function (_, data) {
    return data;
  } : _ref$merge;

  var _useState = (0, _react.useState)({
    data: data,
    loading: !lazy
  }),
      _useState2 = _slicedToArray(_useState, 2),
      result = _useState2[0],
      setResult = _useState2[1];

  var doFetch = (0, _react.useCallback)(function (fetchVariables) {
    setResult(_objectSpread(_objectSpread({}, result), {}, {
      loading: true
    }));
    resolver(_objectSpread(_objectSpread({}, variables), fetchVariables)).then(function (data) {
      setResult({
        data: merge(result.data, data),
        loading: false
      });
    }, function (error) {
      setResult({
        error: error,
        loading: false
      });
    });
  }, [resolver, result].concat(_toConsumableArray(Object.values(variables))));
  (0, _react.useEffect)(function () {
    if (!lazy) doFetch();
  }, [lazy]);

  if (suspense && result.loading) {
    (0, _suspense.suspendPromise)(new Promise(function (resolve) {
      return !result.loading && resolve();
    })).read();
  }
  /**
   * Merges data
   */


  var mergeData = (0, _react.useCallback)(function (setData) {
    Promise.resolve(setData(result.data)).then(function (data) {
      return setResult(_objectSpread(_objectSpread({}, result), {}, {
        data: data
      }));
    });
  }, [result]);
  var fetchMore = (0, _react.useCallback)(function (opts) {
    return doFetch(opts);
  }, [doFetch]);
  var clean = (0, _react.useCallback)(function () {
    return setResult(_objectSpread(_objectSpread({}, result), {}, {
      data: undefined
    }));
  }, [result]);
  var api = (0, _react.useMemo)(function () {
    return _objectSpread(_objectSpread({}, result), {}, {
      fetchMore: fetchMore,
      mergeData: mergeData,
      refetch: doFetch,
      clean: clean
    });
  }, [result, fetchMore, mergeData]);
  return [doFetch, api];
};

var _default = usePromiseResolver;
exports["default"] = _default;