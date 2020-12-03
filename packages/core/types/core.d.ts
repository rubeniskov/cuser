export = createCore;
/**
 *
 * @param {Node} node
 * @param {CuserCoreOptions} opts
 */
declare function createCore(node: Node, opts: CuserCoreOptions): CuserCore;
declare namespace createCore {
    export { CuserCore, PublishResult, Node, PutOptions, AbortOptions, CuserCoreOptions };
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
    format?: string;
    hashAlg?: string;
    timeout?: string;
    allowOffline?: string;
};
/**
 * @typedef {Object} CuserCoreOptions
 * @prop {String} [format='dag-cbor']
 * @prop {String} [hashAlg='sha3-512']
 * @prop {String} [timeout=30000]
 * @prop {String} [allowOffline=true]
 */
/**
 * Core logic to manage the dag tree and specify the dag format, this will wraps
 * ipfs.dag in order to normalize the mainly used methods and allows future replacements.
 */
declare class CuserCore {
    /**
     * @param {Node} node
     * @param {CuserCoreOptions} opts
     */
    constructor(node: Node, opts: CuserCoreOptions);
    _options: {
        format: string;
        hashAlg: string;
        timeout: string | number;
        allowOffline: string | boolean;
    };
    _node: import("ipfs-core/src/components").IPFSAPI;
    /**
     * Publish using ipns to link the current cid to a fixed entry
     * @param {String} cid
     * @param {AbortOptions} opts
     * @returns {Promise<PublishResult>}
     */
    publish(cid: string, opts: AbortOptions): Promise<PublishResult>;
    /**
     * @param {Uint8Array} buf
     * @param {AbortOptions} opts
     * @returns {Promise<String>}
     */
    put(buf: Uint8Array, opts: AbortOptions): Promise<string>;
    /**
     *
     * @param {String} cid
     * @param {AbortOptions} opts
     * @returns {Promise<any>}
     */
    get(cid: string, opts: AbortOptions): Promise<any>;
    /**
     * Resolve the linked dag cid
     * @param {String} cid
     * @returns {Promise<String>}
     */
    resolve(cid: string): Promise<string>;
}
type PublishResult = {
    name: string;
    value: string;
};
type PutOptions = {
    cid?: import("cids");
    format?: string;
    mhtype?: string;
    mhlen?: number;
    version?: 0 | 1;
    pin?: boolean;
    preload?: boolean;
};
type AbortOptions = {
    timeout?: number;
    signal?: AbortSignal;
};
