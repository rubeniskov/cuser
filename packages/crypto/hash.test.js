const test = require('ava');
const createHash = require('./hash');

test('should throws an error when the secret has not the minimun length', async (t) => {
  const secret = 'invalid';
  t.throws(() => createHash(secret), {
    message: "CuserCrypto: secret must be defined and be at least 10 bytes"
  });
});

test('should can\'t not be empty', async (t) => {
  const secret = 'invalid';
  t.throws(() => createHash(secret), {
    message: "CuserCrypto: secret must be defined and be at least 10 bytes"
  });
});

test('should create a fixed 32 bits hash from a secret', async (t) => {
  const secret = 'this_is_a_test_secret';
  const hash = createHash(secret);

  t.true(hash instanceof Buffer);
  t.is(hash.length, 32);
});
