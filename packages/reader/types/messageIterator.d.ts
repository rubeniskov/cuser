export = messageIterator;
/**
 * Create message iterator which traverse resolving root and itertating by the key define by options
 * @param {(cursor: any) => Promise<any>} resolve
 * @param {any|Promise<any>} root
 * @param {CuserMessageIteratorOptions} [opts]
 * @returns {AsyncIterable<any>}
 */
declare function messageIterator(resolve: (cursor: any) => Promise<any>, root: any | Promise<any>, opts?: CuserMessageIteratorOptions): AsyncIterable<any>;
declare namespace messageIterator {
    export { CuserMessageIteratorOptions };
}
type CuserMessageIteratorOptions = {
    key?: string;
    limit?: number;
    skip?: number;
    process?: (value: any, cursor: any) => any;
};
