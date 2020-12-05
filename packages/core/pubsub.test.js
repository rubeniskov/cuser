const test = require('ava');
const os = require('os');
const path = require('path');
const { create } = require('ipfs');
const createPubsub = require('./pubsub');

test.before(async (t) => {
  t.context.node = await create({
    repo: path.join(os.tmpdir(), 'pubsub-testing-repo'),
  });
});

const testSubscription = (t, pubsub) => {
  const expected = { foo: 'bar', bar: 'foo' };

  t.plan(5);

  const unsubscribe = pubsub.subscribe((payload) => {
    t.deepEqual(expected, payload.data);
    console.log(payload);
    unsubscribe();
    pubsub.broadcast(payload);
    t.end();
  });

  pubsub.broadcast(expected);

  t.is(typeof unsubscribe, 'function');
}

test.cb('should works locally when pubsub feature not detected', (t) => {
  const { node } = t.context;
  const pubsub = createPubsub({ ...node, pubsub: false })

  testSubscription(t, pubsub);
});

test.cb('should return a fetcher function', (t) => {
  const { node } = t.context;
  const pubsub = createPubsub(node);

  testSubscription(t, pubsub);
});
