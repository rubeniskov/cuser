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

const createCore = require('@cuser/core');
const createAuth = require('@cuser/auth');
const createStore = require('@cuser/store');
const createAction = require('@cuser/store/utils/createAction');

const {
  TYPE_ACTION_PUBLISH_MESSAGE,
  TYPE_ACTION_UPDATE_MESSAGE,
  TYPE_ACTION_DELETE_MESSAGE,
} = require('@cuser/store/rtypes/actions');

const isDagLink = (state) => typeof state === 'string' && state.length === 110;

/**
 *
 */
class CuserPublisher {
  /**
   * @param {Node|Promise<Node>} node
   * @param {String} secret
   * @param {CuserStoreOptions & CuserCoreOptions & CuserAuthOptions} [opts]
   */
  constructor(node, secret, opts) {
    /** @type {CuserCore} */
    this._core = createCore(node, opts);
    /** @type {CuserAuth} */
    this._auth = createAuth(node, secret, opts);
    // this._core.peerId().then(peerId => this._core.resolve(peerId)).then(console.log)
    const sopts = {
      // preloadedState: 'bafyriqdt2bwaryqm2kc5sfvr2meyjbqukrpsywcshhsmgc57yk446gx2yttnl56gelwdpuxbi6vhy2orox3blpvmdjocgupfmmhw3tqabzhp4',
      preloadedState: null,
      isDeserializable: isDagLink,
      isSerializable: (state) => typeof state === 'object',
      serialize: (value) => this._core.put(value),
      deserialize: (value) => this._core.get(value),
      ...opts
    }

    /** @type {CuserStore} */
    this._store = createStore(sopts);
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
    return this._store.exec(createAction(TYPE_ACTION_PUBLISH_MESSAGE, payload))
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
    return this._store.exec(createAction(TYPE_ACTION_UPDATE_MESSAGE, payload))
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
    return this._store.exec(createAction(TYPE_ACTION_DELETE_MESSAGE, payload))
      .then((cid) => {
        return this._core.publish(cid);
      });
  }
}

/**
 * @param {Node|Promise<Node>} node
 * @param {String} secret
 * @param {CuserStoreOptions & CuserCoreOptions & CuserAuthOptions} [opts]
 */
const createPublisher = (node, secret, opts) => new CuserPublisher(node, secret, opts);

module.exports = createPublisher;
module.exports.CuserPublisher = CuserPublisher;
