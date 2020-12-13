"use strict";

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _AvatarUploader = _interopRequireDefault(require("./AvatarUploader"));

var _ListItem = _interopRequireDefault(require("./ListItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Login = function Login(_ref) {
  var className = _ref.className,
      _ref$onLogin = _ref.onLogin,
      onLogin = _ref$onLogin === void 0 ? function () {} : _ref$onLogin;

  var _useState = (0, _react.useState)(''),
      _useState2 = _slicedToArray(_useState, 2),
      username = _useState2[0],
      setUsername = _useState2[1];

  var _useState3 = (0, _react.useState)("https://www.w3schools.com/w3images/avatar".concat(~~(Math.random() * 3 + 1), ".png")),
      _useState4 = _slicedToArray(_useState3, 2),
      avatar = _useState4[0],
      setAvatar = _useState4[1];

  var handleUsernameChange = (0, _react.useCallback)(function (evt) {
    return setUsername(evt.target.value);
  }, []);
  var handleClick = (0, _react.useCallback)(function (evt) {
    return onLogin(evt, {
      username: username,
      avatar: avatar
    });
  }, [onLogin, username, avatar]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ListItem["default"], {
    className: className,
    side: /*#__PURE__*/(0, _jsxRuntime.jsx)(_AvatarUploader["default"], {
      onLoad: function onLoad(_, value) {
        return setAvatar(value);
      }
    }),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      type: "text",
      value: username,
      onChange: handleUsernameChange,
      placeholder: "username"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      onClick: handleClick,
      children: "Login"
    })]
  });
};

module.exports = Login;