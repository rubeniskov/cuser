"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.PublisherInput = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _clsx = _interopRequireDefault(require("clsx"));

var _useFocus = _interopRequireDefault(require("../hooks/useFocus"));

var _Spinner = _interopRequireDefault(require("./Spinner"));

var _IconButton = _interopRequireDefault(require("./IconButton"));

var _PlaneIcon = _interopRequireDefault(require("../icons/PlaneIcon"));

var _ItalicIcon = _interopRequireDefault(require("../icons/ItalicIcon"));

var _ListIcon = _interopRequireDefault(require("../icons/ListIcon"));

var _BoldIcon = _interopRequireDefault(require("../icons/BoldIcon"));

var _ScratchIcon = _interopRequireDefault(require("../icons/ScratchIcon"));

var _CodeIcon = _interopRequireDefault(require("../icons/CodeIcon"));

var _LinkIcon = _interopRequireDefault(require("../icons/LinkIcon"));

var _HighlightIcon = _interopRequireDefault(require("../icons/HighlightIcon"));

var _MarkdownIcon = _interopRequireDefault(require("../icons/MarkdownIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  border-color: #efefef;\n  border-style: solid;\n  border-radius: 0.5rem;\n  .markdown-trademark {\n    position: absolute;\n    width: 1rem;\n    top: 5px;\n    right: 5px;\n    opacity: 0.3;\n  }\n  textarea {\n    transition: min-height 200ms linear;\n    display: block;\n    background: none;\n    min-height: 3rem;\n    width: 100%;\n    max-height: 20rem;\n    font-family: inherit;\n    box-sizing: border-box;\n    padding: 0.5rem;\n    font-size: 1rem;\n    outline: none;\n    border: none;\n    resize: none;\n    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */\n      color: #cecece;\n      opacity: 1; /* Firefox */\n    }\n  }\n  &.focused textarea {\n      border-color: #0a9fff;\n      min-height: 10rem;\n    }\n  .editor-actions {\n    background: #efefef;\n    font-size: 1.5rem;\n    opacity: 0;\n    height: 0;\n    transition: opacity 200ms linear;\n    > button {\n      margin: 0 0.5rem;\n    }\n  }\n  &.focused .editor-actions {\n    height: auto;\n    opacity: 1;\n  }\n  .leyend {\n    position: absolute;\n    bottom: 30px;\n    right: 0;\n    font-size: 0.5rem;\n    margin: 0 0.2rem;\n    opacity: 0.2;\n  }\n  .remain {\n    position: absolute;\n    bottom: 5px;\n    right: 5px;\n    font-size: 0.75rem;\n    margin: 0 0.2rem;\n    opacity: 0.2;\n  }\n  .btn-send {\n    background: none;\n    border: none;\n    position: absolute;\n    bottom: 2.5rem;\n    right: 0;\n    line-height: 3rem;\n    padding: 0 1rem;\n    margin: 0.1rem;\n    cursor: pointer;\n    opacity: 0.5;\n    color: #0a9fff;\n    &:disabled {\n      opacity: 0.2;\n      color: #cecece;\n      cursor: not-allowed;\n    }\n    &:hover {\n      opacity: 1;\n    }\n    svg {\n      width: 1.5rem;\n      fill: currentColor;\n      display: inline-block;\n      vertical-align: middle;\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * @typedef {Object} PublisherInputProps
 * @prop {String} [className]
 * @prop {ReactNode} [children]
 * @prop {Boolean} [loading]
 * @prop {Function} [onBlur]
 * @prop {String} [defaultValue]
 * @prop {Number} [maxLength=512]
 * @prop {(evt: SyntheticEvent, value: String) => void} [onSend]
 */

/**
 * @param {import('react').PropsWithRef<PublisherInputProps>} props
 */
var PublisherInput = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  /** @type {PublisherInputProps} */
  var className = props.className,
      loading = props.loading,
      _props$defaultValue = props.defaultValue,
      defaultValue = _props$defaultValue === void 0 ? '' : _props$defaultValue,
      _props$onBlur = props.onBlur,
      onBlur = _props$onBlur === void 0 ? function () {} : _props$onBlur,
      onSend = props.onSend,
      _props$maxLength = props.maxLength,
      maxLength = _props$maxLength === void 0 ? 1024 : _props$maxLength;
  var wrapperRef = (0, _react.useRef)();
  var textareaRef = (0, _react.useRef)();
  var focused = (0, _useFocus["default"])(wrapperRef, function (evt, focused) {
    return !focused && onBlur(evt);
  });

  var _useState = (0, _react.useState)(defaultValue),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var handleChange = (0, _react.useCallback)(function (evt) {
    var value = evt.target.value;

    if (value.length <= maxLength) {
      setValue(value);
    }
  }, []);
  var checkDiff = (0, _react.useCallback)(function (value) {
    return value !== defaultValue;
  }, [defaultValue]);
  var handleClick = (0, _react.useCallback)(function (evt) {
    return checkDiff(value) && onSend(evt, value);
  }, [onSend, value]);
  var handleKeyDown = (0, _react.useCallback)(function (evt) {
    if (onSend && evt.altKey && evt.which === 13) {
      onSend(evt, value);
    }
  }, [onSend, value]);
  var symbols = {
    'bold': function bold(value) {
      return "**".concat(value, "**");
    },
    'italic': function italic(value) {
      return "_".concat(value, "_");
    },
    'scratch': function scratch(value) {
      return "~~".concat(value, "~~");
    },
    'list': function list(value) {
      return value.split(/\n+/).map(function (v) {
        return "- ".concat(v);
      }).join('\n');
    },
    'highlight': function highlight(value) {
      return "`".concat(value, "`");
    },
    'code': function code(value) {
      return ['```', value, '```'].join('\n');
    },
    'link': function link(value) {
      return "[link](".concat(value, ")");
    }
  };

  var handleAction = function handleAction(evt) {
    var _textareaRef$current = textareaRef.current,
        selectionStart = _textareaRef$current.selectionStart,
        selectionEnd = _textareaRef$current.selectionEnd;
    var selection = value.substring(selectionStart, selectionEnd);
    var pvalue = value.substring(0, selectionStart);
    pvalue += symbols[evt.currentTarget.id](selection);
    pvalue += value.substring(selectionEnd);
    setValue(pvalue);
    textareaRef.current.focus();
  };

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    ref: wrapperRef,
    className: (0, _clsx["default"])(className, {
      'focused': focused
    }),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_MarkdownIcon["default"], {
      className: "markdown-trademark"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("textarea", {
      ref: textareaRef,
      disabled: loading,
      onKeyUp: handleKeyDown,
      onChange: handleChange,
      value: value,
      placeholder: "Write a comment"
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      className: "editor-actions",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton["default"], {
        id: "bold",
        onClick: handleAction,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_BoldIcon["default"], {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton["default"], {
        id: "italic",
        onClick: handleAction,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItalicIcon["default"], {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton["default"], {
        id: "scratch",
        onClick: handleAction,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ScratchIcon["default"], {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton["default"], {
        id: "link",
        onClick: handleAction,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_LinkIcon["default"], {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton["default"], {
        id: "list",
        onClick: handleAction,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ListIcon["default"], {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton["default"], {
        id: "highlight",
        onClick: handleAction,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_HighlightIcon["default"], {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton["default"], {
        id: "code",
        onClick: handleAction,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_CodeIcon["default"], {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_IconButton["default"], {
        className: "btn-send",
        disabled: !checkDiff(value) || loading,
        onClick: handleClick,
        children: loading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Spinner["default"], {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_PlaneIcon["default"], {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("small", {
        className: "leyend",
        children: "Alt+Enter to send"
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("small", {
        className: "remain",
        children: ["Remain ", maxLength - value.length]
      })]
    })]
  });
});
exports.PublisherInput = PublisherInput;

var _default = (0, _styledComponents["default"])(PublisherInput)(_templateObject());

exports["default"] = _default;