/** @typedef {import("ipfs-core/src/components").CID} CID */
/** @typedef {import("ipfs-core/src/components/name/publish").PublishResult} PublishResult */
/** @typedef {import("ipfs-core/src/components").IPFSAPI} API */
/** @typedef {import("ipfs-core/src/components/block/put").PutOptions} PutOptions */
/** @typedef {import("ipfs-core/src/utils").AbortOptions} AbortOptions */
const { all } = require('./utils/iterator');
/**
 * @typedef WrappedDAG
 */

/**
 *
 * @param {Promise<API>} api
 * @param {PutOptions} options
 * @returns {WrappedDAG}
 */
const wrapDag = async (api, options) => {
  const {
    format = 'dag-cbor',
    hashAlg = 'sha3-512',
    timeout = 30000,
    allowOffline = true
  } = { ...options }
  const node = await api;
  const state = await node.name.pubsub.state();
  if (!state.enabled) {
    throw new Error('ipns pubsub is not enabled, options.EXPERIMENTAL.ipnsPubsub = true');
  }

  const { id } = await node.id();

  /**
   * @param {Uint8Array} buf
   * @param {AbortOptions} options
   * @returns {Promise<PublishResult>}
   */
  const publish = async (cid) => {
    return node.name.publish(cid, { allowOffline, timeout, ...options });
  }

  /**
   * @param {Uint8Array} buf
   * @param {AbortOptions} options
   * @returns {Promise<CID>}
   */
  const put = async (buf, options) => {
    return node.dag.put(buf, { format, hashAlg, ...options });
  }

  /**
   *
   * @param {CID} cid
   * @param {AbortOptions} options
   * @returns {Promise<CID>}
   */
  const get = async (cid, options) => {
    return node.dag.get(cid, options);
  }

  /**
   * @returns {Promise<CID>}
   */
  const root = async () => {
    const [resolved] = await all(node.name.resolve(id))
    return resolved;
  }

  /**
   * @type {WrapperDAG}
   */
  return {
    publish,
    put,
    get,
    root
  }
}

module.exports = wrapDag;
