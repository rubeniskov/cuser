// @ts-check
/** @typedef {import('@cuser/proto/graphs').GraphMessage} GraphMessage */
/** @typedef {import('@cuser/proto/graphs').GraphTopic} GraphTopic */
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
   * Creates a message iterator resolving the data from `ipfs` layer
   * @param {String} topicId
   * @param {CuserReaderMessagesIteratorOptions} [opts]
   * @returns {AsyncIterable<CuserReaderMessageIteratorResult>}
   * @example
   * ### Array
   * ```javascript
   * const messages = reader.getMessages('custom_topic_id');
   * for await (let value of messages) {
   *   console.log(value);
   * }
   * ```
   */
  createMessageIterator(topicId, opts) {
    const iopts = {
      after: null,
      rootId: null,
      first: 10,
      offset: 0,
      ...opts
    }

    const message = iopts.after
      ? Promise.resolve(iopts.after)
      : this._resolveRootMessage(topicId, iopts.rootId).then(({ message }) => message);

    /** @type {AsyncIterable<CuserReaderMessageIteratorResult>} */
    const messageIterator = createMessageIterator((cid) => cid ? this.getMessage(cid) : null, message, {
      limit: iopts.first,
      skip: (iopts.offset + iopts.after ? 1 : 0),
      process: this._process,
    });

    return messageIterator
  }

  /**
   * Gets messages from `ipfs` layer
   * @param {String} topicId
   * @param {CuserReaderMessagesIteratorOptions} [opts]
   * @returns {Promise<CuserReaderMessageIteratorResult[]>}
   * @example
   * ### Array
   * ```javascript
   * const messages = reader.getMessages('custom_topic_id');
   * console.log(messages);
   * ```
   */
  async getMessages(topicId, opts) {
    return itAll(this.createMessageIterator(topicId, opts));
  }

  /**
   *
   * @param {String} topicId
   * @param {CuserReaderMessagesIteratorOptions} [opts]
   */
  async getMessagesEdges(topicId, opts) {
    const edges = await this.getMessages(topicId, { ...opts, iterator: false });
    const lastNode = edges[edges.length - 1];
    const hasNextPage = lastNode ? lastNode.node.parent !== null : false;

    return {
      edges,
      pageInfo: {
        hasNextPage
      }
    }
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
   * @param {String} [rootId]
   * @returns {Promise<GraphTopic|null>}
   */
  async _resolveRootMessage(topicId, rootId) {
    rootId = await (rootId || this._core.resolve(this._peerId));
    const { topics } = await this._core.get(rootId)

    let topic = topics[topicId];

    if (!topic) {
      throw new Error(`CuserReader: topicId "${topicId}" doesn't exists`);
    }

    if (typeof topic !== 'string') {
      throw new Error(`CuserReader: error bad topic signature "${topicId}"`);
    }

    const topicGraph = await this._core.get(topic);

    if (topicGraph.message === null) {
      return topicGraph;
    }

    if (!topicGraph.message) {
      throw new Error(`CuserReader: error message signature for topic "${topicId}", message is not detected`);
    }

    if (typeof topicGraph.message !== 'string') {
      throw new Error(`CuserReader: error message signature for topic "${topicId}", message has not the right format`);
    }

    return topicGraph;
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
