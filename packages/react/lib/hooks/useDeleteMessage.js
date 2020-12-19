"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _useCuser2 = _interopRequireDefault(require("./useCuser"));

var _usePromiseResolver = _interopRequireDefault(require("./usePromiseResolver"));

var _useAuth2 = _interopRequireDefault(require("./useAuth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useDeleteMessage = function useDeleteMessage(opts) {
  var _useCuser = (0, _useCuser2["default"])(opts),
      client = _useCuser.client,
      topicId = _useCuser.topicId;

  var _useAuth = (0, _useAuth2["default"])(),
      auth = _useAuth.auth;

  var accessToken = auth.data;
  var resolver = (0, _react.useCallback)(function (_ref) {
    var topicId = _ref.topicId,
        accessToken = _ref.accessToken,
        messageId = _ref.messageId;
    return client.deleteMessage(topicId, accessToken, messageId);
  }, [client]);
  var result = (0, _usePromiseResolver["default"])(resolver, _objectSpread(_objectSpread({}, opts), {}, {
    lazy: true,
    variables: {
      accessToken: accessToken,
      topicId: topicId
    }
  }));
  var deleteMessage = (0, _react.useCallback)(function (messageId) {
    return result.refetch({
      variables: {
        messageId: messageId
      }
    });
  }, []);
  return (0, _react.useMemo)(function () {
    return {
      result: result,
      deleteMessage: deleteMessage
    };
  }, [result, deleteMessage]);
  ;
};

var _default = useDeleteMessage;
exports["default"] = _default;