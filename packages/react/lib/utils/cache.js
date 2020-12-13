"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var createCache = function createCache() {
  return {
    get: function get(name) {
      var value = localStorage.getItem(name);

      if (value) {
        return JSON.parse(value);
      }

      return undefined;
    },
    put: function put(name, value) {
      localStorage.setItem(name, JSON.stringify(value));
    },
    remove: function remove(name) {
      localStorage.removeItem(name);
    },
    clear: function clear() {
      localStorage.clear();
    }
  };
};

var _default = createCache;
exports["default"] = _default;