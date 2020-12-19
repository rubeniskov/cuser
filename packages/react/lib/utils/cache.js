"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// @ts-check

/**
 * @typedef {Object} CacheStore
 * @prop {(name: String) => any} get
 * @prop {(name: String, value: any) => void} put
 * @prop {(name: String) => void} remove
 * @prop {() => void} clear
 */

/**
 * @returns {CacheStore}
 */
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