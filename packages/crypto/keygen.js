// @ts-check
/** @typedef {import('ipfs-core/src/components').IPFSAPI} Node */
// /** @typedef {import('node-forge')} Forge */
// /** @tyepe {Forge} */
// const { pki } = require(['node','forge'].join('-'));
const { pki } = require('node-forge');

/**
 * @typedef {Object} CuserCryptoKeygenOptions
 * @prop {String} [key='self']
 */

/**
 * Generate rsa pair keys from ipfs
 */
class CuserCryptoKeygen {
  /**
   * @param {Node|Promise<Node>} node
   * @param {String} secret
   * @param {CuserCryptoKeygenOptions} opts
   */
  constructor(node, secret, opts) {
    this._options = {
      key: 'self',
      ...opts
    }
    this._node = node;
    this._secret = secret;
  }

  /**
   * @param {String} [key]
   */
  async generateKeys(key) {
    const node = await this._node;
    // https://github.com/ipfs-inactive/interface-js-ipfs-core/blob/master/SPEC/KEY.md#ipfskeyexportname-password
    const privateKey = await node.key.export(key || this._options.key, this._secret);
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
 * @param {Node|Promise<Node>} node
 * @param {String} secret
 * @param {CuserCryptoKeygenOptions} opts
 * @returns {CuserCryptoKeygen}
 */
const createKeygen = (node, secret, opts) => new CuserCryptoKeygen(node, secret, opts);

module.exports = createKeygen;
module.exports.CuserCryptoKeygen = CuserCryptoKeygen;
