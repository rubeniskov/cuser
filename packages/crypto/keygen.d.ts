export = createKeygen;
/**
 * @param {CuserCore} core
 * @param {String} secret
 * @param {CuserCryptoKeygenOptions} opts
 * @returns {CuserCryptoKeygen}
 */
declare function createKeygen(core: CuserCore, secret: string, opts: CuserCryptoKeygenOptions): CuserCryptoKeygen;
declare namespace createKeygen {
    export { CuserCryptoKeygen, CuserCore, CuserCryptoKeygenOptions };
}
type CuserCore = import("@cuser/core").CuserCore;
type CuserCryptoKeygenOptions = {
    key?: string;
};
/**
 * @typedef {Object} CuserCryptoKeygenOptions
 * @prop {String} [key='self']
 */
/**
 * Generate rsa pair keys from ipfs
 */
declare class CuserCryptoKeygen {
    /**
     * @param {CuserCore} core
     * @param {String} secret
     * @param {CuserCryptoKeygenOptions} opts
     */
    constructor(core: CuserCore, secret: string, opts: CuserCryptoKeygenOptions);
    _options: {
        key: string;
    };
    _core: import("@cuser/core").CuserCore;
    _secret: string;
    /**
     */
    generateKeys(opts: any): Promise<{
        privateKey: string;
        publicKey: any;
    }>;
}
