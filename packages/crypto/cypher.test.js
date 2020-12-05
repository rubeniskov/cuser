const test = require('ava');
const createCypher = require('./cypher');

test.before((t) => {
  t.context.secret = 'supersecretkeyyoushouldnotcommit';
});

test('should encode and decode payload', (t) => {
  const { secret} = t.context;
  const payload = {
    foo: 'bar',
  }

  const bearer = createCypher(secret);

  const encoded = bearer.encode(payload);

  t.is(typeof encoded, 'string');

  const decoded = bearer.decode(encoded);

  t.is(decoded.foo, payload.foo);
});
