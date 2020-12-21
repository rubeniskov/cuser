"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.MessageActions = exports.MessagePublishActions = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _useDeleteMessage2 = _interopRequireDefault(require("../hooks/useDeleteMessage"));

var _useReplyMessage2 = _interopRequireDefault(require("../hooks/useReplyMessage"));

var _ReplayIcon = _interopRequireDefault(require("../icons/ReplayIcon"));

var _PencilIcon = _interopRequireDefault(require("../icons/PencilIcon"));

var _TrashIcon = _interopRequireDefault(require("../icons/TrashIcon"));

var _IconButton = _interopRequireDefault(require("./IconButton"));

var _Spinner = _interopRequireDefault(require("./Spinner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var MessagePublishActions = function MessagePublishActions(_ref) {
  var disabled = _ref.disabled,
      peerId = _ref.peerId,
      topicId = _ref.topicId,
      messageId = _ref.messageId,
      user = _ref.user,
      onEdit = _ref.onEdit;

  var _useDeleteMessage = (0, _useDeleteMessage2["default"])({
    topicId: topicId
  }),
      result = _useDeleteMessage.result,
      deleteMessage = _useDeleteMessage.deleteMessage;

  var handleDelete = (0, _react.useCallback)(function () {
    return deleteMessage(messageId);
  }, [messageId]);
  var handleEdit = (0, _react.useCallback)(function (evt) {
    return onEdit(evt, messageId);
  }, [messageId]);

  if (result.loading) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Spinner["default"], {});
  }

  return user.peerId === peerId && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton["default"], {
      title: "Edit message",
      onClick: handleEdit,
      disabled: disabled,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ReplayIcon["default"], {})
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton["default"], {
      title: "Delete message",
      onClick: handleDelete,
      disabled: disabled,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_PencilIcon["default"], {})
    })]
  });
};

exports.MessagePublishActions = MessagePublishActions;

var MessageActions = function MessageActions(_ref2) {
  var disabled = _ref2.disabled,
      user = _ref2.user,
      props = _objectWithoutProperties(_ref2, ["disabled", "user"]);

  var _useReplyMessage = (0, _useReplyMessage2["default"])({
    attach: false
  }),
      replyTo = _useReplyMessage.replyTo;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton["default"], {
      title: "Reply message",
      onClick: function onClick() {
        replyTo(user.username);
      },
      disabled: disabled,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_TrashIcon["default"], {})
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(MessagePublishActions, _objectSpread(_objectSpread({
      user: user
    }, props), {}, {
      disabled: disabled
    }))]
  });
};

exports.MessageActions = MessageActions;
var _default = MessageActions;
exports["default"] = _default;