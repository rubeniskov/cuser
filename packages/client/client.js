// @ts-check
/** @typedef {import('ipfs-core/src/components').IPFSAPI} Node */
/** @typedef {import('@cuser/proto/types/graphs').GraphMessage} GraphMessage */
/** @typedef {import('@cuser/reader').CuserReaderOptions} CuserReaderOptions */
/** @typedef {import('@cuser/core').CuserCoreOptions} CuserCoreOptions */
const CuserReader = require('@cuser/reader').CuserReader;
const createCore = require('@cuser/core');
const fetch = require('./fetch');
const { parseUrl, noPublisher } = require('./utils');

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
class CuserClient extends CuserReader {
  /**
   * @param {Node|Promise<Node>} node
   * @param {String} cuserId
   * @param {CuserClientOptions & CuserReaderOptions & CuserCoreOptions} [opts]
   */
  constructor(node, cuserId, opts = {}) {
    super(createCore(node, opts), cuserId, opts);
    this._cuserId = cuserId;
    this._url = parseUrl(opts.url);
    this._fetch = this._url ? (opts.fetch || fetch) : noPublisher;
    this._pubsub = this._core.pubsub({
      channel: cuserId
    });
    this._routes = {
      publisher: '/api/v0/rest/message',
      auth: '/api/v0/auth',
      ...opts.routes
    }
    this._authHeaderName = 'Authorization'
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
        [this._authHeaderName]: accessToken
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
        [this._authHeaderName]: accessToken
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
        [this._authHeaderName]: accessToken
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
    return this._pubsub.subscribe((payload) => {
      const { type, topicId: recivedTopicId, ...restData } = payload.data;
      if (type && topicId === recivedTopicId) {
        subscriber({
          type,
          topicId,
          ...restData
        });
      }
    });
  }
}

/**
 * @param {Node|Promise<Node>} node
 * @param {String} cuserId
 * @param {CuserClientOptions & CuserReaderOptions & CuserCoreOptions} [opts]
 */
const createClient = (node, cuserId, opts) => {
  return new CuserClient(node, cuserId, opts);
}

module.exports = createClient;
module.exports.CuserClient = CuserClient;
