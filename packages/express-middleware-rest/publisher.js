// @ts-check
/** @typedef {import('@cuser/core').CuserCore} CuserCore */
/** @typedef {import('@cuser/auth').CuserAuth} CuserAuth */
/** @typedef {import('@cuser/publisher').CuserPublisherOptions} CuserPublisherOptions */
/** @typedef {import('@cuser/express-middleware-auth').CuserExpressMiddlewareAuthGuardOptions} CuserExpressMiddlewareAuthGuardOptions */
/** @typedef {import('./wrapper').WrappedHandler} WrappedHandler */

const Router = require('router');
const createPublisher = require('@cuser/publisher');
const { authGuard } = require('@cuser/express-middleware-auth');
const defaultWrapper = require('./wrapper');

/**
 * @typedef {Object} CuserExpressMiddlewareRestReaderOptions
 * @prop {WrappedHandler} [wrapper=defaultWrapper]
 * @prop {String} [mount='/message']
 */

/**
 *
 * @param {CuserCore} core
 * @param {CuserAuth} auth
 * @param {CuserExpressMiddlewareRestReaderOptions & CuserPublisherOptions & CuserExpressMiddlewareAuthGuardOptions} [opts]
 */
const createRestPublisherMiddleware = (core, auth, opts = {}) => {
  const {
    wrapper = defaultWrapper,
    mount = '/message',
    ...restOpts
  } = { ...opts };
  const publisher = createPublisher(core, auth, restOpts);
  const router = Router();
  // @ts-ignore
  router.post(
    mount,
    authGuard(auth, { verify: false, ...restOpts }),
    wrapper((req) => publisher.publishMessage(req.body.topicId, req.auth.accessToken, req.body.content && req.body.content.data))
  );
  // @ts-ignore
  router.patch(
    mount,
    authGuard(auth, { verify: false, ...restOpts }),
    wrapper((req) => publisher.updateMessage(req.body.topicId, req.auth.accessToken, req.body.messageId, req.body.content && req.body.content.data))
  );
  // @ts-ignore
  router.delete(
    mount,
    authGuard(auth, { verify: false, ...restOpts }),
    wrapper((req) => publisher.deleteMessage(req.body.topicId, req.auth.accessToken, req.body.messageId))
  );

  return router;
}

module.exports = createRestPublisherMiddleware;



// // @ts-check
// const Router = require('router');
// const createPublisher = require('');
// const defaultWrapper = require('./wrapper');

// /**
//  *
//  * @param {*} cuser
//  * @param {*} param1
//  */
// const publisherMiddleware = (cuser, {
//   wrapper = defaultWrapper,
//   endpoint = '/message',
// }) => Router()
//   .use(endpoint)
//   .post(endpoint, wrapper((req) => cuser.publish({ ...req.body, user: req.user })))
//   .patch(endpoint, wrapper((req) => cuser.update({ ...req.body, user: req.user })))
//   .delete(endpoint, wrapper((req) => cuser.delete({ ...req.body, user: req.user })));

// module.exports = publisherMiddleware;
