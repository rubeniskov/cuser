// @ts-check
/** @typedef {import("@cuser/core/types").CuserCore} CuserCore */
/** @typedef {import("@cuser/store/types").CuserStore} CuserStore */
/** @typedef {import("@cuser/store/types").CuserStoreOptions} CuserStoreOptions */
/** @typedef {import("@cuser/proto/payloads").PayloadPublishMessage} PayloadPublishMessage */
/** @typedef {import("@cuser/proto/payloads").PayloadUpdateMessage} PayloadUpdateMessage */
/** @typedef {import("@cuser/proto/payloads").PayloadDeleteMessage} PayloadDeleteMessage */

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
   * @param {CuserCore} core
   * @param {CuserStoreOptions} [opts]
   */
  constructor(core, opts) {

    if (!core) {
      throw new Error('CuserPublisher: core must be defined');
    }

    this._core = core;

    const sopts = {
      // preloadedState: this._core.resolve(),
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
   *
   * @param {PayloadPublishMessage} payload
   */
  async publish(payload) {
    return this._store.exec(createAction(TYPE_ACTION_PUBLISH_MESSAGE, payload))
      .then((cid) => {
        return this._core.publish(cid);
      });
  }

  /**
   * Update message and gets computed cid
   * @param {PayloadUpdateMessage} payload
   */
  async update(payload) {
    return this._store.exec(createAction(TYPE_ACTION_UPDATE_MESSAGE, payload))
      .then((cid) => {
        return this._core.publish(cid);
      });
  }

  /**
   *
   * @param {PayloadDeleteMessage} payload
   */
  async delete(payload) {
    return this._store.exec(createAction(TYPE_ACTION_DELETE_MESSAGE, payload))
      .then((cid) => {
        return this._core.publish(cid);
      });
  }
}

/**
 * @param {CuserCore} core
 * @param {CuserStoreOptions} [opts]
 */
const createPublisher = (core, opts) => new CuserPublisher(core, opts);

module.exports = createPublisher;
module.exports.CuserPublisher = CuserPublisher;
