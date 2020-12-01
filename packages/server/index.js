const debug = require('debug')('cuser:server');
const express = require('express');

const defaults = {
  cors: false,
  auth: '/auth',
  rest: '/rest',
  grapqhl: '/gql',
}

const grpath = (rpath, fallback) => typeof auth === 'string' ? rpath : fallback;

const server = (node, opts) => {
  const {
    cors,
    auth,
    rest,
    grapqhl,
  } = { ...defaults, ...opts };

  const app = express();
  const cuser = opts.cuser = require('@cuser/core')(node, opts);

  if(cors) {
    app.use(require('cors'));
  }

  if (auth) {
    const authMiddleware = require('@cuser/express-middleware-auth');
    const authRouter = authMiddleware(cuser);
    app.use(grpath(auth, defaults.auth), authRouter.authenticate);
    app.use(authRouter);
  }

  if (rest) {
    const restMiddleware = require('@cuser/express-middleware-rest');
    app.use(grpath(restMiddleware, defaults.rest), restMiddleware(cuser));
  }

  if (grapqhl) {
    const graphqlMiddleware = require('@cuser/express-middleware-graphql');
    app.use(grpath(grapqhl, defaults.grapqhl), graphqlMiddleware(cuser));
  }

  // Error handling
  app.use(require('body-parser'), function (err, _, res, __) {
    res.json({
      ...err,
      message: err.message,
    });
  });

  if (opts.port && opts.host) {
    const hostname = [opts.host, opts.port].filter(Boolean).join(':');
    app.listen(hostname, () => {
      debug('listening %s', hostname);
    });
  }
}

module.exports = server;
module.exports.defaults = defaults;

if (require.main === module) {
  server({ port: process.env.PORT || 3000 });
}
