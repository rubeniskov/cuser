"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _PublisherInput = _interopRequireDefault(require("./PublisherInput"));

var _useUpdateMessage2 = _interopRequireDefault(require("../hooks/useUpdateMessage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var MessageUpdater = function MessageUpdater(_ref) {
  var messageId = _ref.messageId,
      data = _ref.data,
      onAbort = _ref.onAbort,
      restProps = _objectWithoutProperties(_ref, ["messageId", "data", "onAbort"]);

  var publisherRef = (0, _react.useRef)();

  var _useUpdateMessage = (0, _useUpdateMessage2["default"])(restProps),
      result = _useUpdateMessage.result,
      updateMessage = _useUpdateMessage.updateMessage;

  var handleUpdate = (0, _react.useCallback)(function (_, value) {
    updateMessage(messageId, value);
  }, [messageId]);
  var handleBlur = (0, _react.useCallback)(function (evt) {
    if (onAbort) {
      onAbort(evt);
    }
  }, [onAbort]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_PublisherInput["default"], {
    ref: publisherRef,
    onBlur: handleBlur,
    loading: result.loading,
    onSend: handleUpdate,
    defaultValue: data
  });
};

var _default = MessageUpdater;
exports["default"] = _default;