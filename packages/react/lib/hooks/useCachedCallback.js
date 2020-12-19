"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _objectHash = _interopRequireDefault(require("object-hash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var cacheContext = /*#__PURE__*/(0, _react.createContext)({});

var useCacheRef = function useCacheRef(resolver) {
  var cacheCtx = (0, _react.useContext)(cacheContext);
  var hash = (0, _objectHash["default"])(resolver.toString());
  return cacheCtx[hash] = cacheCtx[hash] || {};
};

var useCachedCallback = function useCachedCallback(callback, deps) {
  var cacheHashRef = useCacheRef(callback);
  return (0, _react.useCallback)(function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var hash = (0, _objectHash["default"])(args);

    if (!cacheHashRef[hash]) {
      return cacheHashRef[hash] = callback.apply(void 0, args);
    }

    return cacheHashRef[hash];
  }, [callback].concat(_toConsumableArray(deps)));
};

var _default = useCachedCallback;
exports["default"] = _default;