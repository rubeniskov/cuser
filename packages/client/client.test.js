
const test = require('ava');
const crypto = require('crypto');
const sinon = require('sinon');
const createClient = require('./client');

const md5 = (data) => crypto.createHash('md5').update(typeof data === 'string' ? data : JSON.stringify(data)).digest("hex");

test.beforeEach((t) => {
  const cache = {};
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
        message: node.dag.put({
          content: { data: 'this is a test 4' },
          parent: node.dag.put({
            content: { data: 'this is a test 3' },
            parent: node.dag.put({
              content: { data: 'this is a test 2' },
              parent: node.dag.put({
                content: { data: 'this is a test 1' },
                parent: null
              })
            })
          })
        }),
        count: 4
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
  t.true(!!messages.length);
});

test('should resolve messages using iterator', async (t) => {
  const { node } = t.context;
  const { id: cuserId } = await node.id();
  const client = createClient(node, cuserId);
  const messages = client.getMessages('custom_topic_id', {
    iter: true,
  });

  t.plan(4);
  for await (let value of messages) {
    t.is(typeof value, 'object');
  }
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
