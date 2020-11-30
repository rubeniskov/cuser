const debug = require('debug')('cuser:server');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const authMiddleware = require('@cuser/server-middleware-auth');
const apollo = require('@cuser/server-middleware-graphql');
const rest = require('@cuser/server-middleware-rest');
const cuser = require('@cuser/core')();

const server = (opts = {}) => {
  const app = express();
  const authRouter = authMiddleware(cuser)
  if(opts.cors) {
    app.use(cors());
  }
  app.use('/auth', authRouter.authenticate);
  app.use(authRouter);
  app.use('/gql', apollo(cuser));
  app.use(rest(cuser));

  app.listen(opts.port, () => {
    debug('listening %s:%s', '0.0.0.0', opts.port);
  });

  app.use(bodyParser.json(), function (err, _, res, __) {
    res.json({
      ...err,
      message: err.message,
    });
  });
}


module.exports = server;

if (require.main === module) {
  server({ port: process.env.PORT || 3000 });
}
