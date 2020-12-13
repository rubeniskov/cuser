"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _useCuser2 = _interopRequireDefault(require("./useCuser"));

var _usePromiseResolver3 = _interopRequireDefault(require("./usePromiseResolver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var useAuth = function useAuth() {
  var _useCuser = (0, _useCuser2["default"])(),
      client = _useCuser.client,
      cache = _useCuser.cache;

  var resolver = (0, _react.useCallback)(function (_ref) {
    var username = _ref.username,
        avatar = _ref.avatar;
    return client.authenticate(username, avatar).then(function (authResult) {
      var result = _objectSpread({
        username: username,
        avatar: avatar
      }, authResult);

      cache.put('@cuser/auth', result);
      return result;
    });
  }, [client, cache]);

  var _usePromiseResolver = (0, _usePromiseResolver3["default"])(resolver, {
    data: cache.get('@cuser/auth')
  }),
      _usePromiseResolver2 = _slicedToArray(_usePromiseResolver, 2),
      authenticate = _usePromiseResolver2[0],
      auth = _usePromiseResolver2[1];

  var logout = (0, _react.useCallback)(function () {
    cache.remove('@cuser/auth');
    auth.clean();
  }, [cache, auth]);
  return [authenticate, (0, _react.useMemo)(function () {
    return _objectSpread(_objectSpread({}, auth), {}, {
      logout: logout
    });
  }, [auth, logout])];
};

var _default = useAuth;
exports["default"] = _default;