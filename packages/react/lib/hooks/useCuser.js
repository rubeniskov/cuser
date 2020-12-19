"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _context = _interopRequireDefault(require("../utils/context"));

var _usePromiseResolver = _interopRequireDefault(require("./usePromiseResolver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @typedef {Object} CuserHookOptions
 * @prop {Boolean} [suspense=true]
 * @prop {CuserClient} [client] cuser client
 * @prop {EventEmitter} [emitter] event emitter
 * @prop {CacheStore} [cache] cache to store internal state data
 * @prop {String} [topicId] topicId whereas the client will take the source of the data
 */

/**
 *
 * @param {CuserHookOptions} [opts]
 */
var useCuser = function useCuser(opts) {
  var _useContext = (0, _react.useContext)(_context["default"]),
      ctxClient = _useContext.client,
      ctxEmitter = _useContext.emitter,
      ctxCache = _useContext.cache,
      ctxTopicId = _useContext.topicId;

  var _opts = _objectSpread({}, opts),
      _opts$suspense = _opts.suspense,
      suspense = _opts$suspense === void 0 ? true : _opts$suspense,
      _opts$emitter = _opts.emitter,
      emitter = _opts$emitter === void 0 ? ctxEmitter : _opts$emitter,
      _opts$cache = _opts.cache,
      cache = _opts$cache === void 0 ? ctxCache : _opts$cache,
      _opts$topicId = _opts.topicId,
      topicId = _opts$topicId === void 0 ? ctxTopicId : _opts$topicId,
      _opts$client = _opts.client,
      client = _opts$client === void 0 ? ctxClient : _opts$client;

  if (!topicId) {
    throw new Error('Topic id must be defined, please set the CuserProvider on top to allow getting the client by context or define by props');
  }

  if (!client) {
    throw new Error('Client not detected, please set the CuserProvider on top to allow getting the client by context or define by props');
  }

  return (0, _react.useMemo)(function () {
    return {
      /** @type {CuserClient} */
      client: client,

      /** @type {CacheStore} */
      cache: cache,

      /** @type {EventEmitter} */
      emitter: emitter,

      /** @type {String} */
      get topicId() {
        return topicId;
      },

      /** @type {String} */
      get peerId() {
        var result = (0, _usePromiseResolver["default"])((0, _react.useCallback)(function () {
          return client.peerId();
        }, [client]), {
          suspense: suspense
        });
        return result.data;
      }

    };
  }, [client, cache]);
};

var _default = useCuser;
exports["default"] = _default;