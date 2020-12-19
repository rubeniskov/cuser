"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectHash = _interopRequireDefault(require("object-hash"));

var _useCacheRef = _interopRequireDefault(require("./useCacheRef"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-check
var useCacheMemo = function useCacheMemo(cb) {
  var deps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var memoRef = (0, _useCacheRef["default"])((0, _objectHash["default"])(deps.map(function (v) {
    return v.toString();
  })));

  if (memoRef.current) {
    return memoRef.current;
  }

  return memoRef.current = cb();
};

var _default = useCacheMemo;
exports["default"] = _default;