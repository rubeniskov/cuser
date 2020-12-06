// @ts-check
/** @typedef {import('ipfs-core/src/components').IPFSAPI} Node */
/** @typedef {import('@cuser/express-middleware-rest').CuserExpressMiddlewareRestOptions} CuserExpressMiddlewareRestOptions */
/** @typedef {import('@cuser/express-middleware-graphql').CuserExpressMiddlewareGraphqlOptions} CuserExpressMiddlewareGraphqlOptions */
/** @typedef {import('./middleware').CuserServerMiddlewareOptions} CuserServerMiddlewareOptions */
const createCore = require('@cuser/core');
const createAuth = require('@cuser/auth');
const express = require('express');
const morgan = require('morgan');
const createMiddleware = require('./middleware');
const defaults = require('./defaults');

/**
 * @typedef {Object} CuserServerOptions
 * @prop {String} secret Secret phrase
 * @prop {String} [mount='/api/v${major_version}'] Path enpoint mount
 * @prop {Number} [port=process.env.PORT] Listening port, default gets from PORT environment var
 * @prop {String} [host=process.env.HOST] Listening host, default gets from HOST environment var
 */

/**
 *
 * @param {Node|Promise<Node>} node
 * @param {CuserServerOptions & CuserServerMiddlewareOptions} opts
 */
const createServer = (node, opts) => {
  const sopts = { ...defaults, ...opts };
  const { host, port, secret, mount, verbose } = sopts;

  const app = express();
  const core = createCore(node);
  const auth = createAuth(node, secret);

  // @ts-ignore
  app.use(mount, createMiddleware(core, auth, sopts));

  if (verbose) {
    app.use(morgan('tiny'));
  }

  if (port && host) {
    app.listen(Number(port), host, () => {
      console.log('Server listening on /ip4/%s/tcp/%s', host, port);
    });
  }

  return app;
}

module.exports = createServer;
module.exports.defaults = defaults;
