"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _useCuser2 = _interopRequireDefault(require("./useCuser"));

var _usePromiseResolver = _interopRequireDefault(require("./usePromiseResolver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var usePublishMessage = function usePublishMessage(variables) {
  var _useCuser = (0, _useCuser2["default"])(),
      client = _useCuser.client;

  var resolver = (0, _react.useCallback)(function (_ref) {
    var topicId = _ref.topicId,
        accessToken = _ref.accessToken,
        content = _ref.content;
    return client.publishMessage(topicId, accessToken, content);
  }, [client]);
  return (0, _usePromiseResolver["default"])(resolver, {
    variables: variables
  });
};

var _default = usePublishMessage;
exports["default"] = _default;