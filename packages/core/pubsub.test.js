const test = require('ava');
const os = require('os');
const path = require('path');
const { promisify } = require('util');
const rimraf = promisify(require('rimraf'));
const { create } = require('ipfs');
const createPubsub = require('./pubsub');

test.before(async (t) => {
  const repo = path.join(os.tmpdir(), 'pubsub-testing-repo');
  await rimraf(repo);
  t.context.node = await create({
    repo,
  });
  t.log(`starting ipfs node using repo ${repo}`);
});

test.after(async (t) => {
  t.log(`stoping ipfs`);
  await t.context.node.stop();
});

const testSubscription = (t, pubsub) => {
  const expected = { foo: 'bar', bar: 'foo' };

  t.plan(6);

  const unsubscribe = pubsub.subscribe((payload) => {
    t.deepEqual(expected, payload.data);
    t.true(Object.prototype.hasOwnProperty.call(payload, 'seqno'));
    t.true(Object.prototype.hasOwnProperty.call(payload, 'from'));
    t.true(Object.prototype.hasOwnProperty.call(payload, 'receivedFrom'));
    t.true(Object.prototype.hasOwnProperty.call(payload, 'topicIDs'));
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
