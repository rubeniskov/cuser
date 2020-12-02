/** @typedef {import('ipfs-core/src/components').IPFSAPI} Node */
/** @typedef {import('ipfs-core/src/components').CID} CID */
const EventEmitter = require('events');
const _fetch = require('./fetcher');
const createPubSub = require('./pubsub');

/**
 * @typedef {Object} CuserClientOptions
 * @prop {Function} [fetch=_fetch] fetch function using to resolve requests
 * @prop {Function} [url=global.location] url to the api rest
 */

/**
 * @typedef {Object} CuserClientEvent
 * @prop {('created'|'updated'|'deleted')} type
 * @prop {CID} messageId
 */

/**
 * @callback CuserClientEventListener
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
 * const targetCid = 'CUSER_SERVER_IDENTIFIER';
 * const client = new CuserClient(node, targetCid);
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
   * @param {String} targetCID
   * @param {CuserClientOptions} opts
   */
  constructor(node, targetCID, opts) {
    super();
    const {
      url = global.location.protocol + '//' + global.location.hostname,
      fetch = _fetch
    } = { ...opts };

    if (!node) {
      throw new Error(`node must be defined an be an instance of IPFS`);
    }

    if (!targetCID) {
      throw new Error(`targetCID must be defined in order to resolve the resources`);
    }

    this._targetCID = targetCID;
    this._url = url;
    this._node = node;
    this._fetch = fetch;
    this._pubsub = createPubSub(this._node);
  }

  async getMessages(topicId, { limit = 10, offset = 0 } = {}) {
    // const await = await this._node.get(this._targetCID);
    // return new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve({
    //       messages: this.__messages__.slice(offset, offset + limit),
    //       count: this.__messages__.length,
    //     });
    //   }, Math.random() * 2000);
    // });
  }

  async publishMessage(topicId, accessToken, content) {
    // const message = {
    //   id: 'asdasdasdasd'+ this.__messages__.length,
    //   mdate: new Date().getTime(),
    //   content: {
    //     data: content
    //   },
    //   user: {
    //     peerId: 'asdasdasdasd',
    //     username: 'asdasd',
    //     avatar: 'https://avatars3.githubusercontent.com/u/6261914?s=460&u=2412cfab92dbef27237a478c0e073a59086762c2&v=4'
    //   }
    // };

    // this.__messages__.unshift(message);

    // return new Promise((resolve) => setTimeout(() => {
    //   this.emit(`message:${topicId}`, message);
    //   resolve();
    // }, 2000));
  }

  async updateMessage(topicId, accessToken, content) {

  }

  async deleteMessage(topicId, accessToken, content) {

  }

  async get(cid) {
    const node = await this._node;
    return node.get(cid);
  }

  async authenticate(payload) {
    const node = await this._node;
    const peerId = await node.id();

    return this._fetcher(this._url + '/auth',{
      method: 'POST',
      body: JSON.stringify({ ...payload, peerId }),
    })
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
   *      // console.log(client.get(messageCid));
   *      break;
   *    case 'updated':
   *      // when a user updates a message
   *      // console.log(client.get(messageCid));
   *      break;
   *    case 'deleted':
   *      // when a user removes a message
   *      // console.log(client.get(messageCid));
   *      break;
   *  }
   * });
   * ```
   * @param {String} topicId
   * @param {CuserClientEventListener} listener
   */
  subscribe(topicId, subscriber) {
    return this._pubsub.subscribe(topicId, subscriber);
  }
}

CuserClient.createClient = (node, opts) => {
  return new CuserClient(node, opts);
}

module.exports = CuserClient;
