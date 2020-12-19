export = CuserAuthClient;
declare class CuserAuthClient {
    /**
     * @param {CuserCore} core
     */
    constructor(core: CuserCore);
    /** @type {CuserCore} */
    _core: CuserCore;
    /** @type {CuserCryptoBearer} */
    _bearer: CuserCryptoBearer;
    decode(accessToken: any): any;
}
declare namespace CuserAuthClient {
    export { createAuthClient, CuserCore, CuserCryptoBearer };
}
type CuserCore = import("@cuser/core").CuserCore;
type CuserCryptoBearer = createBearer.CoreCryptoBearer;
/**
 * @param {CuserCore} core
 */
declare function createAuthClient(core: CuserCore): CuserAuthClient;
import createBearer = require("@cuser/crypto/bearer");
