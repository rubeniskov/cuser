"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.AvatarUploader = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _react = require("react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  background-color: #efefef;\n  border-radius: 50%;\n  width: 3rem;\n  height: 3rem;\n  position: relative;\n  cursor: pointer;\n  & > svg {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    opacity: 0.4;\n  }\n  & > input[type=file] {\n    outline: none;\n    border: none;\n    width: 100%;\n    height: 100%;\n    opacity: 0;\n    padding: 0;\n    margin: 0;\n  }\n"]);

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

var AvatarUploader = function AvatarUploader(_ref) {
  var className = _ref.className,
      _ref$onLoad = _ref.onLoad,
      onLoad = _ref$onLoad === void 0 ? function () {} : _ref$onLoad,
      _ref$onError = _ref.onError,
      onError = _ref$onError === void 0 ? function () {} : _ref$onError;

  var _useState = (0, _react.useState)(),
      _useState2 = _slicedToArray(_useState, 2),
      img = _useState2[0],
      setImg = _useState2[1];

  var handleUpload = (0, _react.useCallback)(function (evt) {
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function (evt) {
      var data = 'data:image/svg+xml;base64,' + global.btoa(reader.result);
      onLoad(evt, data);
      setImg(data);
    };

    reader.onerror = function () {
      onError(reader.error);
    };
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    children: img ? /*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
      src: img
    }) : /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        type: "file",
        onChange: handleUpload
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512",
        children: [null
        /* Font Awesome Free 5.15.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) */
        , /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
          d: "M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
        })]
      })]
    })
  });
};

exports.AvatarUploader = AvatarUploader;

var _default = (0, _styledComponents["default"])(AvatarUploader)(_templateObject());

exports["default"] = _default;