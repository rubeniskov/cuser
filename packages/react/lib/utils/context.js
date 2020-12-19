"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _cache = _interopRequireDefault(require("../utils/cache"));

var _emitter = _interopRequireDefault(require("../utils/emitter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = /*#__PURE__*/(0, _react.createContext)({
  emitter: (0, _emitter["default"])(),
  cache: (0, _cache["default"])(),
  client: null,
  topicId: null
});

exports["default"] = _default;