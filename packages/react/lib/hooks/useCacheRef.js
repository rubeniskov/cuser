"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

// @ts-check
var cacheContext = /*#__PURE__*/(0, _react.createContext)({});

var useCacheRef = function useCacheRef(hash) {
  var cacheCtx = (0, _react.useContext)(cacheContext);
  return {
    set current(value) {
      cacheCtx[hash] = value;
    },

    get current() {
      return cacheCtx[hash];
    }

  };
};

var _default = useCacheRef;
exports["default"] = _default;