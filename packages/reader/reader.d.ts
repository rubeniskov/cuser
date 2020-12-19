export = createReader;
/**
 * @param {CuserCore} core
 * @param {CuserAuthClient} auth
 * @param {String|Promise<String>} peerId
 * @param {CuserReaderOptions} [opts]
 */
declare function createReader(core: CuserCore, auth: any, peerId: string | Promise<string>, opts?: CuserReaderOptions): CuserReader;
declare namespace createReader {
    export { CuserReader, GraphMessage, GraphTopic, GraphUser, CuserReaderMessageIteratorResult, CuserReaderMessagesIteratorOptions, CuserReaderOptions };
}
import { CuserCore } from "@cuser/core";
type CuserReaderOptions = {
    mapper?: (message: GraphMessage) => Promise<any>;
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
 * @prop {(message: GraphMessage) => Promise<Object>} [mapper]
 */
/**
 */
declare class CuserReader {
    /**
     * @param {CuserCore} core
     * @param {CuserAuthClient} auth
     * @param {String|Promise<String>} peerId
     * @param {CuserReaderOptions} [opts]
     */
    constructor(core: CuserCore, auth: any, peerId: string | Promise<string>, opts?: CuserReaderOptions);
    /** @type {CuserCore} */
    _core: CuserCore;
    /** @type {CuserAuthClient} */
    _auth: any;
    _peerId: string | Promise<string>;
    _mapper: (message: GraphMessage) => Promise<any>;
    /** @type {(message: Object, cursor: String) => Promise<CuserReaderMessageIteratorResult>} */
    _process: (message: any, cursor: string) => Promise<CuserReaderMessageIteratorResult>;
    /**
     * Creates a message iterator resolving the data from `ipfs` layer
     * @param {String} topicId
     * @param {CuserReaderMessagesIteratorOptions} [opts]
     * @returns {AsyncIterable<CuserReaderMessageIteratorResult>}
     * @example
     * ### Array
     * ```javascript
     * const messages = reader.getMessages('custom_topic_id');
     * for await (let value of messages) {
     *   console.log(value);
     * }
     * ```
     */
    createMessageIterator(topicId: string, opts?: CuserReaderMessagesIteratorOptions): AsyncIterable<CuserReaderMessageIteratorResult>;
    /**
     * Gets messages from `ipfs` layer
     * @param {String} topicId
     * @param {CuserReaderMessagesIteratorOptions} [opts]
     * @returns {Promise<CuserReaderMessageIteratorResult[]>}
     * @example
     * ### Array
     * ```javascript
     * const messages = reader.getMessages('custom_topic_id');
     * console.log(messages);
     * ```
     */
    getMessages(topicId: string, opts?: CuserReaderMessagesIteratorOptions): Promise<CuserReaderMessageIteratorResult[]>;
    /**
     *
     * @param {String} topicId
     * @param {CuserReaderMessagesIteratorOptions} [opts]
     */
    getMessagesEdges(topicId: string, opts?: CuserReaderMessagesIteratorOptions): Promise<{
        edges: CuserReaderMessageIteratorResult[];
        pageInfo: {
            hasNextPage: boolean;
        };
    }>;
    /**
     * Gets the message from ipfs using the CID given by parameter
     * @param {String} cid
     * @returns {Promise<GraphMessage>}
     */
    getMessage(cid: string): Promise<GraphMessage>;
    /**
     * Gets the user from bearer access token
     * @param {String} accessToken
     * @returns {Promise<GraphUser>}
     */
    getUserByAccessToken(accessToken: string): Promise<GraphUser>;
    /**
     * Get the root message for a certain topicId
     * @private
     * @param {String} topicId
     * @param {String} [rootId]
     * @returns {Promise<GraphTopic|null>}
     */
    private _resolveRootMessage;
}
type GraphMessage = import("@cuser/proto/graphs").GraphMessage;
type GraphTopic = import("@cuser/proto/graphs").GraphTopic;
type GraphUser = import("@cuser/proto/graphs").GraphUser;
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
