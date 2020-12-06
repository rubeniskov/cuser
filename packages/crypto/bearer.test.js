const test = require('ava');
const { promisify } = require('util');
const crypto = require('crypto');
const createBearer = require('./bearer');
const generateKeyPair = promisify(crypto.generateKeyPair);

const genKeys = (secret) => generateKeyPair('rsa', {
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
});

test.before(async (t) => {
  t.context.secret = 'bearer_testing_secret';
  t.context.keys = await genKeys(t.context.secret);
});

test('should encode and decode payload', (t) => {
  const { secret, keys: { privateKey, publicKey } } = t.context;
  const payload = {
    foo: 'bar',
  }

  const bearer = createBearer(secret, {
    privateKey,
    publicKey,
  });

  const encoded = bearer.encode(payload);

  t.is(typeof encoded, 'string');

  const decoded = bearer.decode(encoded);

  t.is(decoded.foo, payload.foo);
});
