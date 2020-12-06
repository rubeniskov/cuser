// @ts-check
/** @typedef {import('@cuser/auth/types').CuserAuth} CuserAuth */
const createAuth = require('@cuser/auth');
const Router = require('router');
const bodyParser = require('body-parser');

/**
 * @typedef {Object} CuserExpressMiddlewareAuthOptions
 * @prop {String} [mount]
 */

/**
 *
 * @param {CuserAuth} auth
 * @param {CuserExpressMiddlewareAuthOptions} [opts]
 */
const createAuthAccessMiddleware = (auth, {
  mount = '/auth'
} = {}) => Router().use(mount, bodyParser.json(), (req, res, next) => {
  auth.authenticate(req.body).then((accessToken) => res.json({ accessToken }), next);
});

/**
 * @typedef {Object} CuserExpressMiddlewareAuthGuardOptions
 * @prop {String} [headerName]
 * @prop {Boolean} [verify=false]
 */

/**
 *
 * @param {CuserAuth} auth
 * @param {CuserExpressMiddlewareAuthGuardOptions} opts
 */
const createAuthGuardMiddleware = (auth, {
  headerName = 'authorization',
  verify = false,
} = {}) => Router().use(bodyParser.json(), (req, res, next) => {
  const accessToken = req.headers[headerName];
  if (accessToken) {
    req.auth = { accessToken };
    if (verify) {
      auth.decode(accessToken).then((userPayload) => {
        req.auth.user = userPayload;
        next();
      }, (err) => {
        res.status(400).json({
          message: `authorization ${err.message}`,
        });
      });
    } else {
      next();
    }
  } else {
    res.status(401).json({
      message: 'unauthenticated'
    });
  }
});

module.exports = createAuthAccessMiddleware;
module.exports.authGuard = createAuthGuardMiddleware;
