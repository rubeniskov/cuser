// @ts-check
const branca = require("branca");
const msgpack = require('msgpack5');

/**
 *
 */
class CuserCryptoCypher {
  constructor(secret) {
    this._cypher = branca(secret);
    this._packer = msgpack();
  }

  encode(payload) {
    const packed = this._packer.encode(payload);
    return this._cypher.encode(packed);
  }

  decode(token) {
    const binary = this._cypher.decode(token);
    return this._packer.decode(Buffer.from(binary));
  }
}

const createCypher = (opts) => new CuserCryptoCypher(opts);

module.exports = createCypher;
module.exports.CuserCryptoCypher = CuserCryptoCypher;
