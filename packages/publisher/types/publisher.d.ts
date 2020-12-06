export = createPublisher;
/**
 * @param {CuserCore} core
 * @param {CuserAuth} auth
 * @param {CuserPublisherOptions & CuserStoreOptions} [opts]
 */
declare function createPublisher(core: any, auth: any, opts?: CuserPublisherOptions & CuserStoreOptions): CuserPublisher;
declare namespace createPublisher {
    export { CuserPublisher, Node, CuserCore, CuserCoreOptions, CuserStore, CuserStoreOptions, CuserAuth, CuserAuthOptions, CuserAuthAccessToken, PayloadPublishMessage, PayloadUpdateMessage, PayloadDeleteMessage, CuserPublisherOptions };
}
type CuserPublisherOptions = {
    isSerializable?: () => boolean;
    isDeserializable?: () => boolean;
    mapping?: Record<string, string>;
    aliases?: Record<string, import("redux").Reducer<any, import("redux").AnyAction>>;
    processMap?: (pointer: string, action: any) => string;
};
type CuserStoreOptions = {
    isSerializable?: () => boolean;
    isDeserializable?: () => boolean;
    mapping?: Record<string, string>;
    aliases?: Record<string, import("redux").Reducer<any, import("redux").AnyAction>>;
    processMap?: (pointer: string, action: any) => string;
};
/**
 * @typedef {CuserStoreOptions} CuserPublisherOptions
 */
/**
 *
 */
declare class CuserPublisher {
    /**
     * @param {CuserCore} core
     * @param {CuserAuth} auth
     * @param {CuserStoreOptions} [opts]
     */
    constructor(core: any, auth: any, opts?: CuserStoreOptions);
    /** @type {CuserCore} */
    _core: any;
    /** @type {CuserAuth} */
    _auth: any;
    /** @type {CuserStore} */
    _store: CuserStore;
    /**
     * Publish message and gets the computed cid
     * @param {String} topicId
     * @param {CuserAuthAccessToken} accessToken
     * @param {String} data
     */
    publishMessage(topicId: string, accessToken: CuserAuthAccessToken, data: string): Promise<any>;
    /**
     * Update message and gets computed cid
     * @param {String} topicId
     * @param {CuserAuthAccessToken} accessToken
     * @param {String} messageId
     * @param {String} data
     */
    updateMessage(topicId: string, accessToken: CuserAuthAccessToken, messageId: string, data: string): Promise<any>;
    /**
     * Delete message and gets the computed cid
     * @param {String} topicId
     * @param {CuserAuthAccessToken} accessToken
     * @param {String} messageId
     */
    deleteMessage(topicId: string, accessToken: CuserAuthAccessToken, messageId: string): Promise<any>;
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
type CuserCore = import("@cuser/core/types/core").CuserCore;
type CuserCoreOptions = {
    key?: string;
    format?: string;
    hashAlg?: string;
    timeout?: number;
    allowOffline?: boolean;
    parseCid?: Function;
};
type CuserStore = {
    exec: (action: import("redux").Action<any>) => Promise<any>;
    getState: () => any;
    subscribe: (subscriber: Function) => any;
};
type CuserAuth = import("@cuser/auth/types/auth").CuserAuth;
type CuserAuthOptions = {
    key?: string;
};
type CuserAuthAccessToken = string;
type PayloadPublishMessage = import("@cuser/proto/types/payloads").PayloadPublishMessage;
type PayloadUpdateMessage = import("@cuser/proto/types/payloads").PayloadUpdateMessage;
type PayloadDeleteMessage = import("@cuser/proto/types/payloads").PayloadDeleteMessage;
