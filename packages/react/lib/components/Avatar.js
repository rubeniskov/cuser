"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Avatar = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _isIpfs = _interopRequireDefault(require("is-ipfs"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Spinner = _interopRequireDefault(require("./Spinner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  & > img {\n    width: 3rem;\n    border-radius: 50%;\n    border: solid #efefef 1px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var dummyProfile = 'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png';

var Avatar = function Avatar(_ref) {
  var className = _ref.className,
      loading = _ref.loading,
      avatar = _ref.avatar;

  if (_isIpfs["default"].cid(avatar)) {
    avatar = "https://cloudflare-ipfs.com/ipfs/".concat(avatar);
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: loading ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Spinner["default"], {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
      src: avatar
    })
  });
};

exports.Avatar = Avatar;

var _default = (0, _styledComponents["default"])(Avatar)(_templateObject());

exports["default"] = _default;