export = createAuth;
/**
 * @param {Node|Promise<Node>} node
 * @param {String} secret
 * @param {CuserAuthOptions} [opts]
 * @returns {CuserAuth}
 */
declare function createAuth(node: Node | Promise<Node>, secret: string, opts?: CuserAuthOptions): CuserAuth;
declare namespace createAuth {
    export { CuserAuth, Node, PayloadUser, CuserCryptoBearer, CuserCryptoKeygenOptions, CuserCryptoKeygen, CuserAuthOptions, CuserAuthAccessToken };
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
type CuserAuthOptions = {
    key?: string;
};
/**
 * @typedef {CuserCryptoKeygenOptions} CuserAuthOptions
 */
/**
 * @typedef {String} CuserAuthAccessToken
 */
/**
 * Auth controller
 */
declare class CuserAuth {
    /**
     * @param {Node|Promise<Node>} node
     * @param {String} secret
     * @param {CuserAuthOptions} [opts]
     */
    constructor(node: Node | Promise<Node>, secret: string, opts?: CuserAuthOptions);
    /** @type {CuserCryptoKeygen} */
    _keygen: CuserCryptoKeygen;
    /** @type {Promise<CuserCryptoBearer>} */
    _bearer: Promise<CuserCryptoBearer>;
    /**
     * @param {PayloadUser} payload
     * @returns {Promise<CuserAuthAccessToken>}
     */
    authenticate(payload: PayloadUser): Promise<CuserAuthAccessToken>;
    /**
     * @param {String} accessToken
     * @returns {Promise<PayloadUser & { iat: Number }>}
     */
    decode(accessToken: string): Promise<PayloadUser & {
        iat: number;
    }>;
}
type PayloadUser = import("@cuser/proto/types/payloads").PayloadUser;
type CuserCryptoBearer = createBearer.CoreCryptoBearer;
type CuserCryptoKeygenOptions = {
    key?: string;
};
type CuserCryptoKeygen = createKeygen.CuserCryptoKeygen;
type CuserAuthAccessToken = string;
import createBearer = require("@cuser/crypto/bearer");
import createKeygen = require("@cuser/crypto/keygen");
