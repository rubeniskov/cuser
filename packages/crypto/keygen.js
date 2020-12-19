// @ts-check
/** @typedef {import('@cuser/core').CuserCore} CuserCore */

const { pki } = require(['node','forge'].join('-'));

/**
 * @typedef {Object} CuserCryptoKeygenOptions
 * @prop {String} [key='self']
 */

/**
 * Generate rsa pair keys from ipfs
 */
class CuserCryptoKeygen {
  /**
   * @param {CuserCore} core
   * @param {String} secret
   * @param {CuserCryptoKeygenOptions} opts
   */
  constructor(core, secret, opts) {
    this._options = {
      key: 'self',
      ...opts
    }
    this._core = core;
    this._secret = secret;
  }

  /**
   */
  async generateKeys(opts) {
    // https://github.com/ipfs-inactive/interface-js-ipfs-core/blob/master/SPEC/KEY.md#ipfskeyexportname-password
    const privateKey = await this._core.key(this._secret, opts);
    // https://github.com/digitalbazaar/forge#pkcs8
    const pk = pki.decryptRsaPrivateKey(privateKey, this._secret);
    const asnPk = pki.setRsaPublicKey(pk.n, pk.e);
    const publicKey = pki.publicKeyToPem(asnPk);
    return {
      privateKey,
      publicKey,
    }
  }
}

/**
 * @param {CuserCore} core
 * @param {String} secret
 * @param {CuserCryptoKeygenOptions} opts
 * @returns {CuserCryptoKeygen}
 */
const createKeygen = (core, secret, opts) => new CuserCryptoKeygen(core, secret, opts);

module.exports = createKeygen;
module.exports.CuserCryptoKeygen = CuserCryptoKeygen;
