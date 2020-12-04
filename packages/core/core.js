/** @typedef {import("ipfs-core/src/components/name/publish").PublishResult} PublishResult */
/** @typedef {import("ipfs-core/src/components").IPFSAPI} Node */
/** @typedef {import("ipfs-core/src/components/block/put").PutOptions} PutOptions */
/** @typedef {import("ipfs-core/src/utils").AbortOptions} AbortOptions */
const all = require("it-all");
const debug = require("debug")('cuser:core');

/**
 * @typedef {Object} CuserCoreOptions
 * @prop {String} [format='dag-cbor']
 * @prop {String} [hashAlg='sha3-512']
 * @prop {String} [timeout=30000]
 * @prop {String} [allowOffline=true]
 */


/**
 * Core logic to manage the dag tree and specify the dag format, this will wraps
 * ipfs.dag in order to normalize the mainly used methods and allows future replacements.
 */
class CuserCore {
  /**
   * @param {Node} node
   * @param {CuserCoreOptions} [opts]
   */
  constructor(node, opts) {
    if (!node) {
      throw new Error('CuserCore: node must be defined and be an instance of IPFS')
    }

    this._options = {
      format: 'dag-cbor',
      hashAlg: 'sha3-512',
      timeout: 30000,
      allowOffline: true,
      ...opts
    };
    this._node = node;
  }

  /**
   * Publish using ipns to link the current cid to a fixed entry
   * @param {String} cid
   * @param {AbortOptions} [opts]
   * @returns {Promise<PublishResult>}
   */
  async publish(cid, opts) {
    const node = await this._node;
    const state = await node.name.pubsub.state();
    if (!state.enabled) {
      throw new Error('CuserCore: ipns pubsub is not enabled, options.EXPERIMENTAL.ipnsPubsub = true');
    }
    debug(`publishing "${cid}"`);
    return node.name.publish(cid, {
      ...this._options,
      ...opts
    });
  }

  /**
   * @param {Object} value
   * @param {AbortOptions} [opts]
   * @returns {Promise<String>}
   */
  async put(value, opts) {
    const node = await this._node;
    debug(`putting ${value.toString()}`);
    return node.dag.put(value, {
      ...this._options,
      ...opts
    }).then((cid) => cid.toString());
  }

  /**
   *
   * @param {String} cid
   * @param {AbortOptions} [opts]
   * @returns {Promise<any>}
   */
  async get(cid, opts) {
    const node = await this._node;
    debug(`getting "${cid}"`);
    return node.dag.get(cid, {
      ...this._options,
      ...opts
    }).then(({ value }) => value);
  }

  /**
   * Resolve the linked dag cid
   * @param {String} [cid]
   * @returns {Promise<String>}
   */
  async resolve(cid) {
    const node = await this._node;
    const id = await (cid || this.peerId());
    debug(`resolving "${id}"`);
    const [resolved] = await all(node.name.resolve(id))
    return resolved.replace(/^\/ipfs\//, '');
  }

  /**
   * Gets the node peerId
   */
  async peerId() {
    const node = await this._node;
    const { id } = await node.id();
    return id;
  }
}

/**
 *
 * @param {Node} node
 * @param {CuserCoreOptions} [opts]
 */
const createCore = (node, opts) => new CuserCore(node, opts);

module.exports = createCore;
module.exports.CuserCore = CuserCore;
