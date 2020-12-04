// @ts-check
/** @typedef {import('ipfs-core/src/components').IPFSAPI} Node */
/** @typedef {import('@cuser/proto/graphs').GraphMessage} GraphMessage */
const createCore = require('@cuser/core');
const toArray = require('async-iterator-to-array');
const fetch = require('./fetch');
const createPubSub = require('./pubsub');
const createMessageIterator = require('./messageIterator');
const { parseUrl, noPublisher } = require('./utils');

/**
 * @typedef {Object} CuserClientMessageIteratorResult
 * @prop {GraphMessage} node
 * @prop {String} cursor
 */

/**
 * Iteration options for traversing messages using pagination
 * interface like [graphql](https://graphql.org/learn/pagination/)
 * @typedef {Object} CuserClientMessagesIteratorOptions
 * @prop {Number} [after=null]
 * @prop {Number} [first=10]
 * @prop {Number} [offset=0]
 * @prop {Boolean} [iterator=false] Return the iterator instead of array
 * @prop {(node: GraphMessage, cursor: String) => CuserClientMessageIteratorResult} [map] The iterator mapper
 */

/**
 * @typedef {Object} CuserClientOptions
 * @prop {Function} [fetch=fetch] fetch function using to resolve requests
 * @prop {String} [url=global.location] url to the api rest
 * @prop {Record<string, string>} [routes={publisher: '/v1/message', auth: '/auth'}] routes used to resolve enpoints
 */

/**
 * @typedef {Object} CuserClientEvent
 * @prop {('created'|'updated'|'deleted')} type
 * @prop {String} messageId
 */

/**
 * @callback CuserClientSubscriber
 * @param {CuserClientEvent} event
 */

/**
 * Cuser client instance which provides an interface to read, publish,
 * edit and delete messages through ipfs. By default the client will be only
 * allowed to read messages unless you provide a `CuserServer` `url`,
 * which will enable the publishing capabilities to the users.
 * > Note
 * To enable publisher capabilities, you need deploy a `CuserServer`,
 * please refer to [getting started](https://github.com/rubeniskov/cuser#getting-started) section to gets more information.
 * @example
 *
 * ```javascript
 * const { create } = require('ipfs');
 *
 * const node = create({ ...ipfsOptions });
 * const cuserId = 'CUSER_SERVER_IDENTIFIER';
 * const client = new CuserClient(node, cuserId);
 * const topicId = 'custom-topic-id';
 *
 * client.getMessages(topicId).then((messages) => {
 *  console.log(messages);
 *  // should return empty array when no comments
 * });
 * ```
 */
class CuserClient {
  /**
   * @param {Node} node
   * @param {String} cuserId
   * @param {CuserClientOptions} [opts]
   */
  constructor(node, cuserId, opts = {}) {
    if (!node) {
      throw new Error(`CuserClient: node must be defined an be an instance of IPFS`);
    }

    if (!cuserId) {
      throw new Error(`CuserClient: cuserId must be defined in order to resolve the resources`);
    }

    this._cuserId = cuserId;
    this._url = parseUrl(opts.url);
    this._core = createCore(node);
    this._fetch = this._url ? (opts.fetch || fetch) : noPublisher;
    this._pubsub = createPubSub(node, {
      channel: cuserId
    });
    this._routes = {
      publisher: '/v1/message',
      auth: '/auth',
      ...opts.routes
    }
  }

  /**
   * Gets messages from `ipfs` layer
   * @param {String} topicId
   * @param {CuserClientMessagesIteratorOptions} opts
   * @returns {Promise<CuserClientMessageIteratorResult[]>}
   * @example
   * ### Array
   * ```javascript
   * const messages = client.getMessages('custom_topic_id');
   * console.log(messages);
   * ```
   * ### Iterator
   * ```javascript
   * const messages = client.getMessages('custom_topic_id', {
   *   iter: true,
   * });
   * for await (let value of messages) {
   *   console.log(value);
   * }
   * ```
   *
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

    const message = iopts.after ? Promise.resolve(iopts.after) : this._core.get(this._cuserId)
      .then(({ topics }) => {
        if (!topics[topicId]) {
          throw new Error(`CuserClient: topicId "${topicId}" doesn't exists`);
        }
        const { message } = topics[topicId];

        if (!message) {
          throw new Error(`CuserClient: error signature topic "${topicId}", message is not detected`);
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

  /**
   * Authenticates a user with the required fields of username and avatar,
   * this will epect to recieve an access_token to be used in publishing operations
   * @param {String} username
   * @param {String} avatar data url scheme https://tools.ietf.org/html/rfc2397
   */
  async authenticate(username, avatar) {
    const peerId = await this._core.peerId();

    return this._fetch(this._url + this._routes.auth,{
      method: 'POST',
      body: JSON.stringify({ peerId, username, avatar }),
    });
  }

  /**
   * Publish a new message for certain topic using topicId as identifier
   * and accessToken to identify the user
   * @param {String} topicId
   * @param {String} accessToken
   * @param {String} content
   * @returns {Promise<[Object,Response]>}
   */
  async publishMessage(topicId, accessToken, content) {
    return this._fetch(this._url + this._routes.publisher,{
      method: 'POST',
      body: JSON.stringify({ topicId, content }),
      headers: {
        'Authentication': accessToken
      },
    });
  }

  /**
   * Updates message for certain topic using topicId as identifier
   * and accessToken to identify the user
   * @param {String} topicId
   * @param {String} accessToken
   * @param {String} messageId
   * @param {String} content
   * @returns {Promise<[Object,Response]>}
   */
  async updateMessage(topicId, accessToken, messageId, content) {
    return this._fetch(this._url + this._routes.publisher,{
      method: 'PATCH',
      body: JSON.stringify({ topicId, messageId, content }),
      headers: {
        'Authentication': accessToken
      },
    });
  }

 /**
  * Deletes message for certain topic using topicId as identifier
  * and accessToken to identify the user
  * @param {String} topicId
  * @param {String} accessToken
  * @param {String} messageId
  * @returns {Promise<[Object,Response]>}
  */
  async deleteMessage(topicId, accessToken, messageId) {
    return this._fetch(this._url + this._routes.publisher,{
      method: 'DELETE',
      body: JSON.stringify({ topicId, messageId }),
      headers: {
        'Authentication': accessToken
      },
    });
  }

  /**
   * Subscribe to message changes of a certain topic.
   * @example
   * This will attach the listener to three types of events:
   * - `created` when a user publish a message
   * - `updated` when a user updates a message
   * - `deleted` when a user removes a message
   * ```javascript
   * client.subscribe('CUSTOM_TOPIC_ID', ({ type, messageCid }) => {
   *  switch(type) {
   *    case 'created':
   *      // when a user publish a message
   *      // console.log(client.getMessage(messageCid));
   *      break;
   *    case 'updated':
   *      // when a user updates a message
   *      // console.log(client.getMessage(messageCid));
   *      break;
   *    case 'deleted':
   *      // when a user removes a message
   *      // console.log(client.getMessage(messageCid));
   *      break;
   *  }
   * });
   * ```
   * @param {String} topicId topic identifier
   * @param {CuserClientSubscriber} subscriber function event subscriber
   */
  subscribe(topicId, subscriber) {
    return this._pubsub.subscribe(topicId, subscriber);
  }
}

/**
 * @param {Node} node
 * @param {String} cuserId
 * @param {CuserClientOptions} [opts]
 */
const createClient = (node, cuserId, opts) => {
  return new CuserClient(node, cuserId, opts);
}

module.exports = createClient;
module.exports.CuserClient = CuserClient;
