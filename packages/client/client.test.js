
const test = require('ava');
const sinon = require('sinon');
const crypto = require('crypto');
const createClient = require('./client');
const md5 = (data) => crypto.createHash('md5').update(typeof data === 'string' ? data : JSON.stringify(data)).digest("hex");

test.beforeEach((t) => {
  const domain = 'example.com';
  const hostname = `http://${domain}`
  const parseCid = sinon.spy(a => a);
  const cuserId = 'QmZFZMK6wMDvWCTwq5S1Wz7fRtZJayebxAPGkRttTV1V1f';
  const fetch = sinon.spy(() => Promise.resolve({
    messageCid: 'custom_message_id'
  }));
  t.context.opts = { parseCid, fetch };

  t.context.cache = {};
  t.context.cuserId = cuserId
  t.context.hostname = hostname;
  t.context.address = `/dns4/${domain}/tcp/4004/ws/p2p/${cuserId}`;
  t.context.topicId = 'custom_topic_id';
  t.context.node = {
    id: () => Promise.resolve({ id: cuserId }),
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
  const { node, hostname, address } = t.context;
  const client = createClient(node, address);
  t.is(client._url, hostname);
});

test('should send POST request when using publishMessage', async (t) => {
  const { node, address, topicId, opts } = t.context;
  const { fetch } = opts;
  const accessToken = 'randomAccessToken';
  const content = 'this is a test message';
  const client = createClient(node, address, opts);

  await client.publishMessage(topicId, accessToken, 'this is a test message');

  t.deepEqual(fetch.args[0], [
    'http://example.com/api/v0/rest/message',{
      method: 'POST',
      body: `{"topicId":"${topicId}","content":"${content}"}`,
      headers: { Authorization: accessToken }
    }
  ]);
});

test('should send PATCH request when using updateMessage', async (t) => {
  const { node, address, topicId, opts } = t.context;
  const { fetch } = opts;
  const accessToken = 'randomAccessToken';
  const messageId = 'message_id';
  const client = createClient(node, address, opts);

  await client.updateMessage(topicId, accessToken, messageId);

  t.deepEqual(fetch.args[0], [
    'http://example.com/api/v0/rest/message',{
      method: 'PATCH',
      body: `{"topicId":"${topicId}","messageId":"${messageId}"}`,
      headers: { Authorization: accessToken }
    }
  ]);
});

test('should send DELETE request when using deleteMessage', async (t) => {
  const { node, address, topicId, opts } = t.context;
  const { fetch } = opts;
  const accessToken = 'randomAccessToken';
  const messageId = 'message_id';
  const client = createClient(node, address, opts);

  await client.deleteMessage(topicId, accessToken, messageId);

  t.deepEqual(fetch.args[0], [
    'http://example.com/api/v0/rest/message',{
      method: 'DELETE',
      body: `{"topicId":"${topicId}","messageId":"${messageId}"}`,
      headers: { Authorization: accessToken }
    }
  ]);
});

test('should send POST request when using authenticate', async (t) => {
  const { node, address, cuserId, opts } = t.context;
  const { fetch } = opts;
  const username = 'bob';
  const avatar = 'http://example.com/avatar';
  const client = createClient(node, address, opts);

  await client.authenticate(username, avatar)

  t.deepEqual(fetch.args[0], [
    'http://example.com/api/v0/auth',{
      method: 'POST',
      body: `{"peerId":"${cuserId}","username":"${username}","avatar":"${avatar}"}`
    }
  ]);
});

test.cb('should subscribe to events', (t) => {
  const { node, address, opts } = t.context;
  const topicId = 'custom_topic_id';
  const payload = { topicId, type: 'updated', foo: 'bar' };
  const client = createClient(node, address, opts);

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
