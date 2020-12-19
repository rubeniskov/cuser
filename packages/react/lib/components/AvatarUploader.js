"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.AvatarUploader = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _react = require("react");

var _UploadIcon = _interopRequireDefault(require("../icons/UploadIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  display: inline;\n  & img {\n    width: 3rem;\n    border-radius: 50%;\n    border: solid #efefef 1px;\n    cursor: alias;\n  }\n  & label {\n    width: 1.5rem;\n    height: 1.5rem;\n    border-radius: 50%;\n    background-color: #fbfbfb;\n    display: block;\n    position: absolute;\n    right: -0.8rem;\n    bottom: 0;\n    cursor: pointer;\n    border: solid 1px #EFEFEF;\n  }\n  & label > svg {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    opacity: 0.4;\n    width: 1rem;\n    height: 1rem;\n  }\n  & > input[type=file] {\n    outline: none;\n    border: none;\n    width: 0;\n    height: 0;\n    opacity: 0;\n    padding: 0;\n    margin: 0;\n  }\n"]);

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

var isUploadSupported = function isUploadSupported() {
  return !navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/);
};

var resizeFitImage = function resizeFitImage(data, width, height, cb) {
  var image = new Image();
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;
  image.src = data;

  image.onload = function () {
    var scale = Math.max(canvas.width / image.width, canvas.height / image.height);
    var x = canvas.width / 2 - image.width / 2 * scale;
    var y = canvas.height / 2 - image.height / 2 * scale;
    ctx.drawImage(image, x, y, image.width * scale, image.height * scale);
    canvas.toBlob(function (blob) {
      cb(null, blob);
    });
  };

  image.onerror = function () {
    cb(new Error('Error resizing image'));
  };
};

var defaultAvatarGenerator = function defaultAvatarGenerator() {
  return "https://www.w3schools.com/w3images/avatar".concat(~~(Math.random() * 3 + 1), ".png");
};

var AvatarUploader = function AvatarUploader(_ref) {
  var className = _ref.className,
      _ref$avatarGenerator = _ref.avatarGenerator,
      avatarGenerator = _ref$avatarGenerator === void 0 ? defaultAvatarGenerator : _ref$avatarGenerator,
      _ref$onLoad = _ref.onLoad,
      onLoad = _ref$onLoad === void 0 ? function () {} : _ref$onLoad,
      _ref$onError = _ref.onError,
      onError = _ref$onError === void 0 ? function () {} : _ref$onError;

  var _useState = (0, _react.useState)(avatarGenerator()),
      _useState2 = _slicedToArray(_useState, 2),
      avatar = _useState2[0],
      setAvatar = _useState2[1];

  var handleUpload = (0, _react.useCallback)(function (evt) {
    var file = evt.target.files[0];
    var reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = function (evt) {
      var encoded = Buffer.from(reader.result).toString('base64');
      var data = "data:".concat(file.type, ";base64,").concat(encoded);
      resizeFitImage(data, 300, 300, function (err, blob) {
        if (err) return onError(err);
        onLoad(evt, blob);
        var reader = new FileReader();

        reader.onload = function () {
          var ed = Buffer.from(reader.result).toString('base64');
          var dt = "data:".concat(blob.type, ";base64,").concat(ed);
          setAvatar(dt);
        };

        reader.readAsArrayBuffer(blob);
      });
    };

    reader.onerror = function () {
      onError(reader.error);
    };
  }, []);
  var handleChangeAvatar = (0, _react.useCallback)(function (evt) {
    var avatar = avatarGenerator();
    setAvatar(avatar);
    onLoad(evt, avatar);
  }, []);
  (0, _react.useEffect)(function () {
    onLoad(null, avatar);
  }, []);
  var supported = isUploadSupported();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: className,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("img", {
      src: avatar,
      onClick: handleChangeAvatar
    }), supported && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("label", {
        htmlFor: "avatar",
        "aria-label": "Upload an image",
        title: "Upload an image",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_UploadIcon["default"], {})
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        id: "avatar",
        type: "file",
        onChange: handleUpload,
        accept: "image/*"
      })]
    })]
  });
};

exports.AvatarUploader = AvatarUploader;

var _default = (0, _styledComponents["default"])(AvatarUploader)(_templateObject());

exports["default"] = _default;