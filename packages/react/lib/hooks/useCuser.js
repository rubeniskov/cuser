"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _context = _interopRequireDefault(require("../utils/context"));

var _cache = _interopRequireDefault(require("../utils/cache"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-check

/** @typedef {import('@cuser/client').CuserClient} CuserClient */
var useCuser = function useCuser(opts) {
  var _useContext = (0, _react.useContext)(_context["default"]),
      client = _useContext.client;

  var cache = (0, _cache["default"])();

  if (!client) {
    throw new Error('Client not detected, please set the CuserProvider on top to allow getting the client by context');
  }

  return {
    /** @type {CuserClient} */
    client: client,
    cache: cache
  };
};

var _default = useCuser;
exports["default"] = _default;