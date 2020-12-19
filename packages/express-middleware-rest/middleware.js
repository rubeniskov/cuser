// @ts-check
/** @typedef {import('@cuser/core').CuserCore} CuserCore */
/** @typedef {import('@cuser/auth').CuserAuth} CuserAuth */
const Router = require('router');
const debug = require('debug')('cuser:server:rest');
const bodyParser = require('body-parser');
const { name, version, description } = require('./package.json');


const defaults = {
  ui: process.env.NODE_ENV !== 'production',
  reader: false,
  publisher: true,
  mount: '/rest',
}

const parseOpts = (opts) => typeof opts === 'boolean' ? undefined : opts;

/**
 * @typedef {Object} CuserExpressMiddlewareRestOptions
 * @prop {Boolean} [mount='/rest'] Path enpoint mount
 * @prop {Boolean} [ui=false] Enable swagger-ui
 * @prop {Boolean} [reader=false] Enable reading messages from api rest
 * @prop {Boolean} [publisher=true] Enable publishing messages from api rest
 */

/**
 *
 * @param {CuserCore} core
 * @param {CuserAuth} auth
 * @param {CuserExpressMiddlewareRestOptions} [opts]
 */
const createRestMiddleware = (core, auth, opts) => {
  const {
    ui: uiOpts,
    reader: readerOpts,
    publisher: publisherOpts,
    mount,
  } = { ...defaults, ...opts }

  const router = Router()
    .use(bodyParser.json())

  if (readerOpts) {
    debug('reader enabled');
    router.use(
      mount,
      require('./reader')(core, parseOpts(readerOpts))
    );
  }

  if (publisherOpts) {
    debug('publisher enabled');
    router.use(
      mount,
      require('./publisher')(core, auth, parseOpts(publisherOpts))
    );
  }

  if (uiOpts) {
    router.use(mount, require('./swagger')(parseOpts(uiOpts)));
  }

  // @ts-ignore
  router.get('/', (_, res) => {
    res.json({
      name,
      version,
      description
    });
  });

  router.use(function (err, _, res, __) {
    res.status(400).json({
      ...err,
      message: err.message,
    });
  });

  return router;
};

module.exports = createRestMiddleware;
module.exports.defaults = defaults;
