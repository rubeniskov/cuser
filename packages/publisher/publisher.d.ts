export = createPublisher;
/**
 * @param {CuserCore} core
 * @param {CuserAuth} auth
 * @param {CuserPublisherOptions & CuserStoreOptions} [opts]
 */
declare function createPublisher(core: CuserCore, auth: CuserAuth, opts?: CuserPublisherOptions & CuserStoreOptions): CuserPublisher;
declare namespace createPublisher {
    export { CuserPublisher, Node, CuserCoreOptions, CuserStore, CuserStoreOptions, CuserAuthOptions, CuserAuthAccessToken, PayloadPublishMessage, PayloadUpdateMessage, PayloadDeleteMessage, CuserPublisherOptions };
}
import { CuserCore } from "@cuser/core";
import { CuserAuth } from "@cuser/auth";
type CuserPublisherOptions = {
    restore?: boolean;
};
type CuserStoreOptions = any;
/**
 * @typedef {Object} CuserPublisherOptions
 * @prop {Boolean} [restore=true]
 */
/**
 *
 */
declare class CuserPublisher {
    /**
     * @param {CuserCore} core
     * @param {CuserAuth} auth
     * @param {CuserPublisherOptions & CuserStoreOptions} [opts]
     */
    constructor(core: CuserCore, auth: CuserAuth, opts?: CuserPublisherOptions & CuserStoreOptions);
    /** @type {CuserCore} */
    _core: CuserCore;
    /** @type {CuserAuth} */
    _auth: CuserAuth;
    /** @type {CuserStore} */
    _store: any;
    /**
     * Publish message and gets the computed cid
     * @param {String} topicId
     * @param {CuserAuthAccessToken} accessToken
     * @param {String} data
     */
    publishMessage(topicId: string, accessToken: CuserAuthAccessToken, data: string): Promise<void>;
    /**
     * Update message and gets computed cid
     * @param {String} topicId
     * @param {CuserAuthAccessToken} accessToken
     * @param {String} messageId
     * @param {String} data
     */
    updateMessage(topicId: string, accessToken: CuserAuthAccessToken, messageId: string, data: string): Promise<import("@cuser/core").PublishResult>;
    /**
     * Delete message and gets the computed cid
     * @param {String} topicId
     * @param {CuserAuthAccessToken} accessToken
     * @param {String} messageId
     */
    deleteMessage(topicId: string, accessToken: CuserAuthAccessToken, messageId: string): Promise<import("@cuser/core").PublishResult>;
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
type CuserCoreOptions = {
    key?: string;
    format?: string;
    hashAlg?: string;
    timeout?: number;
    allowOffline?: boolean;
    parseCid?: Function;
};
type CuserStore = any;
type CuserAuthOptions = {
    key?: string;
};
type CuserAuthAccessToken = string;
type PayloadPublishMessage = import("@cuser/proto/types/payloads").PayloadPublishMessage;
type PayloadUpdateMessage = import("@cuser/proto/types/payloads").PayloadUpdateMessage;
type PayloadDeleteMessage = import("@cuser/proto/types/payloads").PayloadDeleteMessage;
