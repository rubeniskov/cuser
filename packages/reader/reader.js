// @ts-check
/** @typedef {import('@cuser/proto/graphs').GraphMessage} GraphMessage */
const itAll = require('it-all');
const { CuserCore } = require('@cuser/core');
const createMessageIterator = require('./messageIterator');
const createMessageMapper = require('./mapper');

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
 * @prop {(message: GraphMessage) => Promise<Object>} [mapper]
 */

/**
 */
class CuserReader {
  /**
   * @param {CuserCore} core
   * @param {String|Promise<String>} peerId
   * @param {CuserReaderOptions} [opts]
   */
  constructor(core, peerId, opts = {}) {
      if (!(core instanceof CuserCore)) {
        throw new Error('CuserPublisher: core must be defined and be an instance of CuserCore')
      }

      if (!peerId) {
        throw new Error(`CuserReader: peerId must be defined in order to resolve the resources`);
      }

      /** @type {CuserCore} */
      this._core = core;
      this._peerId = peerId;
      this._mapper = opts.mapper || createMessageMapper(this._core.get.bind(this._core));
      /** @type {(message: Object, cursor: String) => Promise<CuserReaderMessageIteratorResult>} */
      this._process = async (message, cursor) => ({ node: await this._mapper(message), cursor });
  }

  /**
   * Gets messages from `ipfs` layer
   * @param {String} topicId
   * @param {CuserReaderMessagesIteratorOptions} opts
   * @returns {Promise<CuserReaderMessageIteratorResult[]>|AsyncIterable<CuserReaderMessageIteratorResult>}
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
      ...opts
    }

    const message = iopts.after
      ? Promise.resolve(iopts.after)
      : this._resolveRootMessage(topicId);

    /** @type {AsyncIterable<CuserReaderMessageIteratorResult>} */
    const messageIterator = createMessageIterator((cid) => cid ? this.getMessage(cid) : null, message, {
      limit: iopts.first,
      skip: (iopts.offset + iopts.after ? 1 : 0),
      process: this._process,
    });

    if (iopts.iterator) {
      return messageIterator
    }

    return itAll(messageIterator);
  }

  /**
   * Gets the message from ipfs using the CID given by parameter
   * @param {String} cid
   * @returns {Promise<GraphMessage>}
   */
  async getMessage(cid) {
    return this._core.get(cid);
  }

  /**
   * Get the root message for a certain topicId
   * @private
   * @param {String} topicId
   * @returns {Promise<string|null>}
   */
  async _resolveRootMessage(topicId) {
    return this._core
      .resolve(this._peerId)
      .then((cid) => this._core.get(cid))
      .then(async ({ topics }) => {
        let topic = topics[topicId];

        if (!topic) {
          throw new Error(`CuserReader: topicId "${topicId}" doesn't exists`);
        }

        if (typeof topic !== 'string') {
          throw new Error(`CuserReader: error bad topic signature "${topicId}"`);
        }

        const { message: messageCid } = await this._core.get(topic);

        if (messageCid === null) {
          return null;
        }

        if (!messageCid) {
          throw new Error(`CuserReader: error message signature for topic "${topicId}", message is not detected`);
        }

        if (typeof messageCid !== 'string') {
          throw new Error(`CuserReader: error message signature for topic "${topicId}", message has not the right format`);
        }
        return messageCid;
      });
  }
}

/**
 * @param {CuserCore} core
 * @param {String|Promise<String>} peerId
 * @param {CuserReaderOptions} [opts]
 */
const createReader = (core, peerId, opts) => new CuserReader(core, peerId, opts);

module.exports = createReader;
module.exports.CuserReader = CuserReader;
