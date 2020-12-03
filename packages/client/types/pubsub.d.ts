export = createPubSub;
/**
 * Creates pubsub cuser to listen changes on cuser network
 * @param {Node} node
 * @param {CuserClientPubSubOptions} [opts]
 */
declare function createPubSub(node: Node, opts?: CuserClientPubSubOptions): {
    /**
     * @param {String} topicId
     * @param {Object} payload
     */
    broadcast: (topicId: string, payload: any) => void;
    subscribe: (topicId: any, subscriber: any) => () => any;
};
declare namespace createPubSub {
    export { Node, CuserClientPubSubOptions };
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
    decode?: (data: any) => Buffer;
    channel?: string;
};
