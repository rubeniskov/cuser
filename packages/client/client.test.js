
const test = require('ava');
const crypto = require('crypto');
const createClient = require('./client');

const md5 = (data) => crypto.createHash('md5').update(typeof data === 'string' ? data : JSON.stringify(data)).digest("hex");

test.beforeEach((t) => {
  const cache = {};
  let id;

  const node = t.context.node = {
    id: () => Promise.resolve({ id }),
    get: (hash) => Promise.resolve(cache[hash]),
    put: (data) => {
      const hash = md5(data);
      cache[hash] = data;
      return hash
    },
  };

  id = node.put({
    topics: {
      'custom_topic_id': {
        message: node.put({
          content: { data: 'this is a test 4' },
          parent: node.put({
            content: { data: 'this is a test 3' },
            parent: node.put({
              content: { data: 'this is a test 2' },
              parent: node.put({
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

test('should resolve messages using array', async (t) => {
  const { node } = t.context;
  const { id: cuserId } = await node.id();
  const client = createClient(node, cuserId);
  const messages = await client.getMessages('custom_topic_id');

  t.true(Array.isArray(messages));
  t.true(!!messages.length);
});
