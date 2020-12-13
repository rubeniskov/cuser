"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.MessageWriter = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _useAuth3 = _interopRequireDefault(require("../hooks/useAuth"));

var _usePublishMessage3 = _interopRequireDefault(require("../hooks/usePublishMessage"));

var _Avatar = _interopRequireDefault(require("./Avatar"));

var _ListItem = _interopRequireDefault(require("./ListItem"));

var _Login = _interopRequireDefault(require("./Login"));

var _Spinner = _interopRequireDefault(require("./Spinner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  img {\n    width: 3em;\n  }\n  pre {\n    background-color: #EFEFEF;\n    padding: 1rem;\n    color: red;\n  }\n  a {\n    text-decoration: none;\n    color: #0a9fff;\n    &:visited {\n      color: #0a9fff;\n    }\n  }\n  input {\n    height: 100%;\n    width: 100%;\n    box-sizing: border-box;\n    padding: 0.5rem;\n    font-size: 1rem;\n    border-color: #efefef;\n    border-style: solid;\n    border-radius: 0.5rem;\n    outline: none;\n    &:focus {\n      border-color: #0a9fff;\n    }\n    ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */\n      color: #cecece;\n      opacity: 1; /* Firefox */\n    }\n  }\n\n  button {\n    background: none;\n    border: none;\n    position: absolute;\n    top: 0;\n    right: 0;\n    line-height: 3rem;\n    padding: 0 1rem;\n    margin: 0.1rem;\n    cursor: pointer;\n    opacity: 0.5;\n    color: #0a9fff;\n    &:disabled {\n      opacity: 0.2;\n      color: #cecece;\n      cursor: not-allowed;\n    }\n    &:hover {\n      opacity: 1;\n    }\n    svg {\n      width: 1.5rem;\n      fill: currentColor;\n      display: inline-block;\n      vertical-align: middle;\n    }\n  }\n"]);

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

var MessageWriter = function MessageWriter(_ref) {
  var topicId = _ref.topicId,
      className = _ref.className;

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  var _useAuth = (0, _useAuth3["default"])(),
      _useAuth2 = _slicedToArray(_useAuth, 2),
      authenticate = _useAuth2[0],
      auth = _useAuth2[1];

  var _usePublishMessage = (0, _usePublishMessage3["default"])({
    topicId: topicId
  }),
      _usePublishMessage2 = _slicedToArray(_usePublishMessage, 2),
      publishMessage = _usePublishMessage2[0],
      publisher = _usePublishMessage2[1];

  var _auth$data = auth.data;
  _auth$data = _auth$data === void 0 ? {} : _auth$data;
  var accessToken = _auth$data.accessToken,
      avatar = _auth$data.avatar;
  var error = auth.error || publisher.error;
  var loading = auth.loading || publisher.loading;
  (0, _react.useEffect)(function () {
    if (publisher.loading) {
      setValue('');
    }
  }, [publisher.loading]);
  var handleChange = (0, _react.useCallback)(function (evt) {
    return setValue(evt.target.value);
  }, []);
  var handlePublish = (0, _react.useCallback)(function (_) {
    return publishMessage({
      content: value,
      accessToken: accessToken
    });
  }, [accessToken, value]);
  var handleKeyDown = (0, _react.useCallback)(function (evt) {
    return evt.which === 13 && handlePublish(evt);
  }, [handlePublish]);
  var handleLogin = (0, _react.useCallback)(function (_, payload) {
    return authenticate(payload);
  }, [accessToken, value]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [error && /*#__PURE__*/(0, _jsxRuntime.jsx)("pre", {
      children: [error.message, error.extendedInfo].filter(Boolean).join('\n')
    }), accessToken ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_ListItem["default"], {
        side: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Avatar["default"], {
          avatar: avatar
        }),
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
          type: "text",
          disabled: loading,
          onKeyUp: handleKeyDown,
          onChange: handleChange,
          value: value,
          placeholder: "Write a comment"
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
          disabled: !value || loading,
          onClick: handlePublish,
          children: [!loading && /*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            viewBox: "0 0 512 512",
            children: [null
            /* Font Awesome Free 5.15.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) */
            , /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
              d: "M440 6.5L24 246.4c-34.4 19.9-31.1 70.8 5.7 85.9L144 379.6V464c0 46.4 59.2 65.5 86.6 28.6l43.8-59.1 111.9 46.2c5.9 2.4 12.1 3.6 18.3 3.6 8.2 0 16.3-2.1 23.6-6.2 12.8-7.2 21.6-20 23.9-34.5l59.4-387.2c6.1-40.1-36.9-68.8-71.5-48.9zM192 464v-64.6l36.6 15.1L192 464zm212.6-28.7l-153.8-63.5L391 169.5c10.7-15.5-9.5-33.5-23.7-21.2L155.8 332.6 48 288 464 48l-59.4 387.3z"
            })]
          }), loading && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Spinner["default"], {})]
        }), error && /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          children: error.message
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: {
          textAlign: 'right'
        },
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
          href: "#",
          onClick: function onClick() {
            return auth.logout();
          },
          children: "Logout"
        })
      })]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_Login["default"], {
      onLogin: handleLogin,
      className: className
    })]
  });
};

exports.MessageWriter = MessageWriter;

var _default = (0, _styledComponents["default"])(MessageWriter)(_templateObject());

exports["default"] = _default;