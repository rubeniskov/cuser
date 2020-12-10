// @ts-check
/** @typedef {import('ipfs-core/src/components').IPFSAPI} Node */
/** @typedef {import('@cuser/core/types').CuserCore} CuserCore */
/** @typedef {import('@cuser/core/types').CuserCoreOptions} CuserCoreOptions */
/** @typedef {import('@cuser/store/types').CuserStore} CuserStore */
/** @typedef {import('@cuser/store/types').CuserStoreOptions} CuserStoreOptions */
/** @typedef {import('@cuser/auth/types').CuserAuth} CuserAuth */
/** @typedef {import('@cuser/auth/types').CuserAuthOptions} CuserAuthOptions */
/** @typedef {import('@cuser/auth/types').CuserAuthAccessToken} CuserAuthAccessToken */
/** @typedef {import('@cuser/proto/types/payloads').PayloadPublishMessage} PayloadPublishMessage */
/** @typedef {import('@cuser/proto/types/payloads').PayloadUpdateMessage} PayloadUpdateMessage */
/** @typedef {import('@cuser/proto/types/payloads').PayloadDeleteMessage} PayloadDeleteMessage */

const { CuserCore } = require('@cuser/core');
const { CuserAuth } = require('@cuser/auth');
const configureStore = require('@cuser/store');
const createAction = require('@cuser/store/utils/createAction');

const {
  TYPE_ACTION_PUBLISH_MESSAGE,
  TYPE_ACTION_UPDATE_MESSAGE,
  TYPE_ACTION_DELETE_MESSAGE,
} = require('@cuser/store/rtypes/actions');

const isDagLink = (state) => typeof state === 'string' && state.length === 110;

/**
 * @typedef {Object} CuserPublisherOptions
 * @prop {Boolean} [restore=true]
 */

/**
 *
 */
class CuserPublisher {
  /**
   * @param {CuserCore} core
   * @param {CuserAuth} auth
   * @param {CuserPublisherOptions & CuserStoreOptions} [opts]
   */
  constructor(core, auth, opts) {
    const {
      restore = true
    } = { ...opts }
    if (!(core instanceof CuserCore)) {
      throw new Error('CuserPublisher: core must be defined and be an instance of CuserCore')
    }
    if (!(auth instanceof CuserAuth)) {
      throw new Error('CuserPublisher: auth must be defined and be an instance of CuserAuth')
    }
    /** @type {CuserCore} */
    this._core = core;
    /** @type {CuserAuth} */
    this._auth = auth;

    const preloadedState = restore ? this._core.peerId().then(peerId => this._core.resolve(peerId)) : undefined
    /** @type {CuserStore} */
    this._store = configureStore(preloadedState, {
      serializable: (state) => typeof state === 'object',
      deserializable: isDagLink,
      serialize: (value) => this._core.put(value),
      deserialize: (value) => this._core.get(value),
      ...opts
    });
  }

  /**
   * Publish message and gets the computed cid
   * @param {String} topicId
   * @param {CuserAuthAccessToken} accessToken
   * @param {String} data
   */
  async publishMessage(topicId, accessToken, data) {
    const user = await this._auth.decode(accessToken);
    /** @type {PayloadPublishMessage} */
    const payload = { user, topicId, content: { data } };
    return this._store.dispatch(createAction(TYPE_ACTION_PUBLISH_MESSAGE, payload))
      .then((cid) => {
        return this._core.publish(cid);
      });
  }

  /**
   * Update message and gets computed cid
   * @param {String} topicId
   * @param {CuserAuthAccessToken} accessToken
   * @param {String} messageId
   * @param {String} data
   */
  async updateMessage(topicId, accessToken, messageId, data) {
    const user = await this._auth.decode(accessToken);
    /** @type {PayloadUpdateMessage} */
    const payload = { user, topicId, messageId, content: { data } };
    return this._store.dispatch(createAction(TYPE_ACTION_UPDATE_MESSAGE, payload))
      .then((cid) => {
        return this._core.publish(cid);
      });
  }

  /**
   * Delete message and gets the computed cid
   * @param {String} topicId
   * @param {CuserAuthAccessToken} accessToken
   * @param {String} messageId
   */
  async deleteMessage(topicId, accessToken, messageId) {
    const user = await this._auth.decode(accessToken);
    /** @type {PayloadDeleteMessage} */
    const payload = { user, topicId, messageId };
    return this._store.dispatch(createAction(TYPE_ACTION_DELETE_MESSAGE, payload))
      .then((cid) => {
        return this._core.publish(cid);
      });
  }
}

/**
 * @param {CuserCore} core
 * @param {CuserAuth} auth
 * @param {CuserPublisherOptions & CuserStoreOptions} [opts]
 */
const createPublisher = (core, auth, opts) => new CuserPublisher(core, auth, opts);

module.exports = createPublisher;
module.exports.CuserPublisher = CuserPublisher;
