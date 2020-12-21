"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.MessageWriter = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _hash = _interopRequireDefault(require("../utils/hash"));

var _useAuth2 = _interopRequireDefault(require("../hooks/useAuth"));

var _usePublishMessage2 = _interopRequireDefault(require("../hooks/usePublishMessage"));

var _useReplyMessage = _interopRequireDefault(require("../hooks/useReplyMessage"));

var _Avatar = _interopRequireDefault(require("./Avatar"));

var _ListItem = _interopRequireDefault(require("./ListItem"));

var _Login = _interopRequireDefault(require("./Login"));

var _Status = _interopRequireDefault(require("./Status"));

var _PublisherInput = _interopRequireDefault(require("./PublisherInput"));

var _LinkButton = _interopRequireDefault(require("./LinkButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  .actions > * {\n    margin-right: 15px;\n  }\n  .title {\n    position: relative;\n  }\n  .status {\n    position: absolute;\n    right: 0.5rem;\n    top: 0.5rem;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

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

  var replayer = (0, _useReplyMessage["default"])();

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
  var publishPointer = _publisher$data.value;
  var error = user.error || auth.error || publisher.error;
  var loading = user.loading || auth.loading || publisher.loading;
  var hash = (0, _react.useMemo)(function () {
    return (0, _hash["default"])(publishPointer + replayer.value);
  }, [publishPointer, replayer.value]);
  var replyTo = (0, _react.useMemo)(function () {
    return replayer.value ? "@".concat(replayer.value) : '';
  }, [replayer.value]);
  (0, _react.useEffect)(function () {
    replayer.clear();
  }, [publishPointer]);
  var handlePublish = (0, _react.useCallback)(function (_, value) {
    publishMessage(value);
  }, []);
  var handleLogin = (0, _react.useCallback)(function (_, payload) {
    return authenticate(payload);
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("h3", {
      className: "title",
      children: [accessToken ? "Welcome ".concat(username) : "Please login to publish messages", " ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_Status["default"], {
        className: "status"
      })]
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
        defaultValue: replyTo,
        loading: loading,
        onSend: handlePublish
      }, hash)
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_Login["default"], {
      onLogin: handleLogin,
      className: className
    })]
  });
};

exports.MessageWriter = MessageWriter;

var _default = (0, _styledComponents["default"])(MessageWriter)(_templateObject());

exports["default"] = _default;