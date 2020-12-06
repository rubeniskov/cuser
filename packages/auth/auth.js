// @ts-check
/** @typedef {import("ipfs-core/src/components").IPFSAPI} Node */
/** @typedef {import('@cuser/proto/types/payloads').PayloadUser} PayloadUser */
/** @typedef {import('@cuser/crypto/types/bearer').CoreCryptoBearer} CuserCryptoBearer */
/** @typedef {import('@cuser/crypto/types/keygen').CuserCryptoKeygenOptions} CuserCryptoKeygenOptions */
/** @typedef {import('@cuser/crypto/types/keygen').CuserCryptoKeygen} CuserCryptoKeygen */
const createBearer = require('@cuser/crypto/bearer');
const createHash = require('@cuser/crypto/hash');
const createKeygen = require('@cuser/crypto/keygen');
const userSchema = require('@cuser/proto/schemas/PayloadUser.json');
const validate = require('@cuser/validator')(userSchema);

/**
 * @typedef {CuserCryptoKeygenOptions} CuserAuthOptions
 */

/**
 * @typedef {String} CuserAuthAccessToken
 */

/**
 * Auth controller
 */
class CuserAuth {
  /**
   * @param {Node|Promise<Node>} node
   * @param {String} secret
   * @param {CuserAuthOptions} [opts]
   */
  constructor(node, secret, opts) {
    const hash = createHash(secret, 'base64');
    /** @type {CuserCryptoKeygen} */
    this._keygen = createKeygen(node, hash, opts);
    /** @type {Promise<CuserCryptoBearer>} */
    this._bearer = this._keygen.generateKeys().then(({ privateKey, publicKey }) => createBearer(hash, {
      privateKey,
      publicKey,
    }));
  }

  /**
   * @param {PayloadUser} payload
   * @returns {Promise<CuserAuthAccessToken>}
   */
  async authenticate(payload) {
    validate(payload);
    const bearer = await this._bearer;
    return bearer.encode(payload);
  }

  /**
   * @param {String} accessToken
   * @returns {Promise<PayloadUser & { iat: Number }>}
   */
  async decode(accessToken) {
    const bearer = await this._bearer;
    return bearer.decode(accessToken);
  }
}

/**
 * @param {Node|Promise<Node>} node
 * @param {String} secret
 * @param {CuserAuthOptions} [opts]
 * @returns {CuserAuth}
 */
const createAuth = (node, secret, opts) => new CuserAuth(node, secret, opts);

module.exports = createAuth;
module.exports.CuserAuth = CuserAuth;
