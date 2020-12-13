// @ts-check
/** @typedef {import("ipfs-core/src/components").IPFSAPI} Node */
/** @typedef {import("ipfs-core/src/components/name/publish").PublishResult} PublishResult */
/** @typedef {import("ipfs-core/src/components/block/put").PutOptions} PutOptions */
/** @typedef {import("ipfs-core/src/utils").AbortOptions} AbortOptions */
/** @typedef {import("./pubsub").CuserClientPubSubOptions} CuserClientPubSubOptions */

const itAll = require("it-all");
const CID = require("cids");
const createPubSub = require("./pubsub");
const debug = require("debug")('cuser:core');

/**
 * @typedef {Object} CuserCoreOptions
 * @prop {String} [key='self']
 * @prop {String} [format='dag-cbor']
 * @prop {String} [hashAlg='sha3-512']
 * @prop {Number} [timeout=30000]
 * @prop {Boolean} [allowOffline=true]
 * @prop {Function} [parseCid=(hash: string) => CID]
 */


/**
 * Core logic to manage the dag tree and specify the dag format, this will wraps
 * ipfs.dag in order to normalize the mainly used methods and allows future replacements.
 */
class CuserCore {
  /**
   * @param {Node|Promise<Node>} node
   * @param {CuserCoreOptions} [opts]
   */
  constructor(node, opts) {
    if (!node) {
      throw new Error('CuserCore: node must be defined and be an instance of IPFS')
    }

    this._options = {
      key: 'self',
      format: 'dag-cbor',
      hashAlg: 'sha3-512',
      timeout: 30000,
      allowOffline: true,
      parseCid: (str) => new CID(str),
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
    const { key, timeout, allowOffline } = this._options;
    if (!state.enabled) {
      throw new Error('CuserCore: ipns pubsub is not enabled, options.EXPERIMENTAL.ipnsPubsub = true');
    }
    debug(`publishing "${cid}"`);
    return node.name.publish(cid, {
      key, timeout, allowOffline,
      ...opts
    });
  }

  /**
   * @param {Object} value
   * @param {AbortOptions & PutOptions} [opts]
   * @returns {Promise<String>}
   */
  async put(value, opts) {
    const node = await this._node;
    const { format, hashAlg, timeout } = this._options;
    debug(`putting %s`, value);
    return node.dag.put(value, {
      format, hashAlg, timeout,
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
    const { parseCid } = this._options;
    debug(`getting "${cid}"`);
    return node.dag.get(parseCid(cid), {
      ...this._options,
      ...opts
    }).then(({ value }) => value);
  }

  /**
   * Resolve the linked dag cid
   * @param {String|Promise<String>} [cid]
   * @returns {Promise<String>}
   */
  async resolve(cid) {
    const node = await this._node;
    const id = await cid;
    debug(`resolving "${id}"`);
    const [resolved] = await itAll(node.name.resolve(id, {
      ...this._options
    }));
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

  /**
   * @param {CuserClientPubSubOptions} [opts]
   */
  pubsub(opts) {
    return createPubSub(this._node, opts);
  }
}

/**
 * @param {Node|Promise<Node>} node
 * @param {CuserCoreOptions} [opts]
 */
const createCore = (node, opts) => new CuserCore(node, opts);

module.exports = createCore;
module.exports.CuserCore = CuserCore;
