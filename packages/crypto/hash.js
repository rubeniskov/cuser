const crypto = require('crypto');

/**
 * Returns a 32 bytes fixed length hash from a secret word
 * @param {String} secret
 * @param {String} [encoding='buffer']
 */
const createHash = (secret, encoding = 'buffer') => {
  return crypto.createHash('sha256').update(secret).digest(encoding);
}

module.exports = createHash;
