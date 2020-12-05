// @ts-check
/** @typedef {import('ipfs-core/src/components').IPFSAPI} Node */
/** @typedef {import('@cuser/proto/graphs').GraphMessage} GraphMessage */
/** @typedef {import('@cuser/core/types').CuserCore} CuserCore */
/** @typedef {import('@cuser/core/types').CuserCoreOptions} CuserCoreOptions */
const toArray = require('async-iterator-to-array');
const createCore = require('@cuser/core');
const createMessageIterator = require('./messageIterator');

/**
 * @typedef {Object} CuserReaderMessageIteratorResult
 * @prop {GraphMessage} node
 * @prop {String} cursor
 */

/**
 * Iteration options for traversing messages using pagination
 * interface like [graphql](https://graphql.org/learn/pagination/)
 * @typedef {Object} CuserReaderMessagesIteratorOptions
 * @prop {Number} [after=null]
 * @prop {Number} [first=10]
 * @prop {Number} [offset=0]
 * @prop {Boolean} [iterator=false] Return the iterator instead of array
 * @prop {(node: GraphMessage, cursor: String) => CuserReaderMessageIteratorResult} [map] The iterator mapper
 */

/**
 * @typedef {Object} CuserReaderOptions
 */

/**
 */
class CuserReader {
  /**
   * @param {Node|Promise<Node>} node
   * @param {String} peerId
   * @param {CuserReaderOptions & CuserCoreOptions} [opts]
   */
  constructor(node, peerId, opts) {
      if (!node) {
        throw new Error(`CuserReader: node must be defined an be an instance of IPFS`);
      }

      if (!peerId) {
        throw new Error(`CuserReader: peerId must be defined in order to resolve the resources`);
      }

      /** @type {CuserCore} */
      this._core = createCore(node, opts);
      this._peerId = peerId;
  }

  /**
   * Gets messages from `ipfs` layer
   * @param {String} topicId
   * @param {CuserReaderMessagesIteratorOptions} opts
   * @returns {Promise<CuserReaderMessageIteratorResult[]>}
   * @example
   * ### Array
   * ```javascript
   * const messages = reader.getMessages('custom_topic_id');
   * console.log(messages);
   * ```
   * ### Iterator
   * ```javascript
   * const messages = reader.getMessages('custom_topic_id', {
   *   iterator: true,
   * });
   * for await (let value of messages) {
   *   console.log(value);
   * }
   * ```
   */
  getMessages(topicId, opts) {
    const iopts = {
      after: null,
      first: 10,
      offset: 0,
      iterator: false,
      map: (node, cursor) => ({ node, cursor }),
      ...opts
    }

    const message = iopts.after ? Promise.resolve(iopts.after) : this._core.get(this._peerId)
      .then(({ topics }) => {
        if (!topics[topicId]) {
          throw new Error(`CuserReader: topicId "${topicId}" doesn't exists`);
        }
        const { message } = topics[topicId];

        if (!message) {
          throw new Error(`CuserReader: error signature topic "${topicId}", message is not detected`);
        }
        return message;
      });


    const messageIterator = createMessageIterator(this.getMessage.bind(this), message, {
      limit: iopts.first,
      skip: (iopts.offset + iopts.after ? 1 : 0),
      map: iopts.map,
    });

    if (iopts.iterator) {
      // @ts-ignore
      return messageIterator
    }

    return toArray(messageIterator);
  }

  /**
   * Gets the message from ipfs using the CID given by parameter
   * @param {String} cid
   * @returns {Promise<GraphMessage>}
   */
  async getMessage(cid) {
    return this._core.get(cid);
  }
}

/**
 * @param {Node|Promise<Node>} node
 * @param {String} peerId
 * @param {CuserReaderOptions & CuserCoreOptions} [opts]
 */
const createReader = (node, peerId, opts) => new CuserReader(node, peerId, opts);

module.exports = createReader;
module.exports.CuserReader = CuserReader;
