/** @typedef {import("ipfs-core/src/components").CID} CID */
/** @typedef {import("ipfs-core/src/components/name/publish").PublishResult} PublishResult */
/** @typedef {import("ipfs-core/src/components").IPFSAPI} Node */
/** @typedef {import("ipfs-core/src/components/block/put").PutOptions} PutOptions */
/** @typedef {import("ipfs-core/src/utils").AbortOptions} AbortOptions */
const all = require("it-all");

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
   * @param {CuserCoreOptions} opts
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
   * @param {AbortOptions} opts
   * @returns {Promise<PublishResult>}
   */
  async publish(cid, opts) {
    const node = await this._node;
    const state = await node.name.pubsub.state();
    if (!state.enabled) {
      throw new Error('CuserCore: ipns pubsub is not enabled, options.EXPERIMENTAL.ipnsPubsub = true');
    }
    return node.name.publish(cid, {
      ...this._options,
      ...opts
    });
  }

  /**
   * @param {Uint8Array} buf
   * @param {AbortOptions} opts
   * @returns {Promise<CID>}
   */
  async put(buf, opts) {
    const node = await this._node;
    return node.dag.put(buf, {
      ...this._options,
      ...opts
    });
  }

  /**
   *
   * @param {String} cid
   * @param {AbortOptions} opts
   * @returns {Promise<any>}
   */
  async get(cid, opts) {
    const node = await this._node;
    return node.dag.get(cid, {
      ...this._options,
      ...opts
    }).then(({ value }) => value);
  }

  /**
   * Resolve the linked dag cid
   * @param {String} cid
   * @returns {Promise<String>}
   */
  async resolve(cid) {
    const node = await this._node;
    const id = await cid;
    const [resolved] = await all(node.name.resolve(id))
    return resolved.replace(/^\/ipfs\//, '');
  }
}

/**
 *
 * @param {Node} node
 * @param {CuserCoreOptions} opts
 */
const createCore = (node, opts) => new CuserCore(node, opts);

module.exports = createCore;
module.exports.CuserCore = CuserCore;
