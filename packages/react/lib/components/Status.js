"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var _react = require("react");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _clsx = _interopRequireDefault(require("clsx"));

var _useCuser2 = _interopRequireDefault(require("../hooks/useCuser"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  width: 5px;\n  height: 5px;\n  border-radius: 50%;\n  display: inline-block;\n  border: 1px solid;\n  background-color: #ececec;\n  color: #b4b5b4;\n\n  &.healthy {\n    background-color: #75e844;\n    color: #7db964;\n  }\n\n  &.degraded {\n    background-color: #e8e344;\n    color: #b9b764;\n  }\n\n  &.unhealthy {\n    background-color: #e84444;\n    color: #b96464;\n  }\n"]);

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

var Status = function Status(_ref) {
  var className = _ref.className;

  var _useCuser = (0, _useCuser2["default"])(),
      client = _useCuser.client;

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      status = _useState2[0],
      setStatus = _useState2[1];

  (0, _react.useEffect)(function () {
    Promise.resolve(client._node).then(function (node) {
      setStatus(node.isOnline() + 0);
    });
  }, []);
  console.log(status);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    title: "status online",
    className: (0, _clsx["default"])(className, ['unhealthy', 'healthy'][status])
  });
};

var _default = (0, _styledComponents["default"])(Status)(_templateObject());

exports["default"] = _default;