// @ts-check
/** @typedef {import('@cuser/core/types').CuserCore} CuserCore */
/** @typedef {import('@cuser/reader/types').CuserReaderOptions} CuserReaderOptions */
/** @typedef {import('./wrapper').WrappedHandler} WrappedHandler */

const Router = require('router');
const createReader = require('@cuser/reader');
const defaultWrapper = require('./wrapper');

/**
 * @typedef {Object} CuserExpressMiddlewareRestReaderOptions
 * @prop {WrappedHandler} [wrapper=defaultWrapper]
 * @prop {String} [mount='/message']
 */

/**
 *
 * @param {CuserCore} core
 * @param {CuserExpressMiddlewareRestReaderOptions & CuserReaderOptions} [opts]
 */
const createRestReaderMiddleware = (core, opts = {}) => {
  const {
    wrapper = defaultWrapper,
    mount = '/message',
    ...restOpts
  } = { ...opts };
  const client = createReader(core, core.peerId(), restOpts);
  const route = Router();

  // @ts-ignore
  route.get(mount, wrapper(async (req) => {
    const { topicId, ...restQuery } = req.query;
    const messages = await client.getMessages(topicId, restQuery);
    return { messages }
  }));

  return route;
}

module.exports = createRestReaderMiddleware;
