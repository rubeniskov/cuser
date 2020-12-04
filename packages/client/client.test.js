
const test = require('ava');
const sinon = require('sinon');
const createClient = require('./client');

const {
  md5,
  getMesageEntryFromCache,
  genObjectMessages
} = require('./testing');

test.beforeEach((t) => {
  const cache = t.context.cache = genObjectMessages(100);
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
    createClient(null)
  }, {
    message: /CuserClient: node must be defined an be an instance of IPFS/
  });
});

test('should raise an error when cuserId not defined', (t) => {
  t.throws(() => {
    createClient({}, null)
  }, {
    message: /CuserClient: cuserId must be defined in order to resolve the resources/
  });
});

test('should raise an error when topic has not message property', async (t) => {
  const { node, cache } = t.context;
  const cuserId = 'custom_cuser_id';
  const topicId = 'custom_topic_id';
  cache[cuserId] = {
    topics: {
      [topicId]: {}
    }
  }
  const client = createClient(node, cuserId);
  await t.throwsAsync(() => client.getMessages(topicId), {
    message: /CuserClient: error signature topic "custom_topic_id", message is not detected/
  });
});

test('should guess url when global.location defined', async (t) => {
  const { node } = t.context;
  const { id: cuserId } = await node.id();
  const hostname = 'http://localhost:8080'
  global.location = new URL(`${hostname}/testing?query=test`);
  const client = createClient(node, cuserId);
  t.is(client._url, 'http://localhost:8080');
  delete global.location
});

test('should throw an error when topic doesn\'t exists', async (t) => {
  const { node } = t.context;
  const { id: cuserId } = await node.id();
  const topicId = 'non_exist_topic_id';
  const client = createClient(node, cuserId);


  await t.throwsAsync(() => {
    return client.getMessages(topicId);
  }, {
    message: `CuserClient: topicId "${topicId}" doesn\'t exists`
  });
});

test('should resolve messages using array', async (t) => {
  const { node } = t.context;
  const { id: cuserId } = await node.id();
  const client = createClient(node, cuserId);

  const messages = await client.getMessages('custom_topic_id');

  t.true(Array.isArray(messages));
  t.deepEqual(['node', 'cursor'], Object.keys(messages[0]))
  t.is(messages.length, 10);
});

test('should resolve messages using iterator', async (t) => {
  const { node } = t.context;
  const { id: cuserId } = await node.id();
  const client = createClient(node, cuserId);
  const messages = client.getMessages('custom_topic_id', {
    iterator: true,
  });

  t.plan(10);
  for await (let value of messages) {
    t.is(typeof value, 'object');
  }
});

test('should resolve messages after certain id', async (t) => {
  const { node } = t.context;
  const { id: cuserId } = await node.id();
  const client = createClient(node, cuserId);

  const messages = await client.getMessages('custom_topic_id')
    .then((prev) => client.getMessages('custom_topic_id', {
      after: prev[prev.length - 1].cursor,
    })
    .then((next) => [...prev, ...next]));

  t.is(messages[0].node.id, 99);
  t.is(messages[messages.length - 1].node.id, 80);
  t.is(messages.length, 20);

});

test('should raise an error when url can be resolved and is not provided at options when publishMessage', async (t) => {
  const { node, topicId } = t.context;
  const { id: cuserId } = await node.id();
  const accessToken = 'randomAccessToken'
  const fetch = sinon.spy();
  const client = createClient(node, cuserId, {
    fetch: fetch
  });

  await t.throwsAsync(() => {
    return client.publishMessage(topicId, accessToken, 'this is a test message');
  }, {
    message: /CuserClient: options.url must be defined to enable publisher capabilities/
  });

  t.true(fetch.notCalled);
});

test('should send POST request when using publishMessage', async (t) => {
  const { node, topicId } = t.context;
  const { id: cuserId } = await node.id();
  const accessToken = 'randomAccessToken';
  const content = 'this is a test message';
  const fetch = sinon.spy();
  const client = createClient(node, cuserId, {
    url: 'http://example.com',
    fetch: fetch
  });

  await client.publishMessage(topicId, accessToken, 'this is a test message')

  t.deepEqual(fetch.args[0], [
    'http://example.com/v1/message',{
      method: 'POST',
      body: `{"topicId":"${topicId}","content":"${content}"}`,
      headers: { Authentication: accessToken }
    }
  ]);
});

test('should send PATCH request when using updateMessage', async (t) => {
  const { node, topicId } = t.context;
  const { id: cuserId } = await node.id();
  const accessToken = 'randomAccessToken';
  const messageId = 'message_id';
  const fetch = sinon.spy();
  const client = createClient(node, cuserId, {
    url: 'http://example.com',
    fetch: fetch
  });

  await client.updateMessage(topicId, accessToken, messageId)

  t.deepEqual(fetch.args[0], [
    'http://example.com/v1/message',{
      method: 'PATCH',
      body: `{"topicId":"${topicId}","messageId":"${messageId}"}`,
      headers: { Authentication: accessToken }
    }
  ]);
});

test('should send DELETE request when using deleteMessage', async (t) => {
  const { node, topicId } = t.context;
  const { id: cuserId } = await node.id();
  const accessToken = 'randomAccessToken';
  const messageId = 'message_id';
  const fetch = sinon.spy();
  const client = createClient(node, cuserId, {
    url: 'http://example.com',
    fetch: fetch
  });

  await client.deleteMessage(topicId, accessToken, messageId)

  t.deepEqual(fetch.args[0], [
    'http://example.com/v1/message',{
      method: 'DELETE',
      body: `{"topicId":"${topicId}","messageId":"${messageId}"}`,
      headers: { Authentication: accessToken }
    }
  ]);
});

test('should send POST request when using authenticate', async (t) => {
  const { node } = t.context;
  const { id: cuserId } = await node.id();
  const username = 'bob';
  const avatar = 'http://example.com/avatar';
  const fetch = sinon.spy();
  const client = createClient(node, cuserId, {
    url: 'http://example.com',
    fetch: fetch
  });

  await client.authenticate(username, avatar)

  t.deepEqual(fetch.args[0], [
    'http://example.com/auth',{
      method: 'POST',
      body: `{"peerId":"${cuserId}","username":"${username}","avatar":"${avatar}"}`
    }
  ]);
});

test.cb('should subscribe to events', (t) => {
  const { node } = t.context;
  const fetch = sinon.spy();
  const evt = { type: 'updated' };
  const topicId = 'custom_topic_id';
  const client = createClient(node, 'custom_cuser_id', {
    fetch: fetch
  });

  t.plan(1);
  client.subscribe(topicId, (evt) => {
    t.pass();
    t.end();
  });

  client._pubsub.broadcast(topicId, evt);
});
