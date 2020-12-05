export = createReader;
/**
 * @param {Node|Promise<Node>} node
 * @param {String} peerId
 * @param {CuserReaderOptions & CuserCoreOptions} [opts]
 */
declare function createReader(node: Node | Promise<Node>, peerId: string, opts?: CuserReaderOptions & CuserCoreOptions): CuserReader;
declare namespace createReader {
    export { CuserReader, Node, GraphMessage, CuserCore, CuserCoreOptions, CuserReaderMessageIteratorResult, CuserReaderMessagesIteratorOptions, CuserReaderOptions };
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
type CuserReaderOptions = any;
type CuserCoreOptions = {
    key?: string;
    format?: string;
    hashAlg?: string;
    timeout?: number;
    allowOffline?: boolean;
    parseCid?: Function;
};
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
declare class CuserReader {
    /**
     * @param {Node|Promise<Node>} node
     * @param {String} peerId
     * @param {CuserReaderOptions & CuserCoreOptions} [opts]
     */
    constructor(node: Node | Promise<Node>, peerId: string, opts?: CuserReaderOptions & CuserCoreOptions);
    /** @type {CuserCore} */
    _core: CuserCore;
    _peerId: string;
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
    getMessages(topicId: string, opts: CuserReaderMessagesIteratorOptions): Promise<CuserReaderMessageIteratorResult[]>;
    /**
     * Gets the message from ipfs using the CID given by parameter
     * @param {String} cid
     * @returns {Promise<GraphMessage>}
     */
    getMessage(cid: string): Promise<GraphMessage>;
}
type GraphMessage = import("@cuser/proto/graphs").GraphMessage;
type CuserCore = import("@cuser/core/types/core").CuserCore;
type CuserReaderMessageIteratorResult = {
    node: GraphMessage;
    cursor: string;
};
/**
 * Iteration options for traversing messages using pagination
 * interface like [graphql](https://graphql.org/learn/pagination/)
 */
type CuserReaderMessagesIteratorOptions = {
    after?: number;
    first?: number;
    offset?: number;
    /**
     * Return the iterator instead of array
     */
    iterator?: boolean;
    /**
     * The iterator mapper
     */
    map?: (node: GraphMessage, cursor: string) => CuserReaderMessageIteratorResult;
};
