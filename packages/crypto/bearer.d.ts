export = createBearer;
/**
 * @param {String} secret
 * @param {CoreCryptoBearerOptions} opts
 */
declare function createBearer(secret: string, opts: CoreCryptoBearerOptions): CoreCryptoBearer;
declare namespace createBearer {
    export { CoreCryptoBearer, CoreCryptoBearerOptions };
}
type CoreCryptoBearerOptions = any;
/**
 * @typedef {Object} CoreCryptoBearerOptions
 * @param {String|Buffer} privateKey
 * @param {String|Buffer} publicKey
 * @param {('RS512'|'RS384'|'RS256')} [algorithm='RS512']
 */
/**
 *
 */
declare class CoreCryptoBearer {
    /**
     * @param {String} secret
     * @param {CoreCryptoBearerOptions} opts
     */
    constructor(secret: string, opts: CoreCryptoBearerOptions);
    _options: any;
    _secret: string;
    encode(payload: any): any;
    decode(token: any): any;
}
