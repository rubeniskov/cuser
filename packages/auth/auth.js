// @ts-check
/** @typedef {import("ipfs-core/src/components").IPFSAPI} Node */
const { createBearer, createHash } = require('@cuser/crypto');
const userSchema = require('@cuser/proto/schemas/PayloadUser.json');
const validate = require('@cuser/validator/validator')(userSchema);
const { pki } = require('node-forge');

const getKeysFromNode = (node, secret, keyName) => {
  return Promise.resolve(node)
    // https://github.com/ipfs-inactive/interface-js-ipfs-core/blob/master/SPEC/KEY.md#ipfskeyexportname-password
    .then(({ key }) => key.export(keyName, secret))
    .then((privateKey) => {
      // https://github.com/digitalbazaar/forge#pkcs8
      const pk = pki.decryptRsaPrivateKey(privateKey, secret);
      // @ts-ignore
      const asnPk = pki.setRsaPublicKey(pk.n, pk.e);
      const publicKey = pki.publicKeyToPem(asnPk);
      return {
        privateKey,
        publicKey,
      }
    });
}

/**
 * @typedef {Object} CuserAuthOptions
 * @prop {String} [key='self']
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
    const { key = 'self' } = { ...opts };
    const hash = createHash(secret, 'base64');
    this._bearer = getKeysFromNode(node, hash, key).then(({ privateKey, publicKey }) => createBearer(hash, {
      privateKey,
      publicKey,
    }));
  }

  /**
   * @param {Object} payload
   */
  async authenticate(payload) {
    validate(payload);
    const bearer = await this._bearer;
    return bearer.encode(payload);
  }

  /**
   * @param {String} accessToken
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
