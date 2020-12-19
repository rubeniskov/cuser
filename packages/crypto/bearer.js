//@ts-check
const jwt = require('jsonwebtoken');

/**
 * @typedef {Object} CoreCryptoBearerOptions
 * @param {String|Buffer} privateKey
 * @param {String|Buffer} publicKey
 * @param {('RS512'|'RS384'|'RS256')} [algorithm='RS512']
 */

/**
 *
 */
class CoreCryptoBearer {
  /**
   * @param {String} secret
   * @param {CoreCryptoBearerOptions} opts
   */
  constructor(secret, opts) {
    this._options = {
      algorithm: 'RS512',
      ...opts
    }
    this._secret = secret;
  }

  encode(payload) {
    const { privateKey, algorithm } = this._options;
    return jwt.sign(payload, {
      key: privateKey,
      passphrase: this._secret,
    }, { algorithm });
  }

  decode(token) {
    const { publicKey, algorithm } = this._options;
    return jwt.verify(token, publicKey, { algorithm });
  }
}

/**
 * @param {String} secret
 * @param {CoreCryptoBearerOptions} opts
 */
const createBearer = (secret, opts) => new CoreCryptoBearer(secret, opts);

module.exports = createBearer;
module.exports.decode = jwt.decode;
module.exports.CoreCryptoBearer = CoreCryptoBearer;
