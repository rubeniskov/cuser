export = createPubSub;
/**
 * Creates pubsub to listen changes on cuser network
 * @param {Node|Promise<Node>} node
 * @param {CuserClientPubSubOptions} [opts]
 */
declare function createPubSub(node: Node | Promise<Node>, opts?: CuserClientPubSubOptions): ClientCorePubSub;
declare namespace createPubSub {
    export { ClientCorePubSub, Node, CuserClientPubSubOptions };
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
type CuserClientPubSubOptions = {
    /**
     * Encoder function to serialize event object
     */
    encode?: (data: any) => Buffer;
    /**
     * Decoder function to unserialize event object
     */
    decode?: (buf: Buffer) => any;
    channel?: string;
};
/**
 * Creates pubsub to listen changes on cuser network
 */
declare class ClientCorePubSub {
    /**
     * @param {Node|Promise<Node>} node
     * @param {CuserClientPubSubOptions} [opts]
     */
    constructor(node: Node | Promise<Node>, opts?: CuserClientPubSubOptions);
    _encode: any;
    _decode: any;
    _room: Promise<any>;
    /**
     * @param {Object} payload
     */
    broadcast(payload: any): void;
    /**
     * @param {(payload: Object) => void} subscriber
     */
    subscribe(subscriber: (payload: any) => void): () => Promise<any>;
}
