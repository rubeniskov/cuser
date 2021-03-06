const Router = require('router');

/**
 * @param {Object} [opts]
 */
const swaggerRouter = (opts) => {
  const swaggerJson = require('@cuser/proto/swagger/services.json');
  const swaggerUi = require('swagger-ui-express');

  return Router()
    .use('/docs', swaggerUi.serve)
    .get('/docs', swaggerUi.setup(swaggerJson))
    .get('/docs/swagger.json', (_, res) => {
      res.json(swaggerJson)
    });
}

module.exports = swaggerRouter
