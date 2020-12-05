
const test = require('ava');
const sinon = require('sinon');
const createReader = require('./reader');

const {
  md5,
  getMesageEntryFromCache,
  genObjectMessages
} = require('./testing');

test.beforeEach((t) => {
  const parseCid = sinon.spy(a => a);
  const cache = t.context.cache = genObjectMessages(100);
  t.context.opts = { parseCid };
  let id;
  const topicId = t.context.topicId = 'custom_topic_id';
  const node = t.context.node = {
    id: () => Promise.resolve({ id }),
    dag: {
      get: (hash) => Promise.resolve({ value: cache[hash], remainderPath: '/' }),
      put: (data) => {
        const hash = md5(data);
        cache[hash] = data;
        return hash
      },
    }
  };

  id = node.dag.put({
    topics: {
      [topicId]: {
        message: getMesageEntryFromCache(cache, 99)[0],
        count: 100
      }
    }
  });
});

test('should raise an error when node not defined', (t) => {
  t.throws(() => {
    createReader(null)
  }, {
    message: /CuserReader: node must be defined an be an instance of IPFS/
  });
});

test('should raise an error when peerId not defined', (t) => {
  t.throws(() => {
    createReader({}, null)
  }, {
    message: /CuserReader: peerId must be defined in order to resolve the resources/
  });
});

test('should raise an error when topic has not message property', async (t) => {
  const { node, cache, opts } = t.context;
  const peerId = 'custom_cuser_id';
  const topicId = 'custom_topic_id';
  cache[peerId] = {
    topics: {
      [topicId]: {}
    }
  }
  const client = createReader(node, peerId, opts);
  await t.throwsAsync(() => client.getMessages(topicId), {
    message: /CuserReader: error signature topic "custom_topic_id", message is not detected/
  });
});

test('should throws an error when topic doesn\'t exists', async (t) => {
  const { node, opts } = t.context;
  const { id: peerId } = await node.id();
  const topicId = 'non_exist_topic_id';
  const client = createReader(node, peerId, opts);


  await t.throwsAsync(() => {
    return client.getMessages(topicId);
  }, {
    message: `CuserReader: topicId "${topicId}" doesn\'t exists`
  });
});

test('should resolve messages using array', async (t) => {
  const { node, opts } = t.context;
  const { id: peerId } = await node.id();
  const client = createReader(node, peerId, opts);

  const messages = await client.getMessages('custom_topic_id');

  t.true(Array.isArray(messages));
  t.deepEqual(['node', 'cursor'], Object.keys(messages[0]))
  t.is(messages.length, 10);
});

test('should resolve messages using iterator', async (t) => {
  const { node, opts } = t.context;
  const { id: peerId } = await node.id();
  const client = createReader(node, peerId, opts);
  const messages = client.getMessages('custom_topic_id', {
    iterator: true,
  });

  t.plan(10);
  for await (let value of messages) {
    t.is(typeof value, 'object');
  }
});

test('should resolve messages after certain id', async (t) => {
  const { node, opts } = t.context;
  const { id: peerId } = await node.id();
  const client = createReader(node, peerId, opts);

  const messages = await client.getMessages('custom_topic_id')
    .then((prev) => client.getMessages('custom_topic_id', {
      after: prev[prev.length - 1].cursor,
    })
    .then((next) => [...prev, ...next]));

  t.is(messages[0].node.id, 99);
  t.is(messages[messages.length - 1].node.id, 80);
  t.is(messages.length, 20);

});
