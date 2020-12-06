// @ts-check
// /** @typedef {import('express').Router} Router */
/** @typedef {import('@cuser/core/types').CuserCore} CuserCore */
/** @typedef {import('@cuser/auth/types').CuserAuth} CuserAuth */
/** @typedef {import('@cuser/express-middleware-graphql').CuserExpressMiddlewareGraphqlOptions} CuserExpressMiddlewareGraphqlOptions */
/** @typedef {import('@cuser/express-middleware-rest').CuserExpressMiddlewareRestOptions} CuserExpressMiddlewareRestOptions */
/** @typedef {import('@cuser/express-middleware-auth').CuserExpressMiddlewareAuthOptions} CuserExpressMiddlewareAuthOptions */
const debug = require('debug')('cuser:server');
const Router = require('router');
const bodyParser = require('body-parser');
const { version } = require('./package.json');

const parseOpts = (opts) => typeof opts === 'boolean' ? undefined : opts;

/**
 * @typedef {Object} CuserServerMiddlewareOptions
 * @prop {Boolean|Object} cors Enable cross-origin resource sharing
 * @prop {Boolean|CuserExpressMiddlewareRestOptions} rest Api rest options
 * @prop {Boolean|CuserExpressMiddlewareGraphqlOptions} gql Api graphql options
 * @prop {Boolean|CuserExpressMiddlewareAuthOptions} auth
 */

/**
 *
 * @param {CuserCore} core
 * @param {CuserAuth} auth
 * @param {CuserServerMiddlewareOptions} [opts]
 */
const createMiddleware = (core, auth, opts) => {
  const {
    cors: corsOpts,
    /** @type {CuserExpressMiddlewareAuthOptions} */
    auth: authOpts,
    /** @type {CuserExpressMiddlewareRestOptions} */
    rest: restOpts,
    /** @type {CuserExpressMiddlewareGraphqlOptions} */
    gql: gqlOpts,
  } = { ...opts };
  const route = Router();

  if(corsOpts) {
    debug('enable cors');
    route.use(require('cors'));
  }

  if (authOpts) {
    const authMiddleware = require('@cuser/express-middleware-auth');
    route.use(authMiddleware(auth, parseOpts(authOpts)));
  }

  if (restOpts) {
    debug('rest api enabled');
    const restMiddleware = require('@cuser/express-middleware-rest');
    route.use(restMiddleware(core, auth, parseOpts(restOpts)));
  }

  if (gqlOpts) {
    debug('graphql api enabled');
    const graphqlMiddleware = require('@cuser/express-middleware-graphql');
    route.use(graphqlMiddleware(core, gqlOpts));
  }

  // @ts-ignore
  route.get('/', (_, res) => {
    res.json({
      version
    });
  });

  // Error handling
  route.use(bodyParser.json(), function (err, _, res, __) {
    res.json({
      ...err,
      message: err.message,
    });
  });

  return route;
}

module.exports = createMiddleware;
