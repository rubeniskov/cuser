"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _AvatarUploader = _interopRequireDefault(require("./AvatarUploader"));

var _ListItem = _interopRequireDefault(require("./ListItem"));

var _LinkButton = _interopRequireDefault(require("./LinkButton"));

var _TextField = _interopRequireDefault(require("./TextField"));

var _PrivacyPolicyModal = _interopRequireDefault(require("./PrivacyPolicyModal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\nposition: relative;\n\nbutton {\n  background: none;\n  border: none;\n  position: absolute;\n  top: 0;\n  right: 0;\n  line-height: 3rem;\n  padding: 0 1rem;\n  margin: 0.1rem;\n  cursor: pointer;\n  opacity: 0.5;\n  color: #0a9fff;\n  &:disabled {\n    opacity: 0.2;\n    color: #cecece;\n    cursor: not-allowed;\n  }\n  &:hover {\n    opacity: 1;\n  }\n  svg {\n    width: 1.5rem;\n    fill: currentColor;\n    display: inline-block;\n    vertical-align: middle;\n  }\n}\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\ninput {\n  width: 1rem;\n  height: 1rem;\n  vertical-align: text-top;\n  cursor: pointer;\n  margin: 0 0.5rem;\n}\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var PrivacyPolicy = (0, _styledComponents["default"])(function (_ref) {
  var accepted = _ref.accepted,
      onChange = _ref.onChange,
      className = _ref.className;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      modalPrivacyPolicy = _useState2[0],
      setPrivacyPolicy = _useState2[1];

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      type: "checkbox",
      checked: accepted,
      onChange: onChange
    }), "Accept ", /*#__PURE__*/(0, _jsxRuntime.jsx)(_LinkButton["default"], {
      onClick: function onClick() {
        return setPrivacyPolicy(true);
      },
      children: "privacy policy"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_PrivacyPolicyModal["default"], {
      open: modalPrivacyPolicy,
      onClose: function onClose() {
        return setPrivacyPolicy(false);
      }
    })]
  });
})(_templateObject());

var Login = function Login(_ref2) {
  var className = _ref2.className,
      _ref2$onLogin = _ref2.onLogin,
      onLogin = _ref2$onLogin === void 0 ? function () {} : _ref2$onLogin;

  var _useState3 = (0, _react.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      username = _useState4[0],
      setUsername = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = _slicedToArray(_useState5, 2),
      acceptedPolicy = _useState6[0],
      setAcceptedPolicy = _useState6[1];

  var _useState7 = (0, _react.useState)(),
      _useState8 = _slicedToArray(_useState7, 2),
      error = _useState8[0],
      setError = _useState8[1];

  var _useState9 = (0, _react.useState)(),
      _useState10 = _slicedToArray(_useState9, 2),
      avatar = _useState10[0],
      setAvatar = _useState10[1];

  var handleUsernameChange = (0, _react.useCallback)(function (evt) {
    return setUsername(evt.target.value.replace(/\s+/, ''));
  }, []);
  var handleAcceptedPolicy = (0, _react.useCallback)(function (evt) {
    var checked = evt.target.checked;
    if (checked) setError(null);
    setAcceptedPolicy(checked);
  }, []);
  var handleLoginClick = (0, _react.useCallback)(function (evt) {
    if (username.length < 3) {
      return setError(new Error('Username must be at least 3 characteres of length'));
    }

    if (!acceptedPolicy) {
      return setError(new Error('You have to accept the privacy policy to publish messages'));
    }

    onLogin(evt, {
      username: username,
      avatar: avatar
    });
  }, [onLogin, username, avatar, acceptedPolicy]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_ListItem["default"], {
    className: className,
    error: error,
    side: /*#__PURE__*/(0, _jsxRuntime.jsx)(_AvatarUploader["default"], {
      onLoad: function onLoad(_, value) {
        return setAvatar(value);
      }
    }),
    actions: /*#__PURE__*/(0, _jsxRuntime.jsx)(PrivacyPolicy, {
      accepted: acceptedPolicy,
      onChange: handleAcceptedPolicy
    }),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_TextField["default"], {
      value: username,
      onChange: handleUsernameChange,
      placeholder: "username"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
      onClick: handleLoginClick,
      children: "Login"
    })]
  });
};

var _default = (0, _styledComponents["default"])(Login)(_templateObject2());

exports["default"] = _default;
;