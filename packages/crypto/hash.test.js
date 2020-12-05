const test = require('ava');
const createHash = require('./hash');

test('should create a fixed 32 bits hash from a secret', async (t) => {
  const secret = 'this is a test';
  const hash = createHash(secret);

  t.true(hash instanceof Buffer);
  t.is(hash.length, 32);
});
