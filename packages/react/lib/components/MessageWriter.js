"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.MessageWriter = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _useAuth2 = _interopRequireDefault(require("../hooks/useAuth"));

var _usePublishMessage2 = _interopRequireDefault(require("../hooks/usePublishMessage"));

var _Avatar = _interopRequireDefault(require("./Avatar"));

var _ListItem = _interopRequireDefault(require("./ListItem"));

var _Login = _interopRequireDefault(require("./Login"));

var _PublisherInput = _interopRequireDefault(require("./PublisherInput"));

var _LinkButton = _interopRequireDefault(require("./LinkButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

/**
 * @typedef {Object} MessageWriterProps
 * @prop {String} className
 */

/**
 * @param {import('react').PropsWithoutRef<MessageWriterProps & CuserAuthHookOptions & CuserPublishMessageHookOptions>} props
 */
var MessageWriter = function MessageWriter(_ref) {
  var className = _ref.className,
      restProps = _objectWithoutProperties(_ref, ["className"]);

  var _useAuth = (0, _useAuth2["default"])(restProps),
      auth = _useAuth.auth,
      user = _useAuth.user,
      authenticate = _useAuth.authenticate,
      logout = _useAuth.logout;

  var _usePublishMessage = (0, _usePublishMessage2["default"])(restProps),
      publisher = _usePublishMessage.result,
      publishMessage = _usePublishMessage.publishMessage;

  var accessToken = auth.data;
  var _user$data = user.data;
  _user$data = _user$data === void 0 ? {} : _user$data;
  var avatar = _user$data.avatar,
      username = _user$data.username;
  var _publisher$data = publisher.data;
  _publisher$data = _publisher$data === void 0 ? {} : _publisher$data;
  var _publisher$data$value = _publisher$data.value,
      hash = _publisher$data$value === void 0 ? '' : _publisher$data$value;
  var error = user.error || auth.error || publisher.error;
  var loading = user.loading || auth.loading || publisher.loading;
  var handlePublish = (0, _react.useCallback)(function (_, value) {
    publishMessage(value);
  }, []);
  var handleLogin = (0, _react.useCallback)(function (_, payload) {
    return authenticate(payload);
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
      children: accessToken ? "Welcome ".concat(username) : "Please login to publish messages"
    }), accessToken ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListItem["default"], {
      error: error,
      side: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Avatar["default"], {
        avatar: avatar,
        loading: user.loading || auth.loading
      }),
      actions: /*#__PURE__*/(0, _jsxRuntime.jsx)(_LinkButton["default"], {
        onClick: logout,
        children: "Logout"
      }),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PublisherInput["default"], {
        defaultValue: '@nice',
        loading: loading,
        onSend: handlePublish
      }, hash.slice(-15))
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_Login["default"], {
      onLogin: handleLogin,
      className: className
    })]
  });
};

exports.MessageWriter = MessageWriter;
var _default = MessageWriter;
exports["default"] = _default;