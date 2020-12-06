
const test = require('ava');
const sinon = require('sinon');
const crypto = require('crypto');
const createClient = require('./client');
const md5 = (data) => crypto.createHash('md5').update(typeof data === 'string' ? data : JSON.stringify(data)).digest("hex");

const subscribeEvent = (client, topicId) => new Promise((resolve) => {
  const unsubscribe = client.subscribe(topicId, (evt) => {
    resolve(evt);
    unsubscribe();
  });
});

test.beforeEach((t) => {
  const parseCid = sinon.spy(a => a);
  const fetch = sinon.spy(() => Promise.resolve({
    messageCid: 'custom_message_id'
  }));
  t.context.opts = { parseCid, fetch };

  t.context.cache = {};
  t.context.topicId = 'custom_topic_id';
  t.context.node = {
    id: () => Promise.resolve({ id: 'custom_peer_id' }),
    dag: {
      get: (hash) => Promise.resolve({ value: cache[hash], remainderPath: '/' }),
      put: (data) => {
        const hash = md5(data);
        cache[hash] = data;
        return hash
      },
    }
  };
});

test('should guess url when global.location defined', async (t) => {
  const { node } = t.context;
  const { id: cuserId } = await node.id();
  const hostname = 'http://localhost:8080'
  global.location = new URL(`${hostname}/testing?query=test`);
  const client = createClient(node, cuserId);
  t.is(client._url, 'http://localhost:8080');
  delete global.location;
});

test('should raise an error when url can be resolved and is not provided at options when publishMessage', async (t) => {
  const { node, topicId, opts } = t.context;
  const { fetch } = opts;
  const { id: cuserId } = await node.id();
  const accessToken = 'randomAccessToken'
  const client = createClient(node, cuserId, opts);

  await t.throwsAsync(() => {
    return client.publishMessage(topicId, accessToken, 'this is a test message');
  }, {
    message: /CuserClient: options.url must be defined to enable publisher capabilities/
  });

  t.true(fetch.notCalled);
});

test('should send POST request when using publishMessage', async (t) => {
  const { node, topicId, opts } = t.context;
  const { fetch } = opts;
  const { id: cuserId } = await node.id();
  const accessToken = 'randomAccessToken';
  const content = 'this is a test message';
  const client = createClient(node, cuserId, {
    ...opts,
    url: 'http://example.com'
  });

  const [evt] = await Promise.all([
    subscribeEvent(client, topicId),
    client.publishMessage(topicId, accessToken, 'this is a test message'),
  ]);

  t.deepEqual(evt, {
    type: 'created',
    topicId: 'custom_topic_id',
    messageCid: 'custom_message_id'
  });

  t.deepEqual(fetch.args[0], [
    'http://example.com/v1/message',{
      method: 'POST',
      body: `{"topicId":"${topicId}","content":"${content}"}`,
      headers: { Authentication: accessToken }
    }
  ]);
});

test('should send PATCH request when using updateMessage', async (t) => {
  const { node, topicId, opts } = t.context;
  const { fetch } = opts;
  const { id: cuserId } = await node.id();
  const accessToken = 'randomAccessToken';
  const messageId = 'message_id';
  const client = createClient(node, cuserId, {
    ...opts,
    url: 'http://example.com'
  });

  const [evt] = await Promise.all([
    subscribeEvent(client, topicId),
    client.updateMessage(topicId, accessToken, messageId),
  ]);

  t.deepEqual(evt, {
    type: 'updated',
    topicId: 'custom_topic_id',
    messageCid: 'custom_message_id'
  });

  t.deepEqual(fetch.args[0], [
    'http://example.com/v1/message',{
      method: 'PATCH',
      body: `{"topicId":"${topicId}","messageId":"${messageId}"}`,
      headers: { Authentication: accessToken }
    }
  ]);
});

test('should send DELETE request when using deleteMessage', async (t) => {
  const { node, topicId, opts } = t.context;
  const { fetch } = opts;
  const { id: cuserId } = await node.id();
  const accessToken = 'randomAccessToken';
  const messageId = 'message_id';
  const client = createClient(node, cuserId, {
    ...opts,
    url: 'http://example.com'
  });

  const [evt] = await Promise.all([
    subscribeEvent(client, topicId),
    client.deleteMessage(topicId, accessToken, messageId),
  ]);

  t.deepEqual(evt, {
    type: 'deleted',
    topicId: 'custom_topic_id',
    messageCid: 'custom_message_id'
  });

  t.deepEqual(fetch.args[0], [
    'http://example.com/v1/message',{
      method: 'DELETE',
      body: `{"topicId":"${topicId}","messageId":"${messageId}"}`,
      headers: { Authentication: accessToken }
    }
  ]);
});

test('should send POST request when using authenticate', async (t) => {
  const { node, opts } = t.context;
  const { fetch } = opts;
  const { id: cuserId } = await node.id();
  const username = 'bob';
  const avatar = 'http://example.com/avatar';
  const client = createClient(node, cuserId, {
    ...opts,
    url: 'http://example.com'
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
  const { node, opts } = t.context;
  const topicId = 'custom_topic_id';
  const payload = { topicId, type: 'updated', foo: 'bar' };
  const client = createClient(node, 'custom_cuser_id', opts);

  t.plan(3);
  const unsubcribe = client.subscribe(topicId, (evt) => {
    t.is(payload.type, evt.type);
    t.is(payload.topicId, evt.topicId);
    t.is(payload.foo, evt.foo);
    unsubcribe();
    t.end();
  });

  client._pubsub.broadcast({});
  client._pubsub.broadcast(payload);
});
