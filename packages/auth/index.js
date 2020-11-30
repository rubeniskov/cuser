const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');
const generateKeyPair = promisify(crypto.generateKeyPair);
const userSchema = require('@cuser/proto/schemas/PayloadUser.json');
const validate = require('@cuser/validator')(userSchema);

const genKeys = (secret) => {
  return generateKeyPair('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: secret
    }
  })
}

// const genKeys = (node, secret) => {
//   return Promise.resolve(node)
//     .then(({ config, id }) => Promise.all([
//       // config.get('Identity').then(({ PrivKey }) => PrivKey),
//       readFile('/tmp/ipfs/keys/pkcs8/self.data', { encoding: 'utf8' }),
//       id().then(({ publicKey }) => publicKey)
//     ]).then(([privateKey, publicKey]) => ({ publicKey, privateKey })))

//     // ({
//     //   privateKey: key.export('self', secret)
//     // }))
//     // .then((prev) => ({
//     //   ...prev
//     // }))
// }

const auth = (node, secret) => {
  const jwtOpts = { algorithm: 'RS512' };
  const keys = genKeys(secret);

  const accessToken = async (payload) => {
    validate(payload);

    return keys.then(({ privateKey }) => jwt.sign(payload, {
      key: privateKey,
      passphrase: secret,
    }, jwtOpts))
  }

  const verify = async (accessToken) => {
    return keys.then(({ publicKey }) => jwt.verify(accessToken, publicKey, jwtOpts))
  }

  return {
    accessToken,
    verify
  }
}
module.exports = auth;
