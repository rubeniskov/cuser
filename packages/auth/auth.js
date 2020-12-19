// @ts-check
/** @typedef {import('@cuser/core').CuserCore} CuserCore */
/** @typedef {import('@cuser/proto/types/payloads').PayloadUser} PayloadUser */
/** @typedef {import('@cuser/crypto/bearer').CoreCryptoBearer} CuserCryptoBearer */
/** @typedef {import('@cuser/crypto/keygen').CuserCryptoKeygenOptions} CuserCryptoKeygenOptions */
/** @typedef {import('@cuser/crypto/keygen').CuserCryptoKeygen} CuserCryptoKeygen */
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
   * @param {CuserCore} core
   * @param {String} secret
   * @param {CuserAuthOptions} [opts]
   */
  constructor(core, secret, opts) {
    const hash = createHash(secret, 'base64');
    /** @type {CuserCore} */
    this._core = core;
    /** @type {CuserCryptoKeygen} */
    this._keygen = createKeygen(core, hash, opts);
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
 * @param {CuserCore} core
 * @param {String} secret
 * @param {CuserAuthOptions} [opts]
 * @returns {CuserAuth}
 */
const createAuth = (core, secret, opts) => new CuserAuth(core, secret, opts);

module.exports = createAuth;
module.exports.CuserAuth = CuserAuth;
