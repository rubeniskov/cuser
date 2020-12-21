
const test = require('ava');
const sinon = require('sinon');
const createCore = require('@cuser/core');
const createAuthClient = require('@cuser/auth/client');
const createReader = require('./reader');

const {
  md5,
  getMesageEntryFromCache,
  genObjectMessages
} = require('./testing');

test.beforeEach((t) => {
  const parseCid = sinon.spy(a => a);
  const count = 100;
  const cache = t.context.cache = genObjectMessages(count);
  let id;
  const topicId = t.context.topicId = 'custom_topic_id';
  const node = t.context.node = {
    id: () => Promise.resolve({ id }),
    name: {
      resolve: (id) => ({
        [Symbol.asyncIterator]() {
          return {
            next: async () => !this.entry
              ? { done: false, value: this.entry = id }
              : { done: true }
          };
        }
      }),
    },
    dag: {
      get: (hash) => Promise.resolve({ value: cache[hash], remainderPath: '/' }),
      put: (data) => {
        const hash = md5(data);
        cache[hash] = data;
        return hash
      },
    }
  };

  t.context.core = createCore(node, { parseCid });
  t.context.auth = createAuthClient();
  id = node.dag.put({
    topics: {
      [topicId]: node.dag.put({
        message: getMesageEntryFromCache(cache, count - 1)[0],
        count
      })
    }
  });
});

test('should raise an error when node not defined', (t) => {
  t.throws(() => {
    createReader(null)
  }, {
    message: /CuserReader: core must be defined and be an instance of CuserCore/
  });
});

test('should raise an error when auth not defined', (t) => {
  const { core } = t.context;
  t.throws(() => {
    createReader(core, null)
  }, {
    message: /CuserReader: auth must be defined and be an instance of CuserAuthClient/
  });
});

test('should raise an error when peerId not defined', (t) => {
  const { core, auth } = t.context;
  t.throws(() => {
    createReader(core, auth, null)
  }, {
    message: /CuserReader: peerId must be defined in order to resolve the resources/
  });
});

test('should raise an error when topic has not the right format', async (t) => {
  const { core, auth, cache, topicId, opts } = t.context;
  const peerId = 'custom_cuser_id';
  cache[peerId] = {
    topics: {
      [topicId]: {}
    }
  }
  const client = createReader(core, auth, peerId, opts);
  await t.throwsAsync(() => client.getMessages(topicId), {
    message: /CuserReader: error bad topic signature "custom_topic_id"/
  });
});

test('should raise an error when topic has not the message property doesn\'t exists', async (t) => {
  const { node, auth, core, cache, topicId, opts } = t.context;
  const peerId = 'custom_cuser_id';
  cache[peerId] = {
    topics: {
      [topicId]: node.dag.put({
        count: 0,
      })
    }
  }

  const client = createReader(core, auth, peerId, opts);
  await t.throwsAsync(() => client.getMessages(topicId), {
    message: /CuserReader: error message signature for topic "custom_topic_id", message is not detected/
  });
});

test('should raise an error when topic has not the message property with a right format', async (t) => {
  const { node, core, auth, cache, topicId, opts } = t.context;
  const peerId = 'custom_cuser_id';
  cache[peerId] = {
    topics: {
      [topicId]: node.dag.put({
        message: {},
      })
    }
  }

  const client = createReader(core, auth, peerId, opts);
  await t.throwsAsync(() => client.getMessages(topicId), {
    message: /CuserReader: error message signature for topic "custom_topic_id", message has not the right format/
  });
});

test('should return an empty array when no messages available', async (t) => {
  const { node, auth, core, cache, topicId, opts } = t.context;
  const peerId = 'custom_cuser_id';
  cache[peerId] = {
    topics: {
      [topicId]: node.dag.put({
        message: null,
      })
    }
  }

  const client = createReader(core, auth, peerId, opts);
  t.deepEqual(await client.getMessages(topicId), []);
});

test('should throws an error when topic doesn\'t exists', async (t) => {
  const { core, auth, opts } = t.context;
  const peerId = await core.peerId();
  const topicId = 'non_exist_topic_id';
  const client = createReader(core, auth, peerId, opts);


  await t.throwsAsync(() => {
    return client.getMessages(topicId);
  }, {
    message: `CuserReader: topicId "${topicId}" doesn\'t exists`
  });
});

test('should resolve messages using array', async (t) => {
  const { core, auth, topicId, opts } = t.context;
  const peerId = await core.peerId();
  const client = createReader(core, auth, peerId, opts);

  const messages = await client.getMessages(topicId);

  t.true(Array.isArray(messages));
  t.deepEqual(['node', 'cursor'], Object.keys(messages[0]))
  t.is(messages.length, 10);
});

test('should resolve messages using iterator', async (t) => {
  const { core, auth, topicId, opts } = t.context;
  const peerId = await core.peerId();
  const client = createReader(core, auth, peerId, opts);
  const messages = client.createMessageIterator(topicId);

  t.plan(10);
  for await (let value of messages) {
    t.is(typeof value, 'object');
  }
});

test('should resolve messages after certain id', async (t) => {
  const { core, auth, topicId, opts } = t.context;
  const peerId = await core.peerId();
  const client = createReader(core, auth, peerId, opts);

  const messages = await client.getMessages(topicId)
    .then((prev) => client.getMessages(topicId, {
      after: prev[prev.length - 1].cursor,
    })
    .then((next) => [...prev, ...next]));

  t.is(messages[0].node.id, 99);
  t.is(messages[messages.length - 1].node.id, 80);
  t.is(messages.length, 20);
});

test('should resolve messages first 12 messages after certain id', async (t) => {
  const { core, auth, cache, topicId, opts } = t.context;
  const peerId = await core.peerId();
  const after = getMesageEntryFromCache(cache, 12)[0]
  const client = createReader(core, auth, peerId, opts);

  const messages = await client.getMessages(topicId, { after })
    .then((prev) => client.getMessages(topicId, {
      after: prev[prev.length - 1].cursor,
    })
    .then((next) => [...prev, ...next]));

  t.is(messages[0].node.id, 11);
  t.is(messages[messages.length - 1].node.id, 0);
  t.is(messages.length, 12);
});
