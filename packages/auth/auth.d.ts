export = createAuth;
/**
 * @param {CuserCore} core
 * @param {String} secret
 * @param {CuserAuthOptions} [opts]
 * @returns {CuserAuth}
 */
declare function createAuth(core: CuserCore, secret: string, opts?: CuserAuthOptions): CuserAuth;
declare namespace createAuth {
    export { CuserAuth, CuserCore, PayloadUser, CuserCryptoBearer, CuserCryptoKeygenOptions, CuserCryptoKeygen, CuserAuthOptions, CuserAuthAccessToken };
}
type CuserCore = import("@cuser/core").CuserCore;
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
     * @param {CuserCore} core
     * @param {String} secret
     * @param {CuserAuthOptions} [opts]
     */
    constructor(core: CuserCore, secret: string, opts?: CuserAuthOptions);
    /** @type {CuserCore} */
    _core: CuserCore;
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
