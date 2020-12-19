"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _useCuser2 = _interopRequireDefault(require("./useCuser"));

var _usePromiseResolver = _interopRequireDefault(require("./usePromiseResolver"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @ts-check

/** @typedef {import('./useCuser').CuserHookOptions} CuserHookOptions */

/** @typedef {CuserHookOptions} CuserAuthHookOptions */

/**
 *
 * @param {CuserAuthHookOptions} [opts]
 */
var useAuth = function useAuth(opts) {
  var _useCuser = (0, _useCuser2["default"])(opts),
      client = _useCuser.client,
      cache = _useCuser.cache;

  var resolverAuth = (0, _react.useCallback)(function (_ref) {
    var username = _ref.username,
        avatar = _ref.avatar;
    return client.authenticate(username, avatar).then(function (_ref2) {
      var accessToken = _ref2.accessToken;
      cache.put('@cuser/auth', accessToken);
      return accessToken;
    });
  }, [client, cache]);
  var auth = (0, _usePromiseResolver["default"])(resolverAuth, {
    data: cache.get('@cuser/auth'),
    lazy: true
  });
  var resolverUser = (0, _react.useCallback)(function (_ref3) {
    var accessToken = _ref3.accessToken;
    return client.getUserByAccessToken(accessToken);
  }, [client]);
  var user = (0, _usePromiseResolver["default"])(resolverUser, {
    variables: {
      accessToken: auth.data
    },
    lazy: !auth.data
  });
  var logout = (0, _react.useCallback)(function () {
    cache.remove('@cuser/auth');
    auth.clean();
  }, [cache, auth]);
  var authenticate = (0, _react.useCallback)(function (variables) {
    return auth.refetch({
      variables: variables
    });
  }, [auth, auth.data && auth.data.accessToken]);
  return (0, _react.useMemo)(function () {
    return {
      logout: logout,
      authenticate: authenticate,
      auth: auth,
      user: user
    };
  }, [user, auth, logout, authenticate]);
};

var _default = useAuth;
exports["default"] = _default;