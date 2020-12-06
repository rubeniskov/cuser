// @ts-check
const crypto = require('crypto');

/**
 * Returns a 32 bytes fixed length hash from a secret word
 * @param {String} secret
 * @param {String} [encoding='buffer']
 */
const createHash = (secret, encoding = 'buffer') => {
  if (!secret || secret.length < 10) {
    throw new Error('CuserCrypto: secret must be defined and be at least 10 bytes');
  }
  // @ts-ignore
  return crypto.createHash('sha256').update(secret).digest(encoding);
}

module.exports = createHash;
