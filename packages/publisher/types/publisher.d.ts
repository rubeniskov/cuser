export = createPublisher;
/**
 * @param {Node|Promise<Node>} node
 * @param {String} secret
 * @param {CuserStoreOptions & CuserCoreOptions & CuserAuthOptions} [opts]
 */
declare function createPublisher(node: Node | Promise<Node>, secret: string, opts?: CuserStoreOptions & CuserCoreOptions & CuserAuthOptions): CuserPublisher;
declare namespace createPublisher {
    export { CuserPublisher, Node, CuserCore, CuserCoreOptions, CuserStore, CuserStoreOptions, CuserAuth, CuserAuthOptions, CuserAuthAccessToken, PayloadPublishMessage, PayloadUpdateMessage, PayloadDeleteMessage };
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
type CuserStoreOptions = {
    isSerializable?: () => boolean;
    isDeserializable?: () => boolean;
    mapping?: Record<string, string>;
    aliases?: Record<string, import("redux").Reducer<any, import("redux").AnyAction>>;
    processMap?: (pointer: string, action: any) => string;
};
type CuserCoreOptions = {
    key?: string;
    format?: string;
    hashAlg?: string;
    timeout?: number;
    allowOffline?: boolean;
    parseCid?: Function;
};
type CuserAuthOptions = {
    key?: string;
};
/**
 *
 */
declare class CuserPublisher {
    /**
     * @param {Node|Promise<Node>} node
     * @param {String} secret
     * @param {CuserStoreOptions & CuserCoreOptions & CuserAuthOptions} [opts]
     */
    constructor(node: Node | Promise<Node>, secret: string, opts?: CuserStoreOptions & CuserCoreOptions & CuserAuthOptions);
    /** @type {CuserCore} */
    _core: CuserCore;
    /** @type {CuserAuth} */
    _auth: CuserAuth;
    /** @type {CuserStore} */
    _store: CuserStore;
    /**
     * Publish message and gets the computed cid
     * @param {String} topicId
     * @param {CuserAuthAccessToken} accessToken
     * @param {String} data
     */
    publishMessage(topicId: string, accessToken: CuserAuthAccessToken, data: string): Promise<import("@cuser/core/types/core").PublishResult>;
    /**
     * Update message and gets computed cid
     * @param {String} topicId
     * @param {CuserAuthAccessToken} accessToken
     * @param {String} messageId
     * @param {String} data
     */
    updateMessage(topicId: string, accessToken: CuserAuthAccessToken, messageId: string, data: string): Promise<import("@cuser/core/types/core").PublishResult>;
    /**
     * Delete message and gets the computed cid
     * @param {String} topicId
     * @param {CuserAuthAccessToken} accessToken
     * @param {String} messageId
     */
    deleteMessage(topicId: string, accessToken: CuserAuthAccessToken, messageId: string): Promise<import("@cuser/core/types/core").PublishResult>;
}
type CuserCore = import("@cuser/core/types/core").CuserCore;
type CuserStore = {
    exec: (action: import("redux").Action<any>) => Promise<any>;
    getState: () => any;
    subscribe: (subscriber: Function) => any;
};
type CuserAuth = import("@cuser/auth/types/auth").CuserAuth;
type CuserAuthAccessToken = string;
type PayloadPublishMessage = import("@cuser/proto/types/payloads").PayloadPublishMessage;
type PayloadUpdateMessage = import("@cuser/proto/types/payloads").PayloadUpdateMessage;
type PayloadDeleteMessage = import("@cuser/proto/types/payloads").PayloadDeleteMessage;
