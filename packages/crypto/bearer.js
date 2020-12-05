const jwt = require('jsonwebtoken');

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
class CoreCryptoBearer {
  /**
   *
   * @param {CoreCryptoBearerOptions} opts
   */
  constructor(opts) {
    this._options = {
      algorithm: 'RS512',
      ...opts
    }
  }

  encode(payload) {
    const { privateKey, secret, algorithm } = this._options;
    return jwt.sign(payload, {
      key: privateKey,
      passphrase: secret,
    }, { algorithm });
  }

  decode(token) {
    const { publicKey, algorithm } = this._options;
    return jwt.verify(token, publicKey, { algorithm });
  }
}

/**
 *
 * @param {CoreCryptoBearerOptions} opts
 */
const createBearer = (opts) => new CoreCryptoBearer(opts);

module.exports = createBearer;
module.exports.CoreCryptoBearer = CoreCryptoBearer;
