export = createKeygen;
/**
 * @param {Node|Promise<Node>} node
 * @param {String} secret
 * @param {CuserCryptoKeygenOptions} opts
 * @returns {CuserCryptoKeygen}
 */
declare function createKeygen(node: Node | Promise<Node>, secret: string, opts: CuserCryptoKeygenOptions): CuserCryptoKeygen;
declare namespace createKeygen {
    export { CuserCryptoKeygen, Node, CuserCryptoKeygenOptions };
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
type CuserCryptoKeygenOptions = {
    key?: string;
};
/**
 * @typedef {Object} CuserCryptoKeygenOptions
 * @prop {String} [key='self']
 */
/**
 * Generate rsa pair keys from ipfs
 */
declare class CuserCryptoKeygen {
    /**
     * @param {Node|Promise<Node>} node
     * @param {String} secret
     * @param {CuserCryptoKeygenOptions} opts
     */
    constructor(node: Node | Promise<Node>, secret: string, opts: CuserCryptoKeygenOptions);
    _options: {
        key: string;
    };
    _node: import("ipfs-core/src/components").IPFSAPI | Promise<import("ipfs-core/src/components").IPFSAPI>;
    _secret: string;
    /**
     * @param {String} [key]
     */
    generateKeys(key?: string): Promise<{
        privateKey: any;
        publicKey: any;
    }>;
}
