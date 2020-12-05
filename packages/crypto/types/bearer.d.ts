export = createBearer;
/**
 *
 * @param {CoreCryptoBearerOptions} opts
 */
declare function createBearer(opts: CoreCryptoBearerOptions): CoreCryptoBearer;
declare namespace createBearer {
    export { CoreCryptoBearer, CoreCryptoBearerOptions };
}
type CoreCryptoBearerOptions = any;
/**
 * @typedef {Object} CoreCryptoBearerOptions
 * @param {String} secret
 * @param {String|Buffer} privateKey
 * @param {String|Buffer} publicKey
 * @param {('RS512'|'RS384'|'RS256')} [algorithm='RS512']
 */
/**
 *
 */
declare class CoreCryptoBearer {
    /**
     *
     * @param {CoreCryptoBearerOptions} opts
     */
    constructor(opts: CoreCryptoBearerOptions);
    _options: any;
    encode(payload: any): any;
    decode(token: any): any;
}
