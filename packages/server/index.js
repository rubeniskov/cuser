const debug = require('debug')('cuser:server');
const express = require('express');
const { version } = require('./package.json');

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
    cuser = require('@cuser/core')(node, opts),
    host,
    port,
  } = { ...defaults, ...opts };

  const app = express();

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

  app.use('/', (_, res) => {
    res.json({
      version
    });
  });

  // Error handling
  app.use(require('body-parser').json(), function (err, _, res, __) {
    res.json({
      ...err,
      message: err.message,
    });
  });

  if (port && host) {
    const hostname = [host, port].filter(Boolean).join(':');
    app.listen(hostname, () => {
      debug('listening %s', hostname);
    });
  }

  return app;
}

module.exports = server;
module.exports.defaults = defaults;

if (require.main === module) {
  server({ port: process.env.PORT || 3000 });
}
