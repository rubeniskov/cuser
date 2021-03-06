export = createClient;
/**
 * @param {Node|Promise<Node>} node
 * @param {String} cuserId
 * @param {CuserClientOptions & CuserReaderOptions & CuserCoreOptions} [opts]
 */
declare function createClient(node: Node | Promise<Node>, cuserId: string, opts?: CuserClientOptions & CuserReaderOptions & CuserCoreOptions): CuserClient;
declare namespace createClient {
    export { CuserClient, Node, GraphMessage, CuserReaderOptions, CuserCoreOptions, CuserClientOptions, CuserClientEvent, CuserClientSubscriber };
}
type Node = {
    add: import("ipfs-core/src/components").Add;
    bitswap: import("ipfs-core/src/components").BitSwap;
    block: import("ipfs-core/src/components").Block;
    bootstrap: import("ipfs-core/src/components").Bootstrap;
    cat: import("ipfs-core/src/components").Cat;
    config: import("ipfs-core/src/components").Config;
    dag: import("ipfs-core/src/components").DAG;
    dht: import("ipfs-core/src/components").DHT;
    dns: import("ipfs-core/src/components").DNS;
    files: import("ipfs-core/src/components").Files;
    get: import("ipfs-core/src/components").Get;
    id: import("ipfs-core/src/components").ID;
    isOnline: import("ipfs-core/src/components").IsOnline;
    key: import("ipfs-core/src/components").Key;
    libp2p: any;
    ls: import("ipfs-core/src/components").LS;
    name: import("ipfs-core/src/components").Name;
    object: import("ipfs-core/src/components").ObjectAPI;
    pin: import("ipfs-core/src/components").Pin;
    ping: import("ipfs-core/src/components").Ping;
    pubsub: import("ipfs-core/src/components").PubSub;
    refs: import("ipfs-core/src/components").Refs;
    repo: import("ipfs-core/src/components").Repo;
    resolve: import("ipfs-core/src/components").Resolve;
    stats: import("ipfs-core/src/components").Stats;
    swarm: import("ipfs-core/src/components").Swarm;
    version: import("ipfs-core/src/components").Version;
    init: import("ipfs-core/src/components").Init;
    start: import("ipfs-core/src/components").Start;
    stop: import("ipfs-core/src/components").Stop;
};
type CuserClientOptions = {
    /**
     * fetch function using to resolve requests
     */
    fetch?: Function;
    /**
     * url to the api rest
     */
    url?: string;
    /**
     * routes used to resolve enpoints
     */
    routes?: Record<string, string>;
};
type CuserReaderOptions = {
    mapper?: (message: import("@cuser/proto/graphs").GraphMessage) => Promise<any>;
};
type CuserCoreOptions = {
    key?: string; /**
     * @param {Node|Promise<Node>} node
     * @param {String} cuserId
     * @param {CuserClientOptions & CuserReaderOptions & CuserCoreOptions} [opts]
     */
    format?: string;
    hashAlg?: string;
    timeout?: number;
    allowOffline?: boolean;
    parseCid?: Function;
};
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
declare class CuserClient extends CuserReader {
    /**
     * @param {Node|Promise<Node>} node
     * @param {String} cuserId
     * @param {CuserClientOptions & CuserReaderOptions & CuserCoreOptions} [opts]
     */
    constructor(node: Node | Promise<Node>, cuserId: string, opts?: CuserClientOptions & CuserReaderOptions & CuserCoreOptions);
    _cuserId: string;
    _url: string;
    _fetch: Function;
    _pubsub: import("@cuser/core/pubsub").ClientCorePubSub;
    _routes: {
        publisher: string;
        auth: string;
    };
    /**
     * Authenticates a user with the required fields of username and avatar,
     * this will epect to recieve an access_token to be used in publishing operations
     * @param {String} username
     * @param {String} avatar data url scheme https://tools.ietf.org/html/rfc2397
     */
    authenticate(username: string, avatar: string): Promise<any>;
    /**
     * Publish a new message for certain topic using topicId as identifier
     * and accessToken to identify the user
     * @param {String} topicId
     * @param {String} accessToken
     * @param {String} content
     * @returns {Promise<[Object,Response]>}
     */
    publishMessage(topicId: string, accessToken: string, content: string): Promise<[any, Response]>;
    /**
     * Updates message for certain topic using topicId as identifier
     * and accessToken to identify the user
     * @param {String} topicId
     * @param {String} accessToken
     * @param {String} messageId
     * @param {String} content
     * @returns {Promise<[Object,Response]>}
     */
    updateMessage(topicId: string, accessToken: string, messageId: string, content: string): Promise<[any, Response]>;
    /**
     * Deletes message for certain topic using topicId as identifier
     * and accessToken to identify the user
     * @param {String} topicId
     * @param {String} accessToken
     * @param {String} messageId
     * @returns {Promise<[Object,Response]>}
     */
    deleteMessage(topicId: string, accessToken: string, messageId: string): Promise<[any, Response]>;
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
    subscribe(topicId: string, subscriber: CuserClientSubscriber): () => Promise<any>;
}
type GraphMessage = import("@cuser/proto/types/graphs").GraphMessage;
type CuserClientEvent = {
    type: ('created' | 'updated' | 'deleted');
    messageId: string;
};
type CuserClientSubscriber = (event: CuserClientEvent) => any;
import CuserReader_1 = require("@cuser/reader");
import CuserReader = CuserReader_1.CuserReader;
