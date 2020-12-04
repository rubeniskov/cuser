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
  const type = 'created';
  const messageCid = 'custom_message_id';
  const topicId = 'custom_topic_id';

  t.plan(5);

  const unsubscribe = pubsub.subscribe(topicId, (evt) => {
    const { type, messageCid, from } = evt;
    t.is(evt.type, type);
    t.is(evt.messageCid, messageCid);
    t.is(evt.topicId, topicId);
    t.is(typeof from, 'string');

    unsubscribe();
    pubsub.broadcast(topicId, { type, messageCid });
    t.end();
  });

  pubsub.broadcast('non_subcribed_topicId', { type, messageCid });
  pubsub.broadcast(topicId, { type, messageCid });

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
