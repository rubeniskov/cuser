export = createReader;
/**
 * @param {CuserCore} core
 * @param {String|Promise<String>} peerId
 * @param {CuserReaderOptions} [opts]
 */
declare function createReader(core: CuserCore, peerId: string | Promise<string>, opts?: CuserReaderOptions): CuserReader;
declare namespace createReader {
    export { CuserReader, GraphMessage, CuserReaderMessageIteratorResult, CuserReaderMessagesIteratorOptions, CuserReaderOptions };
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
     * @param {String|Promise<String>} peerId
     * @param {CuserReaderOptions} [opts]
     */
    constructor(core: CuserCore, peerId: string | Promise<string>, opts?: CuserReaderOptions);
    /** @type {CuserCore} */
    _core: CuserCore;
    _peerId: string | Promise<string>;
    _mapper: (message: GraphMessage) => Promise<any>;
    /** @type {(message: Object, cursor: String) => Promise<CuserReaderMessageIteratorResult>} */
    _process: (message: any, cursor: string) => Promise<CuserReaderMessageIteratorResult>;
    /**
     * Gets messages from `ipfs` layer
     * @param {String} topicId
     * @param {CuserReaderMessagesIteratorOptions} opts
     * @returns {Promise<CuserReaderMessageIteratorResult[]>|AsyncIterable<CuserReaderMessageIteratorResult>}
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
    getMessages(topicId: string, opts: CuserReaderMessagesIteratorOptions): Promise<CuserReaderMessageIteratorResult[]> | AsyncIterable<CuserReaderMessageIteratorResult>;
    /**
     * Gets the message from ipfs using the CID given by parameter
     * @param {String} cid
     * @returns {Promise<GraphMessage>}
     */
    getMessage(cid: string): Promise<GraphMessage>;
    /**
     * Get the root message for a certain topicId
     * @private
     * @param {String} topicId
     * @returns {Promise<string|null>}
     */
    private _resolveRootMessage;
}
type GraphMessage = import("@cuser/proto/graphs").GraphMessage;
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
